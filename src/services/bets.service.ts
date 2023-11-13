import { participantsRepository } from "../repositories/participants.repository";
import { BetBodyInput, BetTableInput } from "../protocols/index";
import { betsRepository } from "../repositories/bets.repository";
import { betValueIsBiggerThanParticipantsBalance } from "../errors/betValueIsBiggerThanParticipantsBalanceError";
import { notFound } from "../errors/notFoundError";
import { gamesRepository } from "../repositories/games.repository";
import { attemptToBetOnFinishedGame } from "../errors/attemptToBetOnFinishedGameError";
import prisma from "../config/database";
import { minimumBetValue } from "../errors/minimumBetValueError";

async function validateBetCreationAndReturnParticipantOrThrow(bet: BetBodyInput) {
  const participant = await participantsRepository.get(bet.participantId);
  const game = await gamesRepository.get(bet.gameId);
  if (!participant || !game) throw notFound();

  if (game.isFinished) throw attemptToBetOnFinishedGame();
  if (bet.amountBet > participant.balance) throw betValueIsBiggerThanParticipantsBalance();
  if (bet.amountBet < 100) throw minimumBetValue();

  return participant;
}

async function create(bet: BetBodyInput) {
  const participant = await validateBetCreationAndReturnParticipantOrThrow(bet);

  const betTableInput: BetTableInput = {
    ...bet,
    status: "PENDING",
    amountWon: null,
  };

  const betFromTransaction = await prisma.$transaction(async () => {
    const bet = await betsRepository.create(betTableInput);
    await participantsRepository.updateBalance(participant.id, participant.balance - bet.amountBet);

    return bet;
  });

  return betFromTransaction;
}

export const betsService = {
  create,
};
