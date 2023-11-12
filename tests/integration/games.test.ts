import supertest from "supertest";
import httpStatus from "http-status";
import app from "../../src/app";
import { cleanDb } from "../utils";
import prisma from "../../src/config/database";
import { mockGameInput } from "../factories/games.factory";

beforeEach(() => {
  cleanDb();
});

const api = supertest(app);

describe("Games Integration Tests", () => {
  describe("POST /games", () => {
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

    it("should return 422 in case of missing or invalid body content", async () => {
      const { status } = await api.post("/games").send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });
});
