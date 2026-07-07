// Self-check for Nomba webhook signature verification (server/src/routes/payments.ts).
// No test framework wired up in this project — run directly: npx tsx server/src/routes/payments.webhook-signature.test.ts
import assert from 'node:assert';
import crypto from 'node:crypto';
import type { NombaWebhookPayload as NombaWebhookPayloadType } from './payments.js';

// payments.ts throws at import time if this isn't set — must be assigned before the
// dynamic import below (static imports are hoisted, so setting it after a static
// import would run too late).
process.env.NOMBA_WEBHOOK_SECRET ??= 'test-secret-for-self-check-only';
const { buildNombaSignedString, verifyNombaSignature } = await import('./payments.js');
type NombaWebhookPayload = NombaWebhookPayloadType;

const secret = 'shared-secret';
const timestamp = '2026-07-07T20:00:00Z';
const payload: NombaWebhookPayload = {
  event_type: 'payment_success',
  requestId: 'req-123',
  data: {
    merchant: { userId: 'user-1', walletId: 'wallet-1' },
    transaction: {
      transactionId: 'txn-1',
      type: 'vact_transfer',
      time: '2026-07-07T19:59:00Z',
      responseCode: 'null', // literal string "null" must normalise to ''
      transactionAmount: 100,
      aliasAccountReference: 'job-abc123',
    },
  },
};

// Matches Nomba's documented field order exactly, with responseCode normalised.
const expectedSignedString = 'payment_success:req-123:user-1:wallet-1:txn-1:vact_transfer:2026-07-07T19:59:00Z::2026-07-07T20:00:00Z';
assert.strictEqual(buildNombaSignedString(payload, timestamp), expectedSignedString);

const validSignature = crypto
  .createHmac('sha256', secret)
  .update(expectedSignedString)
  .digest('base64');
assert.strictEqual(verifyNombaSignature(payload, timestamp, validSignature, secret), true, 'valid signature should verify');

assert.strictEqual(
  verifyNombaSignature(payload, timestamp, validSignature, 'wrong-secret'),
  false,
  'wrong secret must not verify'
);

assert.strictEqual(
  verifyNombaSignature({ ...payload, requestId: 'tampered' }, timestamp, validSignature, secret),
  false,
  'tampered payload must not verify'
);

assert.strictEqual(
  verifyNombaSignature(payload, 'wrong-timestamp', validSignature, secret),
  false,
  'mismatched timestamp must not verify'
);

console.log('OK: Nomba webhook signature verification matches the documented scheme');
