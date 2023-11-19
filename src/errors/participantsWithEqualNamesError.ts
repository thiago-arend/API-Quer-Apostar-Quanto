import { ApplicationError } from "../middlewares/errorHandler";

export function participantsWithEqualNames(): ApplicationError {
  return {
    name: "ParticipantsWithEqualNamesError",
    message: "You cannot create more than one participant with same name.",
  };
}
