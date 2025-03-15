import { generateDeck, shuffleCards } from "./deck.js"

class Game {
    gameRoom;
    gameNumber; 
    numberOfPlayers = 0; 

    roundAmountOfCards = 0; 
    currentPlayerTurn = 1; 
    numberOfPasses = 0; 
    cards = []; 
    deckCardIndexes = [3, 14, 39]; 

    players = {}
    playerUsernames = []; 
    winner = null;

    constructor(gameRoom, gameNumber) {
        this.gameRoom = gameRoom; 
        this.gameNumber = gameNumber; 
    }

    addPlayer(newPlayer) {
        this.numberOfPlayers += 1; 

        newPlayer.gameRoom = this.gameRoom; 
        newPlayer.gameNumber = this.gameNumber; 

        this.players[newPlayer.playerId] = newPlayer;
        this.playerUsernames.push(newPlayer.username); 

        if (this.numberOfPlayers == 4) {
            this.dealCards(); 
        }
    }

    dealCards() {
        let newCards = generateDeck(); 
        shuffleCards(newCards); 
        this.cards = newCards;

        for (const [index, player] of Object.entries(this.players)) {
            let i = player.playerNumber;
            player.playerCards = newCards.slice(13 * (i - 1), 13 * i);
            player.playerCards.sort((a, b) => (a.value - b.value));
            console.log(`player ${i}'s cards: ${player.playerCards[i].value}`)
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