import { Transaction } from "./transaction";

export interface TransactionByCategory {
  categoryName: string;
  categoryDescription: string;
  categoryMonthlyBudget?: number;
  amount: number;
}

export interface ValuePercentageChange {
  value: number;
  previousMonthPercentageChange: number;
}

export interface SimpleDashboardData {
  totalExpenses: number;
  totalIncome: number;
  highestIncomeTransaction: Transaction | null;
  highestExpenseTransaction: Transaction | null;
  expenseTransactionsByCategory: TransactionByCategory[];
  incomeTransactionsByCategory: TransactionByCategory[];
}

export interface DashboardData {
  totalExpenses: ValuePercentageChange;
  totalIncome: ValuePercentageChange;
  highestIncomeTransaction: ValuePercentageChange;
  highestExpenseTransaction: ValuePercentageChange;
  expenseTransactionsByCategory: TransactionByCategory[];
  incomeTransactionsByCategory: TransactionByCategory[];
}
