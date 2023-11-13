import { ApplicationError } from "../middlewares/errorHandler";

export function gameIsFinished(): ApplicationError {
  return {
    name: "GameIsFinished",
    message: "You cannot finish a game that has already finished.",
  };
}
