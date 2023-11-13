import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/schemaValidator";
import { gameSchema } from "../schemas/game.schemas";
import { gamesController } from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchemaMiddleware(gameSchema), gamesController.create);
gamesRouter.post("/games/:id/finish", gamesController.finishGame);

export default gamesRouter;
