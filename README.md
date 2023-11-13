# Bet API

## About

This is an API for a betting house. You can use multiple routes simulating interaction at a real bet house.

## Deploy

You can test this API routes using deploy url: https://bet-api-ies2.onrender.com

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file (see "Running application locally or inside docker section" for details)
5. Run all migrations

```bash
npm run dev:migration:run
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
2. Configure the `.env.test` file using the `.env.example` file (see "Running application locally or inside docker" section for details)
3. Run all migrations:

```bash
npm run test:migration:run
```

4. Run test:

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running migrations or generate prisma clients

Before running migrations make sure you have a postgres db running based on `.env.development` or `.env.test` file for each environment.

You can operate on databases for different environments, but it is necessary to populate correct env variables for each environment first, so in order to perform db operations type the following commands:

- `npm run dev:migration:run` - run migrations for development environment by loading envs from .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from .env.development file.
- `npm run test:migration:run` - the same, but for test environment.

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:
- Add them to `.env.example` file
- Add them to your local `.env.development` and `.env.test` files


## Routes available
### POST /participants
Cria um participante com determinado saldo inicial.

Entry: name and initial participant balance.
```json
{
	name: string,
	balance: number
}
```
​
Out: object representing a participant.
```json
{
	id: number,
	createdAt: string,
	updatedAt: string,
	name: string,
	balance: number;
}
```

### POST /games
Creates a new game, with itial score 0x0 and not finished.

Entry: home and away team names.
```json
{
	homeTeamName: string,
	awayTeamName: string
}
```

Out: object representing a game.
```json
{
	id: number,
	createdAt: string,
	updatedAt: string,
	homeTeamName: string,
	awayTeamName: string,
	homeTeamScore: number,
	awayTeamScore: number,
	isFinished: boolean
}
```

### POST /bets
Register a bet from a participant in a specific game. 
The bet amount is immediately deducted from the participant's balance.

Entry:
```json
{ 
	homeTeamScore: number,
	awayTeamScore: number, 
	amountBet: number,
	gameId: number,
	participantId: number,
}
```
​
Out: object representing a bet.
```json
{
	id: number,
	createdAt: string,
	updatedAt: string,
	homeTeamScore: number,
	awayTeamScore: number,
	amountBet: number,
	gameId: number;,
	participantId: number,
	status: string,
	amountWon: number || null
}
```