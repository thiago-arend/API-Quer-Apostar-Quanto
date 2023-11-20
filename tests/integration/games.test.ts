import supertest from "supertest";
import httpStatus from "http-status";
import app from "../../src/app";
import { cleanDb } from "../utils";
import prisma from "../../src/config/database";
import { createGame, mockFinishedGameInput, mockGameInput } from "../factories/games.factory";
import { createParticipant } from "../factories/participants.factory";
import { createBet, mockBetTableInput } from "../factories/bets.factory";

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe("Games Integration Tests", () => {
  describe("POST /games", () => {
    it("should return 422 in case of missing or invalid body content", async () => {
      const { status } = await api.post("/games").send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return 201 and a game if a valid game can be created", async () => {
      const game = mockGameInput(false);
      const { status, body } = await api.post("/games").send(game);

      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamScore: 0,
          awayTeamScore: 0,
          isFinished: false,
          ...game,
        }),
      );

      const gamePersisted = await prisma.game.findUnique({
        where: { id: body.id },
      });

      expect(gamePersisted).not.toBeNull();
      expect(body).toEqual({
        ...gamePersisted,
        createdAt: gamePersisted.createdAt.toISOString(),
        updatedAt: gamePersisted.updatedAt.toISOString(),
      });
    });
  });

  describe("POST /games/:id/finish", () => {
    it("it should return status 400 when providing an invalid id", async () => {
      const finishGameInput = mockFinishedGameInput();

      const { status } = await api.post(`/games/0/finish`).send(finishGameInput);

      expect(status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return 422 in case of missing or invalid body content", async () => {
      const game = await createGame();

      const { status } = await api.post(`/games/${game.id}/finish`).send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("it should return status 200 and a game with updated data matching the provided id, reflecting on participant and bets tables", async () => {
      const game = await createGame();
      // const participantOne = await createParticipant(10000);
      // const participantTwo = await createParticipant(8000);

      // const betOneInput = mockBetTableInput(participantOne.id, game.id, participantOne.balance, undefined, undefined, 2, 2);
      // const betOne = await createBet(betOneInput);

      // const betTwoInput = mockBetTableInput(participantTwo.id, game.id, 5000, undefined, undefined, 2, 0);
      // const betTwo = await createBet(betTwoInput);

      // console.log(participantOne, betOne, participantTwo, betTwo);

      const finishGameInput = mockFinishedGameInput(2, 2);

      const { status, body } = await api.post(`/games/${game.id}/finish`).send(finishGameInput);

      expect(status).toBe(httpStatus.OK);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamScore: finishGameInput.homeTeamScore,
          awayTeamScore: finishGameInput.awayTeamScore,
          isFinished: true,
        }),
      );

      // // participant one updates
      // const participantOneWon = await prisma.participant.findUnique({
      //   where: { id: participantOne.id }
      // });
      // expect(participantOneWon.balance).toBe(10500); // participants table

      // const participantOneBet = await prisma.bet.findUnique({
      //   where: { id: betOne.id }
      // });
      // expect(participantOneBet.status).toBe("WON"); // bets table
      // expect(participantOneBet.amountWon).toBe(10500);

      // // participant two updates
      // const participantTwoLost = await prisma.participant.findUnique({
      //   where: { id: participantTwo.id }
      // });
      // expect(participantTwoLost.balance).toBe(3000); // participants table

      // const participantTwoBet = await prisma.bet.findUnique({
      //   where: { id: betTwo.id }
      // });
      // expect(participantTwoBet.status).toBe("LOST"); // bets table
      // expect(participantTwoBet.amountWon).toBe(0);
    });
  });

  describe("GET /games", () => {
    it("should return 200 and two games when two of them are created", async () => {
      await createGame();
      await createGame();

      const { status, body } = await api.get("/games");

      expect(status).toBe(httpStatus.OK);
      expect(body).toHaveLength(2);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            homeTeamName: expect.any(String),
            awayTeamName: expect.any(String),
            homeTeamScore: expect.any(Number),
            awayTeamScore: expect.any(Number),
            isFinished: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe("GET /games/:id", () => {
    it("it should return status 400 when providing an invalid id", async () => {
      const { status } = await api.get(`/games/0`);

      expect(status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return 404 and error message when the supplied id does not match a existent game", async () => {
      const game = await createGame();
      await prisma.game.delete({
        where: { id: game.id },
      });

      const { status } = await api.get(`/games/${game.id}`);
      expect(status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return status 200 and a game when the supplied id matches a existent game", async () => {
      const game = await createGame();
      const participantOne = await createParticipant();
      const participantTwo = await createParticipant();

      const betOneInput = mockBetTableInput(participantOne.id, game.id, participantOne.balance);
      await createBet(betOneInput);

      const betTwoInput = mockBetTableInput(participantTwo.id, game.id, participantTwo.balance);
      await createBet(betTwoInput);

      const { status, body } = await api.get(`/games/${game.id}`);

      expect(status).toBe(httpStatus.OK);
      expect(body.bets).toHaveLength(2);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          homeTeamScore: expect.any(Number),
          awayTeamScore: expect.any(Number),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          isFinished: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          bets: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              status: expect.any(String),
              amountWon: null,
              amountBet: expect.any(Number),
              gameId: expect.any(Number),
              participantId: expect.any(Number),
              homeTeamScore: expect.any(Number),
              awayTeamScore: expect.any(Number),
            }),
          ]),
        }),
      );
    });
  });
});
