import { ApplicationError } from "../middlewares/errorHandler";

export function minimumBetValue(): ApplicationError {
  return {
    name: "MinimumBetValueError",
    message: "You cannot bet less than $1.00.",
  };
}
