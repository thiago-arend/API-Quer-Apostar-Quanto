import prisma from "../config/database";
import { ParticipantInput } from "../protocols/index";

function create(participant: ParticipantInput) {
  return prisma.participant.create({
    data: participant,
  });
}

export const participantsRepository = {
  create,
};
