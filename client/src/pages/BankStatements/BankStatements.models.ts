import { Transaction } from "generated/models/transaction";

export interface BankStatement extends Transaction {
  accepted: boolean;
}

export type SimplifiedTransaction = Omit<Transaction, "id" | "userId">;
