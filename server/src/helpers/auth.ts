import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  id?: string;
}

interface RequestWithUser extends Request {
  user?: User;
}

// Helper function to generate JWT token
function generateToken(user: User, rememberMe: boolean): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable not found");
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "1d" : "30m"
  });
}

// Middleware to authenticate JWT token
function authenticateToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Response<unknown, Record<string, unknown>> | void {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable not found");
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || typeof user !== "object" || !("id" in user)) {
      return res.sendStatus(403);
    }
    req.user = user as User;
    next();
  });
}

export { generateToken, authenticateToken };
