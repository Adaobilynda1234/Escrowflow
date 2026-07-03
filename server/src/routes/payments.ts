import express, { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { WebhookEvent } from '../models/WebhookEvent.js';
import { Job } from '../models/Job.js';
import { creditHeldFunds } from '../services/ledger.js';

// Fail at startup if the webhook secret is not configured — never fall back to empty string.
const WEBHOOK_SECRET = process.env.NOMBA_WEBHOOK_SECRET;
if (!WEBHOOK_SECRET) {
  throw new Error('NOMBA_WEBHOOK_SECRET env var is required');
}

const router = Router();

// POST /payments/webhook
// express.raw() captures the body as a Buffer so HMAC is computed over the exact bytes
// Nomba signed, not a re-serialised version that may differ in whitespace or key order.
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rawBody = req.body as Buffer;
      const signature = req.headers['x-nomba-signature'] as string | undefined;

      // Verify HMAC-SHA256 signature over raw bytes
      const expected = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      // timingSafeEqual requires equal-length buffers; decode both as hex
      const sigBuf = Buffer.from(signature ?? '', 'hex');
      const expBuf = Buffer.from(expected, 'hex');
      const valid =
        sigBuf.length === expBuf.length &&
        crypto.timingSafeEqual(sigBuf, expBuf);

      if (!valid) {
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      const { eventId, eventType, data: eventData } = JSON.parse(
        rawBody.toString('utf8')
      ) as {
        eventId: string;
        eventType: string;
        data: Record<string, unknown>;
      };

      // Idempotency — already processed: return 200 immediately
      const existing = await WebhookEvent.findOne({ eventId });
      if (existing?.processed) {
        res.json({ received: true, duplicate: true });
        return;
      }

      // Record event before processing (upsert so duplicate delivery before processing is safe)
      await WebhookEvent.findOneAndUpdate(
        { eventId },
        { eventId, eventType, payload: { eventId, eventType, data: eventData }, processed: false },
        { upsert: true }
      );

      if (eventType === 'payment.received') {
        const accountReference = eventData.accountReference as string;
        const amount = eventData.amount as number; // kobo

        // accountReference = "job-<jobId>"
        const jobId = accountReference.replace('job-', '');
        const job = await Job.findById(jobId);

        if (!job) {
          console.error(`[Webhook] Job not found for accountReference: ${accountReference}`);
        } else {
          const session = await mongoose.startSession();
          try {
            await session.withTransaction(async () => {
              await creditHeldFunds(jobId, amount, eventId, session);
            });
          } finally {
            session.endSession();
          }
        }
      }

      await WebhookEvent.findOneAndUpdate({ eventId }, { processed: true });
      res.json({ received: true });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
