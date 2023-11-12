import joi from "joi";
import { ParticipantBodyInput } from "../protocols/index";

export const participantSchema = joi.object<ParticipantBodyInput>({
  name: joi.string().required(),
  balance: joi.number().required(),
});
