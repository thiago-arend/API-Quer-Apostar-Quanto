import { ApplicationError } from "../middlewares/errorHandler";

export function gameWithEqualTeamNames(): ApplicationError {
  return {
    name: "GameWithEqualTeamNamesError",
    message: "You cannot create a game with equal team names.",
  };
}
