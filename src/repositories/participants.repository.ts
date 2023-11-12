import prisma from "../config/database";
import { ParticipantTableInput } from "../protocols/index";

async function create(participant: ParticipantTableInput) {
  return prisma.participant.create({
    data: participant,
  });
}

export const participantsRepository = {
  create,
};
