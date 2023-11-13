import { ApplicationError } from "../middlewares/errorHandler";

export function notFound(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "One or more resources needed to complete this request do not exists.",
  };
}
