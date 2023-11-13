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

export const gamesRepository = {
  create,
  get,
};
