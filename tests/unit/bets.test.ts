import { Bet } from "@prisma/client";
import { participantsRepository } from "../../src/repositories/participants.repository";
import { mockGame } from "../factories/games.factory";
import { mockParticipant } from "../factories/participants.factory";
import { gamesRepository } from "../../src/repositories/games.repository";
import { betsService } from "../../src/services/bets.service";
import { mockBet, mockBetInput } from "../factories/bets.factory";
import { betValueIsBiggerThanParticipantsBalance } from "../../src/errors/betValueIsBiggerThanParticipantsBalanceError";
import { notFound } from "../../src/errors/notFoundError";
import { attemptToBetOnFinishedGame } from "../../src/errors/attemptToBetOnFinishedGameError";
import { minimumBetValue } from "../../src/errors/minimumBetValueError";
import { betsRepository } from "../../src/repositories/bets.repository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Bets Unit Tests", () => {
  describe("when creating a bet", () => {
    it("should return status 404 and error message when could not find a participant", () => {
      const participant = mockParticipant();
      const game = mockGame(false);
      jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(null);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);

      const betInput = mockBetInput(participant.id, game.id, participant.balance + 1);

      const promise = betsService.create(betInput);

      expect(promise).rejects.toEqual(notFound());
    });

    it("should return status 404 and error message when could not find a game", () => {
      const participant = mockParticipant();
      const game = mockGame(false);
      jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(null);

      const betInput = mockBetInput(participant.id, game.id, participant.balance);
      const promise = betsService.create(betInput);

      expect(promise).rejects.toEqual(notFound());
    });

    it("should return status 403 and error message when attempting to bet bet on a game that has already finished", () => {
      const participant = mockParticipant();
      const game = mockGame(true);
      jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);

      const betInput = mockBetInput(participant.id, game.id, participant.balance);
      const promise = betsService.create(betInput);

      expect(promise).rejects.toEqual(attemptToBetOnFinishedGame());
    });

    it("should return status 403 and error message when attempting to bet more money than participants balance", () => {
      const participant = mockParticipant();
      const game = mockGame(false);
      jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);

      const betInput = mockBetInput(participant.id, game.id, participant.balance + 1);
      const promise = betsService.create(betInput);

      expect(promise).rejects.toEqual(betValueIsBiggerThanParticipantsBalance());
    });

    it("should return status 403 and error message when attempting to bet less than $1.00", () => {
      const participant = mockParticipant();
      const game = mockGame(false);
      jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);

      const betInput = mockBetInput(participant.id, game.id, 99);
      const promise = betsService.create(betInput);

      expect(promise).rejects.toEqual(minimumBetValue());
    });

    it("should return a bet when creating a valid bet", async () => {
      const participant = mockParticipant();
      const game = mockGame(false);
      const betInput = mockBetInput(participant.id, game.id, participant.balance);
      const bet = mockBet(participant.id, game.id, participant.balance);

      jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
      jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);
      jest.spyOn(betsRepository, "create").mockResolvedValueOnce(bet);
      jest.spyOn(participantsRepository, "updateBalance").mockResolvedValueOnce({
        ...participant,
        balance: participant.balance - bet.amountBet,
      });

      const createdBet = await betsService.create(betInput);
      expect(createdBet).toEqual(expect.objectContaining<Bet>({ ...bet }));
    });
  });
});
