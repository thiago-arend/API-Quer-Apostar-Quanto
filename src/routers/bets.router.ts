import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/schemaValidator";
import { betSchema } from "../schemas/bet.schemas";
import { betsController } from "../controllers/bets.controller";

const betsRouter = Router();

betsRouter.post("/bets", validateSchemaMiddleware(betSchema), betsController.create);

export default betsRouter;
