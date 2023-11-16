import supertest from "supertest";
import httpStatus from "http-status";
import app from "../../src/app";
import { cleanDb } from "../utils";
import { createParticipant, mockParticipantInput } from "../factories/participants.factory";
import prisma from "../../src/config/database";

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe("Participants Integration Tests", () => {
  describe("POST /participants", () => {
    it("should return 422 in case of missing or invalid body content", async () => {
      const { status } = await api.post("/participants").send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return 201 and a participant if a valid participant can be created", async () => {
      const participant = mockParticipantInput();
      const { status, body } = await api.post("/participants").send(participant);

      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          ...participant,
        }),
      );

      const participantPersisted = await prisma.participant.findUnique({
        where: { id: body.id },
      });

      expect(participantPersisted).not.toBeNull();
      expect(body).toEqual({
        ...participantPersisted,
        createdAt: participantPersisted.createdAt.toISOString(),
        updatedAt: participantPersisted.updatedAt.toISOString(),
      });
    });
  });

  describe("GET /participants", () => {
    it("should return 200 and two participants when two of them are created", async () => {
      await createParticipant();
      await createParticipant();

      const { status, body } = await api.get("/participants");

      expect(status).toBe(httpStatus.OK);
      expect(body).toHaveLength(2);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            balance: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      );
    });
  });
});
