import { CategoryType } from "generated/models/category";
import { TransactionByCategory } from "generated/models/dashboard";

export interface TransactionsByCategoryProps {
  title: string;
  rows: TransactionByCategory[];
  categoryType: CategoryType;
}
