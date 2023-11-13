import prisma from "../config/database";
import { BetTableInput } from "../protocols/index";

async function create(bet: BetTableInput) {
  return prisma.bet.create({
    data: bet,
  });
}

async function update(id: number, amountWon?: number) {
  const betUpdate = {
    status: "LOST",
    amountWon: 0,
  };

  if (amountWon) {
    (betUpdate.status = "WON"), (betUpdate.amountWon = amountWon);
  }

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
