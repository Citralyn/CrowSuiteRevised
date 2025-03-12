import { generateDeck, shuffleCards } from "./deck.js"

class Game {
    gameRoom;
    gameNumber; 
    numberOfPlayers = 0; 

    roundAmountOfCards = 0; 
    currentPlayerTurn = 1; 
    numberOfPasses = 0; 
    cards = []; 
    deckCardIndexes = []; 

    players;
    winner = null;

    constructor(gameRoom, gameNumber) {
        this.gameRoom = gameRoom; 
        this.gameNumber = gameNumber; 
        this.players = new Map();
    }

    addPlayer(newPlayer) {
        this.numberOfPlayers += 1; 

        newPlayer.gameRoom = this.gameRoom; 
        newPlayer.gameNumber = this.gameNumber; 

        this.players.set(newPlayer.playerId, newPlayer);

        if (this.totalPlayers == 4) {
            this.dealCards(); 
        }
    }

    dealCards() {
        let newCards = generateDeck(); 
        shuffleCards(newCards); 
        this.cards = newCards;

        for (const value of this.players.values()) {
            let i = value.playerNumber;
            value.playerCards = newCards.slice(i - 1, 13 * i);
            value.playerCards.sort((a, b) => (a.value - b.value));
        }
    }

    /* yet to check
    playCards(playerNumber, attemptingToPlay, numberOfCards) {
        this.numberOfPasses = 0;

        this.currentPlayerTurn += 1;
        if (this.currentPlayerTurn >= 5) {
            this.currentPlayerTurn = 1;
        }

        this.players[playerNumber - 1].numberOfCards -= numberOfCards;
        this.cardsInDeck = attemptingToPlay; 
        this.roundAmountOfCards = numberOfCards; 

        console.log(`Current player ${this.players[playerNumber - 1].username}
            has ${this.players[playerNumber - 1].numberOfCards}!`); 

        if (this.players[playerNumber - 1].numberOfCards == 0) {
            this.gameOver = true;
            this.winner = this.players[playerNumber - 1]; 
            console.log(`GAME OVER -> ${this.gameOver}`);
        }
    }

    pass() {
        this.numberOfPasses += 1; 

        this.currentPlayerTurn += 1;
        if (this.currentPlayerTurn >= 5) {
            this.currentPlayerTurn = 1;
        }

        if (this.numberOfPasses == 3) {
            this.numberOfPasses = 0; 
            this.roundAmountOfCards = 0; 
            this.cardsInDeck = [];
        }
    } */

}

class Player {
    gameRoom;
    gameNumber;

    username; 
    playerNumber; 
    playerId; 

    playerCards;
    numberOfCards = 13; 

    constructor(username, number, playerId) {
        this.username = username; 
        this.playerNumber = number;
        this.playerId = playerId; 
    }
}

export { Game, Player };