import express, { Response, Router } from "express";

import { authenticateToken } from "../helpers/auth";
import { HttpCode } from "../helpers/httpCodes";
import { AuthenticatedRequest } from "./auth";
import { returnAndLogError } from "../helpers/errors";

import UserPreferences from "../models/userPreferences";
import {
  VerticalNavColor,
  VerticalNavItemColor
} from "../models/interfaces/userPreferences";

const router: Router = express.Router();

/**
 * Get user preferences.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.get(
  "/user-preferences",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      const userId = request.user?.id;
      let userPreferences = await UserPreferences.findOne({
        where: { userId }
      });

      // If preferences don't exist, create a new entry
      if (!userPreferences) {
        userPreferences = await UserPreferences.create({
          userId,
          isVerticalNavCollapsed: false,
          isDarkMode: false,
          isNavBarFixed: true,
          verticalNavColor: VerticalNavColor.DARK,
          verticalNavItemColor: VerticalNavItemColor.INFO
        });
      }

      response.status(HttpCode.OK).send(userPreferences);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("userPreferences.errorRetrievingPreferences")
      );
    }
  }
);

/**
 * Update user preferences.
 *
 * @param {AuthenticatedRequest} request - Express request object with user authentication.
 * @param {Response} response - Express response object.
 */
router.put(
  "/user-preferences",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      //   const validationSchema = userPreferencesSchema(request.t);
      const {
        isVerticalNavCollapsed,
        isDarkMode,
        isNavBarFixed,
        verticalNavColor,
        verticalNavItemColor
      } = request.body;

      const userId = request.user?.id;

      //   await validationSchema.validate(
      //     {
      //       isUISettingsPanelOpen,
      //       isVerticalNavCollapsed,
      //       isDarkMode,
      //       isNavBarFixed,
      //       isNavBarTransparent,
      //       verticalNavColor,
      //       verticalNavItemColor,
      //     },
      //     { abortEarly: false }
      //   );

      let userPreferences = await UserPreferences.findOne({
        where: { userId }
      });

      if (!userPreferences) {
        // If preferences don't exist, create a new entry
        userPreferences = await UserPreferences.create({
          userId,
          isVerticalNavCollapsed,
          isDarkMode,
          isNavBarFixed,
          verticalNavColor,
          verticalNavItemColor
        });
      } else {
        // If preferences exist, update the existing entry
        userPreferences.isVerticalNavCollapsed = isVerticalNavCollapsed;
        userPreferences.isDarkMode = isDarkMode;
        userPreferences.isNavBarFixed = isNavBarFixed;
        userPreferences.verticalNavColor = verticalNavColor;
        userPreferences.verticalNavItemColor = verticalNavItemColor;

        await userPreferences.save();
      }

      response.status(HttpCode.OK).send(userPreferences);
    } catch (error) {
      returnAndLogError(
        request,
        response,
        error as Error,
        request.t("userPreferences.errorUpdatingPreferences")
      );
    }
  }
);

export default router;
