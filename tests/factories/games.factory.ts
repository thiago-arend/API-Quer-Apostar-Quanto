import { faker } from "@faker-js/faker";
import { Game } from "@prisma/client";
import { GameBodyInput } from "../../src/protocols/index";
import prisma from "config/database";

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

export function mockGame(isFinished?: boolean, homeTeamScore?: number, awayTeamScore?: number): Game {
  const validDate = faker.date.recent();

  return {
    homeTeamScore: homeTeamScore === undefined ? faker.number.int({ min: 0, max: 10 }) : homeTeamScore,
    awayTeamScore: awayTeamScore === undefined ? faker.number.int({ min: 0, max: 10 }) : awayTeamScore,
    isFinished: isFinished !== undefined ? isFinished : faker.datatype.boolean(),
    id: faker.number.int({ min: 1, max: 2147483647 }),
    createdAt: validDate,
    updatedAt: validDate,
    ...mockGameInput(false),
  };
}

export async function createGame(isFinished?: boolean, homeTeamScore?: number, awayTeamScore?: number) {
  return prisma.game.create({
    data: {
      ...mockGameInput(false),
      homeTeamScore: homeTeamScore === undefined ? 0 : homeTeamScore,
      awayTeamScore: awayTeamScore === undefined ? 0 : awayTeamScore,
      isFinished: isFinished === undefined ? false : isFinished,
    },
  });
}
