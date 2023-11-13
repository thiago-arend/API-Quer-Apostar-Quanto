import { ApplicationError } from "../middlewares/errorHandler";

export function betValueIsBiggerThanParticipantsBalance(): ApplicationError {
  return {
    name: "BetValueIsBiggerThanParticipantsBalanceError",
    message: "You cannot bet more money than your current balance.",
  };
}
