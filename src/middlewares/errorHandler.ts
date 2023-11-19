import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export type ApplicationError = {
  name: string;
  message: string;
};

const errors = {
  ["InsufficientBalanceForParticipantError"]: httpStatus.BAD_REQUEST,
  ["GameWithEqualTeamNamesError"]: httpStatus.BAD_REQUEST,
  ["IdIsNotValidError"]: httpStatus.BAD_REQUEST,
  ["BetValueIsBiggerThanParticipantsBalanceError"]: httpStatus.FORBIDDEN,
  ["AttemptToBetOnFinishedGameError"]: httpStatus.FORBIDDEN,
  ["MinimumBetValueError"]: httpStatus.FORBIDDEN,
  ["GameIsFinished"]: httpStatus.FORBIDDEN,
  ["ParticipantsWithEqualNamesError"]: httpStatus.CONFLICT,
  ["NotFoundError"]: httpStatus.NOT_FOUND,
};

/* eslint-disable */
export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response, _next: NextFunction) {

  if (errors[err.name]) {
    return res.status(errors[err.name]).send({
      message: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
/* eslint-enable */
