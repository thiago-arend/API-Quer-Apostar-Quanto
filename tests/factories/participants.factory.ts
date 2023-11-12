import { faker } from "@faker-js/faker";

// by default, generates a balance value that fits in integer type
export function mockParticipant(balance?: number) {
  return {
    name: faker.person.fullName(),
    balance: balance || faker.number.int({ min: 10, max: 2147483647 }),
  };
}
