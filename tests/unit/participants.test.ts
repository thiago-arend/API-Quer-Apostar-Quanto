import { mockParticipant, mockParticipantInput } from "../factories/participants.factory";
import { participantsService } from "../../src/services/participants.service";
import { insufficientBalanceForParticipant } from "../../src/errors/insufficientBalanceForParticipantError";
import { participantsRepository } from "../../src/repositories/participants.repository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Participants Unit Tests", () => {
  it("should return a participant when trying to create participant with balance equal or bigger than $10.00", async () => {
    const fakeParticipant = mockParticipant(1000);
    jest.spyOn(participantsRepository, "create").mockResolvedValueOnce(fakeParticipant);
    const resultParticipant = await participantsService.create({
      name: fakeParticipant.name,
      balance: fakeParticipant.balance,
    });

    expect(resultParticipant).toEqual(fakeParticipant);
  });

  it("should return status 400 and an error message when trying to create participant with balance less than $10.00", () => {
    const promise = participantsService.create(mockParticipantInput(999));

    expect(promise).rejects.toEqual(insufficientBalanceForParticipant());
  });
});
