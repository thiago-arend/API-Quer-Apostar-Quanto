import { ApplicationError } from "../middlewares/errorHandler";

export function idIsNotValid(): ApplicationError {
  return {
    name: "IdIsNotValidError",
    message: "Id is not valid.",
  };
}
