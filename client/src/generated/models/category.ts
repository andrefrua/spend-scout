export enum CategoryType {
  Expense = "expense",
  Income = "income"
}

export interface Category {
  id?: string;
  userId?: string;
  type: CategoryType;
  name: string;
  description: string;
  filterField: string;
  monthlyBudget: number;
}
