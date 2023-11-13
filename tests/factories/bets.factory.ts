import { faker } from "@faker-js/faker";
import { BetBodyInput } from "../../src/protocols/index";

export function mockBetInput(
  participantId: number,
  gameId: number,
  maxAmountBet: number,
  homeTeamScore?: number,
  awayTeamScore?: number,
): BetBodyInput {
  return {
    homeTeamScore: homeTeamScore || faker.number.int({ min: 0, max: 10 }),
    awayTeamScore: awayTeamScore || faker.number.int({ min: 0, max: 10 }),
    amountBet: faker.number.int({ min: 100, max: maxAmountBet }),
    gameId,
    participantId,
  };
}
