import { Op, col, fn } from "sequelize";

import Transaction from "../models/transaction";
import Category from "../models/category";
import { CategoryType } from "../models/interfaces/category";
import {
  SimpleDashboardData,
  TransactionByCategory
} from "../models/interfaces/dashboard";

/**
 * Fetch a list of expense transactions grouped by category and the respective amount spent by category
 *
 * @param userId
 * @param startDate
 * @param endDate
 * @returns
 */
const getTotalExpenses = async (
  userId: string,
  startDate: Date,
  endDate: Date
) =>
  (await Transaction.sum("amount", {
    where: {
      userId,
      transactionDate: {
        [Op.between]: [startDate, endDate]
      },
      amount: { [Op.lt]: 0 }
    }
  })) || 0;

/**
 * Fetch a list of income transactions grouped by category and the respective amount earned by category
 *
 * @param userId
 * @param startDate
 * @param endDate
 * @returns
 */
const getTotalIncome = async (userId: string, startDate: Date, endDate: Date) =>
  (await Transaction.sum("amount", {
    where: {
      userId,
      transactionDate: { [Op.between]: [startDate, endDate] },
      amount: { [Op.gt]: 0 }
    }
  })) || 0;

/**
 * Fetch the highest income value transaction
 *
 * @param userId
 * @param startDate
 * @param endDate
 * @returns
 */
const getHighestIncomeTransaction = async (
  userId: string,
  startDate: Date,
  endDate: Date
) =>
  await Transaction.findOne({
    where: {
      userId,
      transactionDate: {
        [Op.between]: [startDate, endDate]
      },
      amount: { [Op.gt]: 0 }
    },
    order: [["amount", "DESC"]]
  });

/**
 * Fetch the highest expense value transaction
 *
 * @param userId
 * @param startDate
 * @param endDate
 * @returns
 */
const getHighestExpenseTransaction = async (
  userId: string,
  startDate: Date,
  endDate: Date
) =>
  await Transaction.findOne({
    where: {
      userId,
      transactionDate: {
        [Op.between]: [startDate, endDate]
      },
      amount: { [Op.lt]: 0 }
    },
    order: [["amount", "ASC"]]
  });

/**
 * Fetch a list of expense transactions grouped by category and the respective amount spent by category
 *
 * @param userId
 * @param startDate
 * @param endDate
 * @param categoryType
 * @returns
 */
const getTransactionsByCategoryType = async (
  userId: string,
  startDate: Date,
  endDate: Date,
  categoryType: CategoryType
): Promise<TransactionByCategory[]> =>
  (await Transaction.findAll({
    attributes: [
      [col("Category.id"), "categoryId"],
      [col("Category.name"), "categoryName"],
      [col("Category.description"), "categoryDescription"],
      [col("Category.monthlyBudget"), "categoryMonthlyBudget"],
      [fn("SUM", col("amount")), "amount"]
    ],
    where: {
      userId,
      transactionDate: {
        [Op.between]: [startDate, endDate]
      },
      "$Category.type$": categoryType // Filter for expense categories
    },
    group: [col("Category.id"), col("Category.name"), col("Category.description"), col("Category.monthlyBudget")],
    include: [{ model: Category, attributes: [] }]
  })) as unknown as TransactionByCategory[];

/**
 * Create a dashboard data object for the selected date
 * @param selectedDate
 * @param userId
 * @returns
 */
export const createDashboardData = async (
  selectedDate: Date,
  userId: string
): Promise<SimpleDashboardData> => {
  const startDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const endDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  return {
    totalExpenses: await getTotalExpenses(userId, startDate, endDate),
    totalIncome: await getTotalIncome(userId, startDate, endDate),
    highestIncomeTransaction: await getHighestIncomeTransaction(
      userId,
      startDate,
      endDate
    ),
    highestExpenseTransaction: await getHighestExpenseTransaction(
      userId,
      startDate,
      endDate
    ),
    expenseTransactionsByCategory: await getTransactionsByCategoryType(
      userId,
      startDate,
      endDate,
      CategoryType.Expense
    ),
    incomeTransactionsByCategory: await getTransactionsByCategoryType(
      userId,
      startDate,
      endDate,
      CategoryType.Income
    )
  };
};

export const calculatePercentageChange = (
  currentValue: number,
  previousValue: number
): number =>
  previousValue === 0
    ? 0 // Avoid division by zero
    : ((currentValue - previousValue) / previousValue) * 100 || 0;
