import { Bet } from "@prisma/client";
import { GameFinishInput } from "../protocols/index";

export function calculateAmountWont(
  amountBet: number,
  allBetsTotalValue: number,
  allWinnerBetsTotalValue: number,
  houseTax: number = 0.3,
) {
  return (amountBet / allWinnerBetsTotalValue) * allBetsTotalValue * (1 - houseTax);
}

export function wonBet(bet: Bet, finishedGame: GameFinishInput) {
  return bet.homeTeamScore === finishedGame.homeTeamScore && bet.awayTeamScore === finishedGame.awayTeamScore;
}

export function validateId(id: number) {
  if (isNaN(id) || id < 1) {
    return false;
  }

  return true;
}
