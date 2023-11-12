import prisma from "../config/database";
import { GameTableInput } from "../protocols/index";

async function create(game: GameTableInput) {
  return prisma.game.create({
    data: game,
  });
}

export const gamesRepository = {
  create,
};
