export function calculateAmountWont(
  amountBet: number,
  allBetsTotalValue: number,
  allWinnerBetsTotalValue: number,
  houseTax: number = 0.3,
) {
  return (amountBet / allWinnerBetsTotalValue) * allBetsTotalValue * (1 - houseTax);
}
