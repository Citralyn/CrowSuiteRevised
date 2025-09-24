import { Server } from "socket.io";
import { createServer } from "http";
import express from "express"
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

/* if it's REMOTE */
/*
app.use(cors({
    origin: "https://crowsuite2.netlify.app",
    credentials: true
})); 
*/

/* if it's LOCAL 
*/
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})); 

app.use(express.json());
app.use(cookieParser())

const httpServer = createServer(app);

app.post("/set_game_state", (req, res) => {
    res.cookie("gamestate", req.body.gamestate, { maxAge: 86400000, overwrite: true }); 
    res.send("Updated game state")
})

app.get("/get_game_state", (req, res) => {
    if (!req.cookies.gamestate) {
        res.cookie("gamestate", "new", { maxAge: 86400000, sameSite: 'none', secure: true});
        res.send("new"); 
    } else {
        res.send(req.cookies.gamestate);
    }
})

app.post("/new_user", (req, res) => {
    res.cookie("player_id", req.body.player_id, { maxAge: 86400000, sameSite: 'none', secure: true }); 
    res.cookie("game_id", req.body.game_id, { maxAge: 86400000, sameSite: 'none', secure: true }); 
    res.send("Added Cookies!")
})

app.get("/get_game_id", (req, res) => {
    if (req.cookies.game_id) {
        res.send(req.cookies.game_id); 
    } else {
        res.send("undefined")
    }
    
})

app.get("/get_player_id", (req, res) => {
    if (req.cookies.player_id) {
        res.send(req.cookies.player_id); 
    } else {
        res.send("undefined")
    }
})

/* cors here too! */ 
const io = new Server( httpServer, {
    cookie: true,
    cors: {
        // origin: "https://crowsuite2.netlify.app" // for REMOTE 

       origin: "http://localhost:5173" // for local 
    }
});


import { Game, Player } from "../frontend/src/utilities/game.js"; 

import { getPlayType, higherThanDeck } from "../frontend/src/utilities/validation.js"

let games = [];
let game0 = new Game("room0", 1);
games.push(game0); 
let currentGameNumber = 0; 
let totalPlayers = 0; 


function getRoom(socket) {
    let room;
    for (const s of socket.rooms) {
        if (s != socket.id) {
            room = s; 
            console.log(s); 
        }
        
    }
    return room; 
}

io.on("connection", (socket) => {
    console.log(`Incoming client: ${socket.id}`); 


    socket.on("playerJoined", (username) => {
        let currentGame = games[currentGameNumber];
        totalPlayers += 1;

        let newPlayer = new Player(username, totalPlayers, socket.id);
        currentGame.addPlayer(newPlayer);
        console.log(`${socket.id} is joining ${currentGame.gameRoom}`)
        socket.join(currentGame.gameRoom); 
        socket.emit("switchToWaiting");

        setTimeout(() => {
            io.to(currentGame.gameRoom).emit("playerConfirmed", currentGame.numberOfPlayers, currentGameNumber);
        }, 100); 
        

        if (currentGame.numberOfPlayers >= 4) {
            totalPlayers = 0; 
            currentGameNumber += 1; 
            let newGameRoom = "room" + (currentGameNumber); 
            let newGame = new Game(newGameRoom, currentGameNumber);
            games.push(newGame);

            io.to(currentGame.gameRoom).emit("readyToStart");
        }
    }); 

    socket.on("clientHasStarted", (gn) => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];

        io.to(currentGame.gameRoom).emit("switchToGame");

        
        console.log(`PLAYERS -> ${currentGame.players}`)
        console.log(currentGame.gameRoom);

        let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 

        setTimeout(() => {
            io.to(currentGame.gameRoom).emit("initializeUI", currentGame.players, currentPlayer, gameNumber);
        }, 100); 
     })

    socket.on("everything_else", () => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];
        socket.emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
        socket.emit("updateOtherPlayers", currentGame.players);
    })

    socket.on("attemptToPass", () => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];

        if (currentGame.currentPlayerTurn != currentGame.players[socket.id].playerNumber) {
            socket.emit("ERROR", "You can't pass when it's not your turn.");
        } else if (currentGame.roundAmountOfCards == 0) {
            socket.emit("ERROR", "You can't pass when it's your turn to start.");
        } else {
            currentGame.pass(); 

            setTimeout(() => {
                let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
                io.to(currentGame.gameRoom).emit("ALERT", `It is ${currentPlayer}'s turn to play`)
                io.to(currentGame.gameRoom).emit("updateTurn", currentPlayer);
                io.to(currentGame.gameRoom).emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
            }, 100); 
        }


    })


    socket.on("attemptToPlay", (selected) => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];

        if (currentGame.currentPlayerTurn != currentGame.players[socket.id].playerNumber) {
            socket.emit("ERROR", "You can't play when it's not your turn.");
        } else {
                
            let playerCards = currentGame.players[socket.id].playerCards;

            let cards_to_check = []; 
            let num_cards = 0;

            for (let i = 0; i < 13; i++) {
                if (selected[i] == true) {
                    cards_to_check.push(playerCards[i]);
                    num_cards += 1; 
                }
            }

            let playType = getPlayType(cards_to_check, num_cards);


            if (playType < 0) {
                socket.emit("ERROR", "That's not a valid combination of cards.");
            } else {
                let deckIndices = currentGame.deckCardIndexes;
                let deckCards = []
                for (let i = 0; i < deckIndices.length; i++) {
                    deckCards.push(currentGame.cards[deckIndices[i]]);
                }

                let num_cards2 = deckCards.length;

                if (num_cards2 == 0) {
                    currentGame.playCards(socket.id, cards_to_check, num_cards);
                    setTimeout(() => {
                        let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
                        socket.emit("confirmMove");
                        io.to(currentGame.gameRoom).emit("updateTurn", currentPlayer);
                        io.to(currentGame.gameRoom).emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
                        io.to(currentGame.gameRoom).emit("updateOtherPlayers", currentGame.players);
                        if (currentGame.endOfGame) {
                            io.to(currentGame.gameRoom).emit("switchToResults");
                            setTimeout(() => {
                                console.log(`winner is: ${currentGame.winner.username}`)
                                io.to(currentGame.gameRoom).emit("results", currentGame.winner.username);
                            }, 300);
                        } else {
                            io.to(currentGame.gameRoom).emit("ALERT", `It is ${currentPlayer}'s turn to play`)
                        }
                    });
                } else {
                    if (num_cards != num_cards2) {
                        socket.emit("ERROR", `You need to play ${num_cards2} cards.`);
                    } else {
                        if (higherThanDeck(cards_to_check, deckCards, num_cards)) {
                            currentGame.playCards(socket.id, cards_to_check, num_cards);
                            setTimeout(() => {
                                let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
                                socket.emit("confirmMove");
                                io.to(currentGame.gameRoom).emit("updateTurn", currentPlayer);
                                io.to(currentGame.gameRoom).emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
                                io.to(currentGame.gameRoom).emit("updateOtherPlayers", currentGame.players);
                                
                                if (currentGame.endOfGame) {
                                    io.to(currentGame.gameRoom).emit("switchToResults");
                                    setTimeout(() => {
                                        io.to(currentGame.gameRoom).emit("results", currentGame.winner.username);
                                    }, 500);
                                } else {
                                    io.to(currentGame.gameRoom).emit("ALERT", `It is ${currentPlayer}'s turn to play`)
                                }
                            }, 100); 
                        } else {
                            socket.emit("ERROR", "Your cards aren't higher than deck.");
                        }
                    }

                }


            }
        }


    });

    socket.on("disconnecting", () => {
        console.log(socket.rooms); 
      });
    
      socket.on("disconnect", () => {
        console.log(`disconnecting from server`)
      });
});
  
httpServer.listen(3003, () => {
    console.log("listening")
});