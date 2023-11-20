import { faker } from "@faker-js/faker";
import { Participant } from "@prisma/client";
import { ParticipantBodyInput } from "../../src/protocols/index";
import prisma from "config/database";

// by default, generates a balance value that fits in integer type
export function mockParticipantInput(balance?: number, name?: string): ParticipantBodyInput {
  return {
    name: name || faker.person.fullName(),
    balance: balance || faker.number.int({ min: 100, max: 2147483647 }),
  };
}

// by default, generates a balance value that fits in integer type
export function mockParticipant(balance?: number): Participant {
  const validDate = faker.date.recent();
  const participantInput = mockParticipantInput(balance);

  return {
    ...participantInput,
    id: faker.number.int({ min: 1, max: 2147483647 }),
    createdAt: validDate,
    updatedAt: validDate,
  };
}

export async function createParticipant(balance?: number) {
  return prisma.participant.create({
    data: mockParticipantInput(balance),
  });
}
