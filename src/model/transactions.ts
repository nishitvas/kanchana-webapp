export interface BankAccountTransaction {
  date: Date,
  remarks: string,
  type: 'credit' | 'debit',
  amount: number,
  balance: number,
  sortingIndex: string,
  metadata?: any,
}

export type Transaction = BankAccountTransaction;