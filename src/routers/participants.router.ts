import { Router } from "express";
import { participantsController } from "../controllers/participants.controller";
import { validateSchemaMiddleware } from "../middlewares/schemaValidator";
import { participantSchema } from "../schemas/participant.schemas";

const participantsRouter = Router();

participantsRouter.post("/participants", validateSchemaMiddleware(participantSchema), participantsController.create);
participantsRouter.get("/participants", participantsController.getAll);

export default participantsRouter;
