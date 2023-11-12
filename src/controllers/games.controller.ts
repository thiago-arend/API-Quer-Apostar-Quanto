import { Request, Response } from "express";
import httpStatus from "http-status";
import { GameBodyInput } from "../protocols/index";
import { gamesService } from "../services/games.service";

export async function create(req: Request, res: Response) {
  const gameInput = req.body as GameBodyInput;
  const gameResult = await gamesService.create(gameInput);

  res.status(httpStatus.CREATED).send(gameResult);
}

export const gamesController = {
  create,
};
