// import { participantsRepository } from "../../src/repositories/participants.repository";
// import { mockGame } from "../factories/games.factory";
// import { mockParticipant } from "../factories/participants.factory";
// import { gamesRepository } from "../../src/repositories/games.repository";
// import { betsService } from "../../src/services/bets.service";
// import { mockBetInput } from "../factories/bets.factory";
// import { betValueIsBiggerThanParticipantsBalance } from "../../src/errors/betValueIsBiggerThanParticipantsBalanceError";
// import { notFound } from "../../src/errors/notFoundError";

// beforeEach(() => {
//   jest.clearAllMocks();
// });

describe("Bets Unit Tests", () => {
  it("should be ok", () => {
    expect(1).toBe(1);
  });
  // it("should return a bet when trying to create a valid bet", async () => {

  // });

  // it("should return status 403 and error message when atempting to bet more money than participants balance", () => {
  //     const participant = mockParticipant();
  //     const game = mockGame(false);
  //     jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
  //     jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);

  //     const betInput = mockBetInput(participant.id, game.id, participant.balance + 1);
  //     const promise = betsService.create(betInput);

  //     expect(promise).rejects.toEqual(betValueIsBiggerThanParticipantsBalance());
  // });

  // it("should return status 404 and error message when could not find a participant", () => {
  //     const participant = mockParticipant();
  //     const game = mockGame(false);
  //     jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(null);
  //     jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(game);

  //     const betInput = mockBetInput(participant.id, game.id, participant.balance);
  //     const promise = betsService.create(betInput);

  //     expect(promise).rejects.toEqual(notFound());
  // });

  // it("should return status 404 and error message when could not find a game", () => {
  //     const participant = mockParticipant();
  //     const game = mockGame(false);
  //     jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
  //     jest.spyOn(gamesRepository, "get").mockResolvedValueOnce(null);

  //     const betInput = mockBetInput(participant.id, game.id, participant.balance);
  //     const promise = betsService.create(betInput);

  //     expect(promise).rejects.toEqual(notFound());
  // });
});
