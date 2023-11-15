import supertest from "supertest";
import httpStatus from "http-status";
import app from "../../src/app";
import { cleanDb } from "../utils";
import prisma from "../../src/config/database";
import { createParticipant } from "../factories/participants.factory";
import { createGame } from "../factories/games.factory";
import { mockBetInput } from "../factories/bets.factory";

const api = supertest(app);

describe("Bets Integration Tests", () => {
  describe("POST /bets", () => {
    it("should return 201 and a bet if a valid bet can be created", async () => {
      await cleanDb();

      const participant = await createParticipant();
      const game = await createGame(false);
      const betInput = mockBetInput(participant.id, game.id, participant.balance);

      const { status, body } = await api.post("/bets").send(betInput);

      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          status: "PENDING",
          amountWon: null,
          ...betInput,
        }),
      );

      const betPersisted = await prisma.bet.findUnique({
        where: { id: body.id },
      });
      console.log(betPersisted);

      expect(betPersisted).not.toBeNull();
      expect(body).toEqual({
        ...betPersisted,
        createdAt: betPersisted.createdAt.toISOString(),
        updatedAt: betPersisted.updatedAt.toISOString(),
      });
    });

    it("should return 422 in case of missing or invalid body content", async () => {
      const { status } = await api.post("/bets").send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });
});
