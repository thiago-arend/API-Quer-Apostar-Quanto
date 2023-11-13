import { Request, Response } from "express";
import httpStatus from "http-status";
import { GameBodyInput, GameFinishInput } from "../protocols/index";
import { gamesService } from "../services/games.service";
import { validateId } from "../utils/index";
import { idIsNotValid } from "../errors/idIsNotValidError";

export async function create(req: Request, res: Response) {
  const gameInput = req.body as GameBodyInput;
  const gameResult = await gamesService.create(gameInput);

  res.status(httpStatus.CREATED).send(gameResult);
}

export async function finishGame(req: Request, res: Response) {
  const finishGameInput = req.body as GameFinishInput;
  const id = parseInt(req.params.id);

  if (!validateId(id)) throw idIsNotValid();
  const finishGameResult = await gamesService.finishGame(id, finishGameInput);

  res.status(httpStatus.OK).send(finishGameResult);
}

export async function getAll(req: Request, res: Response) {
  const gamesResult = await gamesService.getAll();

  res.status(httpStatus.OK).send(gamesResult);
}

export async function getWithBets(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  if (!validateId(id)) throw idIsNotValid();
  const gameWithBets = await gamesService.getWithBets(id);

  res.status(httpStatus.OK).send(gameWithBets);
}

export const gamesController = {
  create,
  finishGame,
  getWithBets,
  getAll,
};
