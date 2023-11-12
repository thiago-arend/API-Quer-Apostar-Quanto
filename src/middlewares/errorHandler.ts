import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export type ApplicationError = {
  name: string;
  message: string;
};

/* eslint-disable */
export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response, _next: NextFunction) {
  console.log(err);

  if (err.name === "InsufficientBalanceForParticipantError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
/* eslint-enable */
