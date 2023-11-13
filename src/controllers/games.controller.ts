import { Request, Response } from "express";
import httpStatus from "http-status";
import { GameBodyInput, GameFinishInput } from "../protocols/index";
import { gamesService } from "../services/games.service";

export async function create(req: Request, res: Response) {
  const gameInput = req.body as GameBodyInput;
  const gameResult = await gamesService.create(gameInput);

  res.status(httpStatus.CREATED).send(gameResult);
}

export async function finishGame(req: Request, res: Response) {
  const finishGameInput = req.body as GameFinishInput;
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(httpStatus.BAD_REQUEST).send("Id is not valid!");
  const finishGameResult = await gamesService.finishGame(id, finishGameInput);

  res.status(httpStatus.OK).send(finishGameResult);
}

export const gamesController = {
  create,
  finishGame,
};
