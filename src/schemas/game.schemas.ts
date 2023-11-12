import joi from "joi";
import { GameBodyInput } from "../protocols/index";

export const gameSchema = joi.object<GameBodyInput>({
  homeTeamName: joi.string().required(),
  awayTeamName: joi.string().required(),
});
