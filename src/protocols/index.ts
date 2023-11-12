import { Game, Participant } from "@prisma/client";

export type ParticipantBodyInput = Omit<Participant, "id" | "createdAt" | "updatedAt">;
export type ParticipantTableInput = ParticipantBodyInput;
export type GameTableInput = Omit<Game, "id" | "createdAt" | "updatedAt">;
export type GameBodyInput = Omit<GameTableInput, "homeTeamScore" | "awayTeamScore" | "isFinished">;
