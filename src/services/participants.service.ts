import { participantsWithEqualNames } from "../errors/participantsWithEqualNamesError";
import { insufficientBalanceForParticipant } from "../errors/insufficientBalanceForParticipantError";
import { ParticipantBodyInput } from "../protocols/index";
import { participantsRepository } from "../repositories/participants.repository";

async function create(participant: ParticipantBodyInput) {
  const participantExists = await participantsRepository.getByName(participant.name);
  if (participantExists) throw participantsWithEqualNames();
  if (participant.balance < 1000) throw insufficientBalanceForParticipant();

  return participantsRepository.create(participant);
}

async function getAll() {
  return participantsRepository.getAll();
}

export const participantsService = {
  create,
  getAll,
};
