import { insufficientBalanceForParticipant } from "../errors/insufficientBalanceForParticipantError";
import { ParticipantBodyInput } from "../protocols/index";
import { participantsRepository } from "../repositories/participants.repository";

async function create(participant: ParticipantBodyInput) {
  if (participant.balance < 1000) throw insufficientBalanceForParticipant();

  return participantsRepository.create(participant);
}

export const participantsService = {
  create,
};
