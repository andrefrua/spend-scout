import express, { Response, Router } from "express";
import { Op } from "sequelize";

import { authenticateToken } from "../helpers/auth";
import { HttpCode } from "../helpers/httpCodes";
import { AuthenticatedRequest } from "./auth";
import { returnAndLogError } from "../helpers/errors";

import Transaction from "../models/transaction";
import Category from "../models/category";

const router: Router = express.Router();

/**
 * Get all transactions.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/transaction",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const transactions = await Transaction.findAll({
        where: { userId: request.user?.id }
      });

      response.status(HttpCode.OK).send(transactions);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorRetrievingTransactions")
      );
    }
  }
);

/**
 * Get a transaction by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/transaction/:transactionId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const transactionId = request.params.transactionId;
      const transaction = await Transaction.findOne({
        where: { id: transactionId, userId: request.user?.id }
      });

      if (!transaction) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("transactions.transactionNotFound"));
      }

      response.status(HttpCode.OK).send(transaction);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorFetchingTransaction")
      );
    }
  }
);

/**
 * Search for a transaction by description or category.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/transaction/search",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const searchQuery = request.query.q; // Get the search query from the request query parameters
      const userId = request.user?.id;

      // Define the search criteria
      const searchCriteria = {
        userId,
        [Op.or]: [
          {
            description: {
              [Op.like]: `%${searchQuery}%` // Search by description
            }
          },
          {
            category: {
              [Op.like]: `%${searchQuery}%` // Search by category
            }
          }
        ]
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
        request.t("transactions.errorSearchingTransactions")
      );
    }
  }
);

/**
 * Get a transaction by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/transaction/:transactionId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const transactionId = request.params.transactionId;
      const transaction = await Transaction.findOne({
        where: { id: transactionId, userId: request.user?.id }
      });

      if (!transaction) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("transactions.transactionNotFound"));
      }

      response.status(HttpCode.OK).send(transaction);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorFetchingTransaction")
      );
    }
  }
);

/**
 * Create a new transaction.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.post(
  "/transaction",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      // const validationSchema = transactionSchema(request.t);
      const {
        transactionDate,
        valueDate,
        description,
        balance,
        amount,
        categoryId,
        observations
      } = request.body;
      const userId = request.user?.id || "";

      // await validationSchema.validate(
      //   { categoryId, description, amount, date },
      //   { abortEarly: false }
      // );

      // Check if the specified category exists
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return response
          .status(HttpCode.BAD_REQUEST)
          .send(request.t("transactions.categoryNotFound"));
      }

      const transaction = await Transaction.create({
        userId,
        transactionDate,
        valueDate,
        description,
        balance,
        amount,
        categoryId,
        observations
      });

      response.status(HttpCode.OK).send({ id: transaction.id });
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorCreatingTransaction")
      );
    }
  }
);

/**
 * Update a transaction by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.put(
  "/transaction/:transactionId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      // const validationSchema = transactionSchema(request.t);
      const transactionId = request.params.transactionId;
      const {
        transactionDate,
        valueDate,
        description,
        balance,
        amount,
        categoryId,
        observations
      } = request.body;
      const userId = request.user?.id;

      // await validationSchema.validate(
      //   { categoryId, description, amount, date },
      //   { abortEarly: false }
      // );

      // Check if the specified category exists
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return response
          .status(HttpCode.BAD_REQUEST)
          .send(request.t("transactions.categoryNotFound"));
      }

      const transaction = await Transaction.findOne({
        where: { id: transactionId, userId }
      });

      if (!transaction) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("transactions.transactionNotFound"));
      }

      // Update the transaction's properties
      transaction.transactionDate = transactionDate;
      transaction.valueDate = valueDate;
      transaction.description = description;
      transaction.balance = balance;
      transaction.amount = amount;
      transaction.categoryId = categoryId;
      transaction.observations = observations;

      await transaction.save(); // Save the updated transaction

      response.status(HttpCode.OK).send({ id: transaction.id });
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorUpdatingTransaction")
      );
    }
  }
);

/**
 * Create multiple transactions in bulk.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.post(
  "/transaction/bulk",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const userId = request.user?.id || "";
      const { transactions } = request.body; // An array of transactions to create

      // Ensure that transactions is an array
      if (!Array.isArray(transactions)) {
        return response
          .status(HttpCode.BAD_REQUEST)
          .send(request.t("transactions.bulkInvalidData"));
      }

      // Validate and create each transaction in the array
      const createdTransactionIds = [];
      for (const transactionData of transactions) {
        const {
          transactionDate,
          valueDate,
          description,
          balance,
          amount,
          categoryId,
          observations
        } = transactionData;

        // Check if the specified category exists
        const category = await Category.findByPk(categoryId);

        if (!category) {
          return response
            .status(HttpCode.BAD_REQUEST)
            .send(request.t("transactions.categoryNotFound"));
        }

        const transaction = await Transaction.create({
          userId,
          transactionDate,
          valueDate,
          description,
          balance,
          amount,
          categoryId,
          observations
        });

        createdTransactionIds.push(transaction.id);
      }

      response.status(HttpCode.OK).send({ createdTransactionIds });
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorCreatingBulkTransactions")
      );
    }
  }
);

/**
 * Delete a transaction by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.delete(
  "/transaction/:transactionId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const transactionId = request.params.transactionId;
      const transaction = await Transaction.findOne({
        where: { id: transactionId, userId: request.user?.id }
      });

      if (!transaction) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("transactions.transactionNotFound"));
      }

      await transaction.destroy();

      response
        .status(HttpCode.OK)
        .send(request.t("transactions.transactionDeleteSuccessfully"));
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("transactions.errorDeletingTheTransaction")
      );
    }
  }
);

export default router;
