import { ParticipantInput } from "protocols";
import { participantsRepository } from "repositories/participants.repository";

function create(participant: ParticipantInput) {
  return participantsRepository.create(participant);
}

export const participantsService = {
  create,
};
