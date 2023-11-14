import { faker } from "@faker-js/faker";
import { Bet } from "@prisma/client";
import { BetBodyInput } from "../../src/protocols/index";

export function mockBetInput(
  participantId: number,
  gameId: number,
  amountBet: number,
  homeTeamScore?: number,
  awayTeamScore?: number,
): BetBodyInput {
  return {
    homeTeamScore: homeTeamScore || faker.number.int({ min: 0, max: 10 }),
    awayTeamScore: awayTeamScore || faker.number.int({ min: 0, max: 10 }),
    amountBet,
    gameId,
    participantId,
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
