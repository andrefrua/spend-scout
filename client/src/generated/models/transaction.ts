export interface Transaction {
  id?: string;
  userId?: string;
  transactionDate: string;
  valueDate: string;
  description: string;
  balance: number;
  amount: number;
  categoryId: string;
  observations: string;
}
