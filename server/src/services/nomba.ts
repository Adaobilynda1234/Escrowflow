import axios from 'axios';
import { AppError } from '../middleware/errorHandler.js';

const nombaClient = axios.create({
  baseURL: process.env.NOMBA_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NOMBA_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  reference: string;
}

export interface TransferParams {
  idempotencyKey: string;
  amountKobo: number;
  destinationAccountNumber: string;
  destinationBankCode: string;
  narration: string;
}

export interface TransferResult {
  reference: string;
  status: 'pending' | 'success' | 'failed';
}

export async function createVirtualAccount(
  jobId: string,
  amountKobo: number
): Promise<VirtualAccount> {
  try {
    const res = await nombaClient.post(
      `/accounts/${process.env.NOMBA_ACCOUNT_ID}/virtual-accounts`,
      {
        accountReference: jobId,
        amount: amountKobo / 100, // ponytail: kobo → naira; Nomba uses naira
      }
    );
    const data = res.data?.data;
    if (!data?.accountNumber) throw new AppError(502, 'Nomba did not return an account number');
    return {
      accountNumber: data.accountNumber,
      bankName: data.bankName ?? 'Unknown Bank',
      reference: jobId,
    };
  } catch (err: unknown) {
    if (err instanceof AppError) throw err;
    throw new AppError(502, `Nomba API error: ${(err as Error).message}`);
  }
}

export async function initiateTransfer(params: TransferParams): Promise<TransferResult> {
  try {
    const res = await nombaClient.post(
      '/transfers',
      {
        amount: params.amountKobo,
        destinationAccountNumber: params.destinationAccountNumber,
        destinationBankCode: params.destinationBankCode,
        narration: params.narration,
        sourceAccountId: process.env.NOMBA_ACCOUNT_ID,
      },
      { headers: { 'Idempotency-Key': params.idempotencyKey } }
    );
    const data = res.data?.data;
    return {
      reference: data.reference,
      status: data.status,
    };
  } catch (err: unknown) {
    if (err instanceof AppError) throw err;
    throw new AppError(502, `Nomba transfer error: ${(err as Error).message}`);
  }
}

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  // ponytail: sync crypto — fine for webhook verify; no async needed here
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require('crypto') as typeof import('crypto');
  const expected = crypto
    .createHmac('sha256', process.env.NOMBA_WEBHOOK_SECRET ?? '')
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
