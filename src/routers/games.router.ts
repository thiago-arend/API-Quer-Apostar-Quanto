import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/schemaValidator";
import { finishGameSchema, gameSchema } from "../schemas/game.schemas";
import { gamesController } from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchemaMiddleware(gameSchema), gamesController.create);
gamesRouter.post("/games/:id/finish", validateSchemaMiddleware(finishGameSchema), gamesController.finishGame);
gamesRouter.get("/games", gamesController.getAll);
gamesRouter.get("/games/:id", gamesController.getWithBets);

export default gamesRouter;
