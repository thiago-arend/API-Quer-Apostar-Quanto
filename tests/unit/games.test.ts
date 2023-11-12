import { gamesService } from "../../src/services/games.service";
import { gamesRepository } from "../../src/repositories/games.repository";
import { mockGame, mockGameInput } from "../factories/games.factory";
import { gameWithEqualTeamNames } from "../../src/errors/gameWithEqualTeamNamesError";

describe("Games Unit Tests", () => {
  it("should return a game when trying to create game with different team names", async () => {
    const fakeGame = mockGame();
    jest.spyOn(gamesRepository, "create").mockResolvedValueOnce(fakeGame);
    const resultGame = await gamesService.create({
      homeTeamName: fakeGame.homeTeamName,
      awayTeamName: fakeGame.awayTeamName,
    });

    expect(resultGame).toEqual(fakeGame);
  });

  it("should return status 400 and an error message when trying to create game with equal team names", () => {
    const promise = gamesService.create(mockGameInput(true));

    expect(promise).rejects.toEqual(gameWithEqualTeamNames());
  });
});
