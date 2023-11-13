import { betsRepository } from "../repositories/bets.repository";
import { gameIsFinished } from "../errors/gameIsFinishedError";
import { gameWithEqualTeamNames } from "../errors/gameWithEqualTeamNamesError";
import { GameBodyInput, GameFinishInput, GameTableInput } from "../protocols/index";
import { gamesRepository } from "../repositories/games.repository";

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

async function finishGame(id: number, gameStatus: GameFinishInput) {
  const game = await gamesRepository.get(id);
  if (game.isFinished) throw gameIsFinished();

  await gamesRepository.update(id, gameStatus.homeTeamScore, gameStatus.awayTeamScore);
  const betsList = await betsRepository.getAllByGameId(id);
  betsList.forEach(async () => {
    const totalBetValue = await betsRepository.sumAllBetsValue(id);
    console.log(totalBetValue);

    // const totalWinnerBetValue = await betsRepository.sumAllWinnerBetsValue(id);
    // console.log(totalWinnerBetValue);

    // if (b.homeTeamScore === gameStatus.homeTeamScore && b.awayTeamScore === gameStatus.awayTeamScore) {
    //   await betsRepository.update(b.id, )
    // }
  });
}

export const gamesService = {
  create,
  finishGame,
};
