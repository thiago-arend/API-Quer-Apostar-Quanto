
# Technical Challenge - API Quer Apostar Quanto?

This challenge consisted on developing a bets house API, implementing some useful services for dealing with bets, games and participants.




## How to run this project locally?

***Note: this project uses version 20.8.0 of Node.js***

    1. Clone this repository

```bash
  git clone https://github.com/thiago-arend/desafio-tecnico-bet-api.git
```
#
    2. Open bash inside the folder where you cloned the repository, then access project repository

```bash
  cd desafio-tecnico-bet-api
```
#
    3. Install all dependencies

```bash
  npm install
```
#
    4. Copy and paste the file ".env.example" and save it to a new file named ".env.develoment". Next step is to change environment variables POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT so that they hold your development database information.
#
    5. If you wish to run automated tests on this project, follow the exactly same steps from step 4, changing the file name to ".env.test" and environment variables so that they point to your tests database.
#
    6. Create the development database

```bash
  npm run dev:migration:run
```
#
    7. If you wish to run automated tests on this project, create the tests database

```bash
  npm run test:migration:run
```
## How to run tests on this project?

Execute the following script at the same folder where package.json file is located

```bash
  npm run test
```

The script above will run tests for all entities in the application. If you wish to specify an entity for isolated testing, run the following script, switching 'feat' to the entity you want to test (bets, games or participants)

```bash
  npm run test feat
```

## List of API routes

All routes can be tested using an API Client of your preference, through deploy link https://bet-api-ies2.onrender.com

<details>
<summary>
<b><font color="#D9730D">POST</font></b><font> /participants
</summary>
<br>
* Creates a participant with specified balance
#
* Input:
```typescript
{
	name: string;
	balance: number; // represented in cents (e.g. 1000 cents = $10.00)
}
```
#
* Output: object representing created participant
```typescript
{
	id: number;
	name: string;
	balance: number;
    createdAt: string;
	updatedAt: string;
}
```
#
* Rules
  * Name must be unique, otherwise you'll receive <font color="red">409 (Conflict Error)</font>.
  * Balance must be inputed in cents (e.g. 1000 cents = $10.00).
  * Balance must not be less than $10.00 (1000 cents), otherwise you'll receive <font color="red">400 (Bad Request Error)</font>.
</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /games 
</summary>
<br>
* Creates an open game with score 0x0.
#
* Input:

```typescript
{
	homeTeamName: string;
	awayTeamName: string;
}
```
#
* Output: object representing created game

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number; // initialy 0
	awayTeamScore: number; // initialy 0
	isFinished: boolean; // initialy false
}
```

#
* Rules
  * Team names must be different, otherwise you'll receive <font color="red">400 (Bad Request)</font>.
</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /bets 
</summary>
<br>
* Register a bet from a participant in a specific game. The bet amount is immediately deducted from the participant's balance.
#
* Input:

```typescript
{ 
	homeTeamScore: number;
	awayTeamScore: number; 
	amountBet: number; // represented in cents (e.g. $10.00 = 1000)
	gameId: number; 
	participantId: number;
}
```
#
* Output: object representing created bet

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamScore: number;
	awayTeamScore: number;
	amountBet: number; // represented in cents (e.g. $10.00 = 1000)
	gameId: number; 
	participantId: number;
	status: string; // may be PENDING, WON or LOST
	amountWon: number || null; // null while bet is PENDING; number if bet has WON or LOST status, with amount won represented in cents
}
```
#
* Rules
  * Game and participant's id must exist, otherwise you'll get <font color="red">404 (Not Found)</font>.
  * Game cannot bet already finished by the time you create a bet, otherwise you'll get <font color="red">403 (Forbidden)</font>.
  * Bet amount must not be greater than participant's balance, otherwise you'll receive <font color="red">403 (Forbidden)</font>.
  * Bet amount must not be lesser than $1.00 (100), otherwise you'll receive <font color="red">403 (Forbidden)</font>.  

</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /games/:id/finish 
</summary>
<br>
* Finishes a game and consequently update all bets linked to it, calculating the amount won in each one and updating the balance of the winning participants.
#
* Input: game final score

```typescript
{
	homeTeamScore: number;
	awayTeamScore: number;
}
```
#
* Output: updated game object

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean; // will be set to true
}
```
#
* Rules
  * Game's id must be valid (integer equal or greater to 1), otherwise you'll get <font color="red">400 (Bad Request)</font>.
  * Game's id must exist, otherwise you'll get <font color="red">404 (Not Found)</font>.
  * You must not finish a game that has been already finished, otherwise you'll get <font color="red">403 (Forbidden)</font>.
</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /participants 
</summary>
<br>
* Returns all participants and their respective balances.
#
* Output: array containing all participants

```typescript
[
	{
		id: number;
		createdAt: string;
		updatedAt: string;
		name: string;
		balance: number; // represented in cents (e.g. $10.00 = 1000)
	}, 
	{...}
]
```
</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /games 
</summary>
<br>
* Returns all registered games.
#
* Output: array containing all games

```typescript
[
	{
		id: number;
		createdAt: string;
		updatedAt: string;
		homeTeamName: string;
		awayTeamName: string;
		homeTeamScore: number;
		awayTeamScore: number;
		isFinished: boolean;
	},
	{...}
]
```
</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /games/:id 
</summary>
<br>
* Returns the data for a game along with the bets linked to it.
#
* Output: object representing a game and an array containing all bet linked to it

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean;
	bets: {
		id: number;
		createdAt: string;
		updatedAt: string;
		homeTeamScore: number;
		awayTeamScore: number;
		amountBet: number; // represented in cents (e.g. $10.00 = 1000)
		gameId: number; 
		participantId: number;
		status: string; // may be PENDING, WON or LOST
		amountWon: number || null; // null while bet is PENDING; number if bet has WON or LOST status, with amount won represented in cents
	}[]
}
```

#
* Rules
  * Game's id must be valid (integer equal or greater to 1), otherwise you'll get <font color="red">400 (Bad Request)</font>.
  * Game's id must exist, otherwise you'll get <font color="red">404 (Not Found)</font>.
</details>