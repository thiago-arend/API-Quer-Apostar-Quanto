import { ApplicationError } from "../middlewares/errorHandler";

export function insufficientBalanceForParticipant(): ApplicationError {
  return {
    name: "InsufficientBalanceForParticipantError",
    message: "You cannot create a participant with a balance less than $10.00.",
  };
}
