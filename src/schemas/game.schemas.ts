import joi from "joi";
import { GameBodyInput, GameFinishInput } from "../protocols/index";

export const gameSchema = joi.object<GameBodyInput>({
  homeTeamName: joi.string().required(),
  awayTeamName: joi.string().required(),
});

export const finishGameSchema = joi.object<GameFinishInput>({
  homeTeamScore: joi.number().required().min(0).prefs({ convert: false }),
  awayTeamScore: joi.number().required().min(0).prefs({ convert: false }),
});
