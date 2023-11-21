import { gamesService } from "../../src/services/games.service";
import { gamesRepository } from "../../src/repositories/games.repository";
import { mockGame, mockGameInput } from "../factories/games.factory";
import { gameWithEqualTeamNames } from "../../src/errors/gameWithEqualTeamNamesError";
import { notFound } from "../../src/errors/notFoundError";
import { gameIsFinished } from "../../src/errors/gameIsFinishedError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Games Unit Tests", () => {
  describe("When creating a game", () => {
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

  describe("When finishing a game", () => {
    it("should return 404 and error message when game id does not exist", async () => {
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(null);
      const promise = gamesService.finishGame(1, {
        awayTeamScore: 0,
        homeTeamScore: 0,
      });
      expect(promise).rejects.toEqual(notFound());
    });

    it("should return 403 and error message when trying to finish already finished game", async () => {
      const game = mockGame(true);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);
      const promise = gamesService.finishGame(1, {
        awayTeamScore: 0,
        homeTeamScore: 0,
      });
      expect(promise).rejects.toEqual(gameIsFinished());
    });
  });
});
