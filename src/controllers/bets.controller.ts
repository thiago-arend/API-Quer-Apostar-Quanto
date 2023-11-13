import { Request, Response } from "express";
import httpStatus from "http-status";
import { BetBodyInput } from "../protocols/index";
import { betsService } from "../services/bets.service";

export async function create(req: Request, res: Response) {
  const betInput = req.body as BetBodyInput;
  const betResult = await betsService.create(betInput);

  res.status(httpStatus.CREATED).send(betResult);
}

export const betsController = {
  create,
};
