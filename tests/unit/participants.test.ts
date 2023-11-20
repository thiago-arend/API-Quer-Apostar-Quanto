import { createParticipant, mockParticipant, mockParticipantInput } from "../factories/participants.factory";
import { participantsService } from "../../src/services/participants.service";
import { insufficientBalanceForParticipant } from "../../src/errors/insufficientBalanceForParticipantError";
import { participantsRepository } from "../../src/repositories/participants.repository";
import { participantsWithEqualNames } from "../../src/errors/participantsWithEqualNamesError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Participants Unit Tests", () => {
  it("should return status 400 and an error message when trying to create participant with balance less than $10.00", () => {
    const promise = participantsService.create(mockParticipantInput(999));

    expect(promise).rejects.toEqual(insufficientBalanceForParticipant());
  });

  it("should return status 409 and an error message when trying to create more than one participant with same name", async () => {
    const participant = await createParticipant();
    jest.spyOn(participantsRepository, "get").mockResolvedValueOnce(participant);
    const promise = participantsService.create(mockParticipantInput(1000, participant.name));

    expect(promise).rejects.toEqual(participantsWithEqualNames());
  });

  it("should return a participant when trying to create a valid participant", async () => {
    const fakeParticipant = mockParticipant(1000);
    jest.spyOn(participantsRepository, "create").mockResolvedValueOnce(fakeParticipant);
    const resultParticipant = await participantsService.create({
      name: fakeParticipant.name,
      balance: fakeParticipant.balance,
    });

    expect(resultParticipant).toEqual(fakeParticipant);
  });
});
