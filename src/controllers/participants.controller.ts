import { Request, Response } from "express";
import httpStatus from "http-status";
import { ParticipantInput } from "protocols";
import { participantsService } from "services/participants.service";

export async function create(req: Request, res: Response) {
  const participantInput = req.body as ParticipantInput;

  const participantResult = await participantsService.create(participantInput);
  res.send(participantResult).status(httpStatus.CREATED);
}

export const participantsController = {
  create,
};
