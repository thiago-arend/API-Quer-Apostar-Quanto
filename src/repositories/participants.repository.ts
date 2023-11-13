import prisma from "../config/database";
import { ParticipantTableInput } from "../protocols/index";

async function create(participant: ParticipantTableInput) {
  return prisma.participant.create({
    data: participant,
  });
}

async function get(id: number) {
  return prisma.participant.findUnique({
    where: { id },
  });
}

async function updateBalance(id: number, balance: number) {
  return prisma.participant.update({
    where: { id },
    data: { balance },
  });
}

export const participantsRepository = {
  create,
  get,
  updateBalance,
};
