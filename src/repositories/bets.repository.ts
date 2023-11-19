import prisma from "../config/database";
import { BetTableInput, BetUpdateParams } from "../protocols/index";

async function create(bet: BetTableInput) {
  return prisma.bet.create({
    data: bet,
  });
}

async function update(id: number, betUpdate: BetUpdateParams) {
  return prisma.bet.update({
    where: { id },
    data: { ...betUpdate },
  });
}

async function getAllByGameId(gameId: number) {
  return prisma.bet.findMany({
    where: { gameId },
  });
}

export const betsRepository = {
  create,
  update,
  getAllByGameId,
};
