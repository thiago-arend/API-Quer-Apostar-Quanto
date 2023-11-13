import prisma from "../config/database";
import { BetTableInput } from "../protocols/index";

async function create(bet: BetTableInput) {
  return prisma.bet.create({
    data: bet,
  });
}

export const betsRepository = {
  create,
};
