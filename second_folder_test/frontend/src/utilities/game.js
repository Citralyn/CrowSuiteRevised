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

    players = {}
    playerUsernames = []; 
    winner = null;
    endOfGame = false;

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

        this.cards.sort((a, b) => (a.value - b.value));
    }

    
    playCards(playerID, attemptingToPlay, numberOfCards) {
        this.numberOfPasses = 0;

        this.currentPlayerTurn += 1;
        if (this.currentPlayerTurn >= 5) {
            this.currentPlayerTurn = 1;
        }

        this.players[playerID].numberOfCards -= numberOfCards;

        this.deckCardIndexes = [];

        let count = 0; 
        for (let i = 0; i < 52; i++) {
            if (this.cards[i] == attemptingToPlay[count]) {
                this.deckCardIndexes.push(i); 
                count++; 
            }
        }

        this.roundAmountOfCards = numberOfCards; 

        if (this.players[playerID].numberOfCards == 0) {
            this.winner = this.players[playerID]; 
            this.endOfGame = true; 
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
            this.deckCardIndexes = [];
        }
    } 

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