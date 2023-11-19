import { Bet } from "@prisma/client";
import { BetsData, GameFinishInput } from "../protocols/index";

export function calculateAmountWont(amountBet: number, betsData: BetsData) {
  const { allBetsTotalValue, allWinnerBetsTotalValue } = betsData;
  const houseFee = 0.3; // this variable houseFee holds the fee percentage of the bet house
  return (amountBet / allWinnerBetsTotalValue) * allBetsTotalValue * (1 - houseFee);
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
