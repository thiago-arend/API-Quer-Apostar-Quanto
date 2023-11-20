import { faker } from "@faker-js/faker";
import { Bet } from "@prisma/client";
import { BetBodyInput, BetTableInput } from "../../src/protocols/index";
import prisma from "../../src/config/database";

export function mockBetInput(
  participantId: number,
  gameId: number,
  amountBet: number,
  homeTeamScore?: number,
  awayTeamScore?: number,
): BetBodyInput {
  return {
    homeTeamScore: homeTeamScore === undefined ? faker.number.int({ min: 0, max: 10 }) : homeTeamScore,
    awayTeamScore: awayTeamScore === undefined ? faker.number.int({ min: 0, max: 10 }) : awayTeamScore,
    amountBet,
    gameId,
    participantId,
  };
}

export function mockBetTableInput(
  participantId: number,
  gameId: number,
  amountBet: number,
  amountWon?: number,
  status?: string,
  homeTeamScore?: number,
  awayTeamScore?: number,
): BetTableInput {
  const betInput = mockBetInput(participantId, gameId, amountBet, homeTeamScore, awayTeamScore);

  return {
    status: status || "PENDING",
    amountWon: amountWon || null,
    ...betInput,
  };
}

export function mockBet(
  participantId: number,
  gameId: number,
  amountBet: number,
  amountWon?: number,
  status?: string,
  homeTeamScore?: number,
  awayTeamScore?: number,
): Bet {
  const validDate = faker.date.recent();
  const betInput = mockBetInput(participantId, gameId, amountBet, homeTeamScore, awayTeamScore);

  return {
    id: faker.number.int({ min: 1, max: 2147483647 }),
    createdAt: validDate,
    updatedAt: validDate,
    status: status || "PENDING",
    amountWon: amountWon || null,
    ...betInput,
  };
}

export async function createBet(betInput: BetTableInput) {
  return prisma.bet.create({
    data: betInput,
  });
}
