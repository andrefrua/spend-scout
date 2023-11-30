import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { generateToken, authenticateToken } from "../helpers/auth";
import { HttpCode } from "../helpers/httpCodes";
import { returnAndLogError } from "../helpers/errors";
import { registerSchema, loginSchema } from "../validationSchemas/auth";

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const router = express.Router();

/**
 * Register a new user with name, email and password.
 *
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns {Object} - The registered user's name, email, and JWT token.
 * @throws {Error} - Throws an error if there was an error while registering the user.
 */
router.post("/register", async (request: Request, response: Response) => {
  const validationSchema = registerSchema(request.t);

  try {
    const { name, email, password } = request.body;

    await validationSchema.validate(
      { name, email, password },
      { abortEarly: false }
    );

    // Check if user with same email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return response
        .status(HttpCode.BAD_REQUEST)
        .send(request.t("auth.emailAlreadyExists"));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user and save to database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate and send back JWT token
    const token = generateToken(newUser, false); // TODO: Need to add rememberMe option

    response.status(HttpCode.OK).send({ name, email, token });
  } catch (error) {
    returnAndLogError(
      request,
      response,
      error as Error,
      request.t("auth.errorRegisteringTheUser")
    );
  }
});

/**
 * Login a user with email and password.
 *
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns {Object} - The authenticated user's name, email, and JWT token.
 * @throws {Error} - Throws an error if there was an error while logging in the user.
 */
router.post("/login", async (request: Request, response: Response) => {
  const validationSchema = loginSchema(request.t);

  try {
    const { email, password, rememberMe } = request.body;

    await validationSchema.validate({ email, password }, { abortEarly: false });

    // Check if user exists
    const authenticatedUser = await User.findOne({ where: { email } });
    if (!authenticatedUser) {
      return response
        .status(HttpCode.BAD_REQUEST)
        .send(request.t("auth.emailDoesNotExistInTheSystem"));
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      password,
      authenticatedUser.password
    );

    if (!validPassword) {
      return response
        .status(HttpCode.BAD_REQUEST)
        .send(request.t("auth.passwordIncorrect"));
    }

    // Generate and send back JWT token
    const token = generateToken(authenticatedUser, rememberMe);

    response.status(HttpCode.OK).send({
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      rememberMe,
      token
    });
  } catch (error) {
    returnAndLogError(
      request,
      response,
      error as Error,
      request.t("auth.errorLoggingInTheUser")
    );
  }
});

/**
 * Verify a JWT token and return the corresponding user's name and email.
 *
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns {Object} - The verified user's name and email.
 * @throws {Error} - Throws an error if there was an error while verifying the token.
 */
router.get(
  "/verify-token",
  authenticateToken,
  async (request: AuthenticatedRequest, response: Response) => {
    try {
      // Check if user exists
      const user = await User.findOne({ where: { id: request.user?.id } });
      if (!user) {
        return response
          .status(HttpCode.BAD_REQUEST)
          .send(request.t("auth.sessionExpired"));
      }

      // Retrieve and split the token from the authorization header
      const splitToken = request.headers.authorization?.split(" ")[1];

      response.send({ name: user.name, email: user.email, token: splitToken });
    } catch (error) {
      response
        .status(HttpCode.UNAUTHORIZED)
        .send(request.t("auth.sessionExpired"));
    }
  }
);

export default router;
