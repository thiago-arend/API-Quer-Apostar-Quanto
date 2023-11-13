import { Game, Participant, Bet } from "@prisma/client";

export type ParticipantBodyInput = Omit<Participant, "id" | "createdAt" | "updatedAt">;
export type ParticipantTableInput = ParticipantBodyInput;
export type GameTableInput = Omit<Game, "id" | "createdAt" | "updatedAt">;
export type GameBodyInput = Omit<GameTableInput, "homeTeamScore" | "awayTeamScore" | "isFinished">;
export type BetTableInput = Omit<Bet, "id" | "createdAt" | "updatedAt">;
export type BetBodyInput = Omit<BetTableInput, "status" | "amountWon">;
