import { Bet } from "@prisma/client";
import { betsRepository } from "../repositories/bets.repository";
import { gameIsFinished } from "../errors/gameIsFinishedError";
import { gameWithEqualTeamNames } from "../errors/gameWithEqualTeamNamesError";
import { GameBodyInput, GameFinishInput, GameTableInput } from "../protocols/index";
import { gamesRepository } from "../repositories/games.repository";
import { calculateAmountWont, wonBet } from "../utils/index";
import { participantsRepository } from "../repositories/participants.repository";
import { notFound } from "../errors/notFoundError";
import prisma from "../config/database";

function calculateAllBetsAndWinningBetsBalance(betsList: Bet[], finishedGame: GameFinishInput) {
  let allBetsTotalValue = 0;
  let allWinnerBetsTotalValue = 0;

  betsList.forEach((b: Bet) => {
    if (wonBet(b, finishedGame)) {
      allWinnerBetsTotalValue += b.amountBet;
    }

    allBetsTotalValue += b.amountBet;
  });

  return {
    allBetsTotalValue,
    allWinnerBetsTotalValue,
  };
}

async function updateBetsStatusAndParticipantsBalance(
  betsList: Bet[],
  finishedGame: GameFinishInput,
  allBetsTotalValue: number,
  allWinnerBetsTotalValue: number,
) {
  betsList.forEach(async (b: Bet) => {
    if (wonBet(b, finishedGame)) {
      const amountWon = Math.floor(calculateAmountWont(b.amountBet, allBetsTotalValue, allWinnerBetsTotalValue));
      const participant = await participantsRepository.get(b.participantId);
      await betsRepository.update(b.id, amountWon);
      await participantsRepository.updateBalance(b.participantId, participant.balance + amountWon);
    } else {
      await betsRepository.update(b.id);
    }
  });
}

async function create(game: GameBodyInput) {
  if (game.homeTeamName === game.awayTeamName) throw gameWithEqualTeamNames();

  const gameTableInput: GameTableInput = {
    ...game,
    homeTeamScore: 0,
    awayTeamScore: 0,
    isFinished: false,
  };

  return gamesRepository.create(gameTableInput);
}

async function getAll() {
  return gamesRepository.getAll();
}

async function getWithBets(id: number) {
  const gameWithBets = await gamesRepository.getWithBets(id);
  if (!gameWithBets) throw notFound();

  return gameWithBets;
}

async function finishGame(id: number, finishedGame: GameFinishInput) {
  const game = await gamesRepository.get(id);
  if (!game) throw notFound();
  if (game.isFinished) throw gameIsFinished();

  return await prisma.$transaction(async () => {
    const updatedGame = await gamesRepository.update(id, finishedGame.homeTeamScore, finishedGame.awayTeamScore);
    const betsList = await betsRepository.getAllByGameId(id);

    const { allBetsTotalValue, allWinnerBetsTotalValue } = calculateAllBetsAndWinningBetsBalance(
      betsList,
      finishedGame,
    );
    await updateBetsStatusAndParticipantsBalance(betsList, finishedGame, allBetsTotalValue, allWinnerBetsTotalValue);
    return updatedGame;
  });
}

export const gamesService = {
  create,
  getAll,
  getWithBets,
  finishGame,
};
