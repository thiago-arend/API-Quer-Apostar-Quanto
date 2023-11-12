import { GameBodyInput, GameTableInput } from "../protocols/index";
import { gamesRepository } from "../repositories/games.repository";

async function create(game: GameBodyInput) {
  const gameTableInput: GameTableInput = {
    ...game,
    homeTeamScore: 0,
    awayTeamScore: 0,
    isFinished: false,
  };

  return gamesRepository.create(gameTableInput);
}

export const gamesService = {
  create,
};
