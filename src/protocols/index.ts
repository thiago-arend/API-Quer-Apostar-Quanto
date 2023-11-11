import { Participant } from "@prisma/client";

export type ParticipantInput = Omit<Participant, "id" | "createdAt" | "updatedAt">;
