-- CreateTable
CREATE TABLE "Bet" (
    "id" SERIAL NOT NULL,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "amountBet" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "amountWon" INTEGER,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "homeTeamName" TEXT NOT NULL,
    "awayTeamName" TEXT NOT NULL,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
