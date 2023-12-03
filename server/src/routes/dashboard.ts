import express, { Response, Router } from "express";
import { Op } from "sequelize";

import { authenticateToken } from "../helpers/auth";
import { HttpCode } from "../helpers/httpCodes";
import { AuthenticatedRequest } from "./auth";
import { returnAndLogError } from "../helpers/errors";

import {
  DashboardData,
  SimpleDashboardData
} from "../models/interfaces/dashboard";
import {
  calculatePercentageChange,
  createDashboardData
} from "../helpers/dashboard";
import Transaction from "../models/transaction";

const router: Router = express.Router();

/**
 * Get transaction summaries for the selected date ( the month of the selected date will be used ).
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/dashboard",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const userId = request.user?.id || "";
      const selectedDateParam = request.query.selectedDate;

      if (
        !(
          typeof selectedDateParam === "string" ||
          selectedDateParam instanceof Date
        )
      ) {
        return response
          .status(HttpCode.BAD_REQUEST)
          .send(request.t("dashboard.invalidSelectedDate"));
      }

      const selectedDate = new Date(selectedDateParam);
      const previousMonth = new Date(selectedDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);

      const selectedMonthDashboard: SimpleDashboardData =
        await createDashboardData(selectedDate, userId);

      const previousMonthDashboard: SimpleDashboardData =
        await createDashboardData(previousMonth, userId);

      const dashboardData: DashboardData = {
        totalExpenses: {
          value: selectedMonthDashboard.totalExpenses,
          previousMonthPercentageChange:
            calculatePercentageChange(
              selectedMonthDashboard.totalExpenses,
              previousMonthDashboard.totalExpenses
            ) || 0
        },
        totalIncome: {
          value: selectedMonthDashboard.totalIncome,
          previousMonthPercentageChange:
            calculatePercentageChange(
              selectedMonthDashboard.totalIncome,
              previousMonthDashboard.totalIncome
            ) || 0
        },
        highestIncomeTransaction: {
          value: selectedMonthDashboard.highestIncomeTransaction?.amount || 0,
          previousMonthPercentageChange:
            calculatePercentageChange(
              selectedMonthDashboard.highestIncomeTransaction?.amount || 0,
              previousMonthDashboard.highestIncomeTransaction?.amount || 0
            ) || 0
        },
        highestExpenseTransaction: {
          value: selectedMonthDashboard.highestExpenseTransaction?.amount || 0,
          previousMonthPercentageChange:
            calculatePercentageChange(
              selectedMonthDashboard.highestExpenseTransaction?.amount || 0,
              previousMonthDashboard.highestExpenseTransaction?.amount || 0
            ) || 0
        },
        expenseTransactionsByCategory:
          selectedMonthDashboard.expenseTransactionsByCategory,
        incomeTransactionsByCategory:
          selectedMonthDashboard.incomeTransactionsByCategory
      };

      response.status(HttpCode.OK).send(dashboardData);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorRetrievingCurrentMonthSummary")
      );
    }
  }
);

router.post(
  "/dashboard/transactionsByCategoryTypeAndDate",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const { selectedDate, categoryId } = request.body;
      const userId = request.user?.id || "";

      const newDate = new Date(selectedDate);

      const startDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      const endDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      );

      // Define the search criteria
      const searchCriteria = {
        userId,
        transactionDate: {
          [Op.between]: [startDate, endDate]
        },
        "$Transaction.categoryId$": categoryId
      };

      const transactions = await Transaction.findAll({
        where: searchCriteria
      });

      response.status(HttpCode.OK).send(transactions);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorRetrievingCurrentMonthSummary")
      );
    }
  }
);

export default router;
