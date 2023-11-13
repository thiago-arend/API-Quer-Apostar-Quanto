import express, { json, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import participantsRouter from "./routers/participants.router";
import { handleApplicationErrors } from "./middlewares/errorHandler";
import gamesRouter from "./routers/games.router";
import betsRouter from "./routers/bets.router";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("OK!"));
app.use(participantsRouter);
app.use(gamesRouter);
app.use(betsRouter);
app.use(handleApplicationErrors);

export default app;
