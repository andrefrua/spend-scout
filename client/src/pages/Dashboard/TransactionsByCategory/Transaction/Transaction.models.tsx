import { TransactionByCategory } from "generated/models/dashboard";

export interface TransactionProps {
  transactionByCategory: TransactionByCategory;
  selectedDate: Date;
}
