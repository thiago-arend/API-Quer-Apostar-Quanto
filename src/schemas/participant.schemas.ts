import joi from "joi";
import { ParticipantInput } from "../protocols/index";

export const participantSchema = joi.object<ParticipantInput>({
  name: joi.string().required(),
  balance: joi.number().required(),
});
