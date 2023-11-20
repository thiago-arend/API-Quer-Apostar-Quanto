import { Bet } from "@prisma/client";
import { betsRepository } from "../repositories/bets.repository";
import { gameIsFinished } from "../errors/gameIsFinishedError";
import { gameWithEqualTeamNames } from "../errors/gameWithEqualTeamNamesError";
import { BetsData, GameBodyInput, GameFinishInput, GameTableInput, GameWithBets } from "../protocols/index";
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
  betsData: BetsData,
) {
  betsList.forEach(async (b: Bet) => {
    if (wonBet(b, finishedGame)) {
      const amountWon = Math.floor(calculateAmountWont(b.amountBet, betsData));
      const participant = await participantsRepository.get(b.participantId);
      const betUpdate = generateBetUpdateParams(true, amountWon);

      await betsRepository.update(b.id, betUpdate);
      await participantsRepository.updateBalance(b.participantId, participant.balance + amountWon);
    } else {
      const betUpdate = generateBetUpdateParams(false);
      await betsRepository.update(b.id, betUpdate);
    }
  });
}

function generateBetUpdateParams(participantWonGame: boolean, amountWon?: number) {
  if (participantWonGame) {
    return {
      status: "WON",
      amountWon,
    };
  } else {
    return {
      status: "LOST",
      amountWon: 0,
    };
  }
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

  const betsCopy = gameWithBets.bet;
  delete gameWithBets.bet;

  const gameWithBetsFormatted: GameWithBets = {
    ...gameWithBets,
    bets: betsCopy,
  };

  return gameWithBetsFormatted;
}

async function validateIfGameIsFinishedOrThrow(gameId: number) {
  const game = await gamesRepository.get(gameId);
  if (!game) throw notFound();
  if (game.isFinished) throw gameIsFinished();
}

async function finishGame(id: number, finishedGame: GameFinishInput) {
  await validateIfGameIsFinishedOrThrow(id);

  return await prisma.$transaction(async () => {
    const updatedGame = await gamesRepository.update(id, finishedGame.homeTeamScore, finishedGame.awayTeamScore);
    const betsList = await betsRepository.getAllByGameId(id);

    const calculatedResult = calculateAllBetsAndWinningBetsBalance(betsList, finishedGame);
    const { allBetsTotalValue, allWinnerBetsTotalValue } = calculatedResult;

    const betsData: BetsData = { allBetsTotalValue, allWinnerBetsTotalValue };
    await updateBetsStatusAndParticipantsBalance(betsList, finishedGame, betsData);
    return updatedGame;
  });
}

export const gamesService = {
  create,
  getAll,
  getWithBets,
  finishGame,
};
