import joi from "joi";
import { BetBodyInput } from "../protocols/index";

export const betSchema = joi.object<BetBodyInput>({
  homeTeamScore: joi.number().required().min(0).prefs({ convert: false }),
  awayTeamScore: joi.number().required().min(0).prefs({ convert: false }),
  amountBet: joi.number().required().min(0).prefs({ convert: false }),
  gameId: joi.number().integer().required().min(1).prefs({ convert: false }),
  participantId: joi.number().integer().required().min(1).prefs({ convert: false }),
});
