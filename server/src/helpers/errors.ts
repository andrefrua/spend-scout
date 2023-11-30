import { Response, Request } from "express";
import * as Yup from "yup";
import { HttpCode } from "./httpCodes";

export const returnAndLogError = (
  request: Request,
  response: Response,
  error: Error,
  message: string
) => {
  console.error("\n\x1b[31m%s\x1b[0m", `Error from endpoint "${request.url}":`);
  if (error instanceof Yup.ValidationError) {
    const errors = error.errors.map((error: string) => error).join(", ");

    console.error("\x1b[31m%s\x1b[0m\n", errors);
    response.status(HttpCode.BAD_REQUEST).send(errors);
  } else {
    console.error("\x1b[31m%s\x1b[0m\n", error);
    response.status(HttpCode.INTERNAL_SERVER_ERROR).send(message);
  }
};
