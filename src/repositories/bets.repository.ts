import prisma from "../config/database";
import { BetTableInput } from "../protocols/index";

async function create(bet: BetTableInput) {
  return prisma.bet.create({
    data: bet,
  });
}

async function update(id: number, amountWon?: number) {
  if (!amountWon) {
    return prisma.bet.update({
      where: { id },
      data: {
        status: "LOST",
        amountWon: 0,
      },
    });
  }

  return prisma.bet.update({
    where: { id },
    data: {
      status: "WON",
      amountWon,
    },
  });
}

async function getAllByGameId(gameId: number) {
  return prisma.bet.findMany({
    where: { gameId },
  });
}

async function sumAllWinnerBetsValue(gameId: number) {
  return prisma.bet.groupBy({
    by: ["gameId"],
    _sum: {
      amountBet: true,
    },
    where: { gameId, status: "WON" },
  });
}

async function sumAllBetsValue(gameId: number) {
  return prisma.bet.groupBy({
    by: ["gameId"],
    _sum: {
      amountBet: true,
    },
    where: { gameId },
  });
}

export const betsRepository = {
  create,
  update,
  sumAllWinnerBetsValue,
  sumAllBetsValue,
  getAllByGameId,
};
