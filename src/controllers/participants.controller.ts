import { Request, Response } from "express";
import httpStatus from "http-status";
import { ParticipantBodyInput } from "../protocols/index";
import { participantsService } from "../services/participants.service";

export async function create(req: Request, res: Response) {
  const participantInput = req.body as ParticipantBodyInput;
  const participantResult = await participantsService.create(participantInput);

  res.status(httpStatus.CREATED).send(participantResult);
}

export async function getAll(req: Request, res: Response) {
  const participantsResult = await participantsService.getAll();

  res.status(httpStatus.OK).send(participantsResult);
}

export const participantsController = {
  create,
  getAll,
};
