import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export type ApplicationError = {
  name: string;
  message: string;
};

/* eslint-disable */
export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response, _next: NextFunction) {
  console.log(err);

  if (err.name === "InsufficientBalanceForParticipantError" || err.name === "GameWithEqualTeamNamesError" || err.name === "IdIsNotValidError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === "BetValueIsBiggerThanParticipantsBalanceError" || err.name === "AttemptToBetOnFinishedGameError" || err.name === "MinimumBetValueError" || err.name === "GameIsFinished") {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
/* eslint-enable */
