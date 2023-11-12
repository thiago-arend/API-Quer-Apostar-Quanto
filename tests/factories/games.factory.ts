import { faker } from "@faker-js/faker";
import { Game } from "@prisma/client";
import { GameBodyInput } from "../../src/protocols/index";

export function mockGameInput(equalNames: boolean): GameBodyInput {
  const gameInput: GameBodyInput = {
    homeTeamName: faker.commerce.productName(),
    awayTeamName: faker.commerce.productMaterial(),
  };

  if (equalNames) {
    gameInput.awayTeamName = gameInput.homeTeamName;
  }

  return gameInput;
}

export function mockGame(homeTeamScore?: number, awayTeamScore?: number, isFinished?: boolean): Game {
  const validDate = faker.date.recent();

  return {
    homeTeamScore: homeTeamScore || faker.number.int({ min: 0, max: 10 }),
    awayTeamScore: awayTeamScore || faker.number.int({ min: 0, max: 10 }),
    isFinished: isFinished !== undefined ? isFinished : faker.datatype.boolean(),
    id: faker.number.int({ min: 1, max: 2147483647 }),
    homeTeamName: faker.commerce.productName(),
    awayTeamName: faker.commerce.productMaterial(),
    createdAt: validDate,
    updatedAt: validDate,
  };
}
