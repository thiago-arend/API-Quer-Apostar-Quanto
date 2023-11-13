import prisma from "../config/database";
import { GameTableInput } from "../protocols/index";

async function create(game: GameTableInput) {
  return prisma.game.create({
    data: game,
  });
}

async function get(id: number) {
  return prisma.game.findUnique({
    where: { id },
  });
}

async function getWithBets(id: number) {
  return prisma.game.findUnique({
    where: { id },
    include: { bet: true },
  });
}

async function getAll() {
  return prisma.game.findMany();
}

async function update(id: number, homeTeamScore: number, awayTeamScore: number) {
  return prisma.game.update({
    where: { id },
    data: {
      isFinished: true,
      homeTeamScore,
      awayTeamScore,
    },
  });
}

export const gamesRepository = {
  create,
  get,
  getAll,
  getWithBets,
  update,
};
