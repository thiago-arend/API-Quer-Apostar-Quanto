import { ApplicationError } from "../middlewares/errorHandler";

export function attemptToBetOnFinishedGame(): ApplicationError {
  return {
    name: "AttemptToBetOnFinishedGameError",
    message: "You cannot bet on a game that has already finished.",
  };
}
