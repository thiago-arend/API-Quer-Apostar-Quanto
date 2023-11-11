import { Request, Response } from "express";
import httpStatus from "http-status";

export type ApplicationError = {
  name: string;
  message: string;
};

export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response) {
  console.log(err);

  /* eslint-disable-next-line no-console */
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
