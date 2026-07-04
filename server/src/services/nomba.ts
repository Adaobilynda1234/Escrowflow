import axios from 'axios';
import { AppError } from '../middleware/errorHandler.js';

const REQUIRED_ENV = ['NOMBA_BASE_URL', 'NOMBA_API_KEY', 'NOMBA_ACCOUNT_ID'] as const;
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}

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
    console.error('[Nomba] API error:', err);
    throw new AppError(502, 'Payment provider error');
  }
}

export async function initiateTransfer(params: TransferParams): Promise<TransferResult> {
  try {
    const res = await nombaClient.post(
      '/transfers',
      {
        amount: params.amountKobo / 100, // convert kobo → naira
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
    console.error('[Nomba] API error:', err);
    throw new AppError(502, 'Payment provider error');
  }
}
