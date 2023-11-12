import { insufficientBalanceForParticipant } from "../errors/insufficientBalanceForParticipantError";
import { ParticipantInput } from "../protocols/index";
import { participantsRepository } from "../repositories/participants.repository";

async function create(participant: ParticipantInput) {
  if (participant.balance < 1000) throw insufficientBalanceForParticipant();

  return participantsRepository.create(participant);
}

export const participantsService = {
  create,
};
