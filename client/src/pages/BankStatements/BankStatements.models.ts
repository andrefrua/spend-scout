import { Transaction } from "generated/models/transaction";

export enum RowColor {
  Accepted = "#CCFFCC",
  NotAccepted = "#FFD1DC",
  Duplicated = "#ADD8E6"
}
export interface BankStatement extends Transaction {
  accepted: boolean;
  duplicated: boolean;
}

export interface SimplifiedTransaction {
  transactionDate: string;
  valueDate: string;
  description: string;
  balance: number;
  amount: number;
  categoryId?: string;
  observations: string;
}
