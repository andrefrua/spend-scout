import express, { Response, Router } from "express";
import { authenticateToken } from "../helpers/auth";
import { HttpCode } from "../helpers/httpCodes";
import { AuthenticatedRequest } from "./auth";
import { returnAndLogError } from "../helpers/errors";
import Category from "../models/category"; // Import the Category model

const router: Router = express.Router();

/**
 * Get all categories.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/category",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const userId = request.user?.id;
      const categories = await Category.findAll({
        where: { userId }
      });

      response.status(HttpCode.OK).send(categories);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("categories.errorRetrievingCategories")
      );
    }
  }
);

/**
 * Get a category by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/category/:categoryId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const categoryId = request.params.categoryId;
      const category = await Category.findOne({
        where: { id: categoryId, userId: request.user?.id }
      });

      if (!category) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("categories.categoryNotFound"));
      }

      response.status(HttpCode.OK).send(category);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("categories.errorFetchingCategory")
      );
    }
  }
);

/**
 * Create a new category.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.post(
  "/category",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const { name, type, description, filterField, monthlyBudget } =
        request.body;
      const userId = request.user?.id || "";

      const category = await Category.create({
        userId,
        name,
        type,
        description,
        filterField,
        monthlyBudget
      });

      response.status(HttpCode.OK).send({ id: category.id });
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("categories.errorCreatingCategory")
      );
    }
  }
);

/**
 * Update a category by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.put(
  "/category/:categoryId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const categoryId = request.params.categoryId;
      const { name, type, description, filterField, monthlyBudget } =
        request.body;
      const userId = request.user?.id;

      const category = await Category.findOne({
        where: { id: categoryId, userId }
      });

      if (!category) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("categories.categoryNotFound"));
      }

      // Update the category's properties
      category.name = name;
      category.type = type;
      category.description = description;
      category.filterField = filterField;
      category.monthlyBudget = monthlyBudget;

      await category.save(); // Save the updated category

      response.status(HttpCode.OK).send({ id: category.id });
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("categories.errorUpdatingCategory")
      );
    }
  }
);

/**
 * Delete a category by ID.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.delete(
  "/category/:categoryId",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const categoryId = request.params.categoryId;
      const userId = request.user?.id;

      const category = await Category.findOne({
        where: { id: categoryId, userId }
      });

      if (!category) {
        return response
          .status(HttpCode.NOT_FOUND)
          .send(request.t("categories.categoryNotFound"));
      }

      await category.destroy();

      response
        .status(HttpCode.OK)
        .send(request.t("categories.categoryDeletedSuccessfully"));
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("categories.errorDeletingCategory")
      );
    }
  }
);

export default router;
