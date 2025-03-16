import { Server } from "socket.io";
import { createServer } from "http";
import express from "express"
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

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

const io = new Server( httpServer, {
    cookie: true,
    cors: {
        origin: "http://localhost:5173"
    }
});


import { Game, Player } from "../frontend/src/utilities/game.js"; 

import { getPlayType, higherThanDeck } from "../frontend/src/utilities/validation.js"

let games = [];
let game0 = new Game("room0", 1);
games.push(game0); 
let currentGameNumber = 0; 
let totalPlayers = 0; 

async function see_all_clients(io) {
    const ids = await io.allSockets();
    for (const id of ids) {
        console.log(`all clients -> ${id}`);
    }
}

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
    console.log(`Incoming client: ${socket.id}`); // x8WIv7-mJelg7on_ALbx


    socket.on("playerJoined", (username) => {
        let currentGame = games[currentGameNumber];
        totalPlayers += 1;

        let newPlayer = new Player(username, totalPlayers, socket.id);
        currentGame.addPlayer(newPlayer);
        console.log(`${socket.id} is joining ${currentGame.gameRoom}`)
        socket.join(currentGame.gameRoom); 
        socket.emit("switchToWaiting");
        //socket.emit("addPlayerCookie", currentGameNumber); 
        setTimeout(() => {
            io.to(currentGame.gameRoom).emit("playerConfirmed", currentGame.numberOfPlayers, currentGameNumber);
        }, 500); 
        

        if (currentGame.numberOfPlayers >= 4) {
            totalPlayers = 0; 
            currentGameNumber += 1; 
            let newGameRoom = "room" + (currentGameNumber); 
            let newGame = new Game(newGameRoom, currentGameNumber);
            games.push(newGame);

            io.to(currentGame.gameRoom).emit("readyToStart");
        }
    }); 

    /*
    socket.on("getUI", () => {
        let currentGame = games[games.length - 1];
        let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
        console.log("INITS??")
        io.to(currentGame.gameRoom).emit("initializeUI", currentGame.players, currentPlayer);
    }); */

    socket.on("clientHasStarted", (gn) => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];

        see_all_clients(io); 
        io.to(currentGame.gameRoom).emit("switchToGame");

        
        console.log(`PLAYERS -> ${currentGame.players}`)
        console.log(currentGame.gameRoom);

        let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
        console.log("INITS??")

        setTimeout(() => {
            io.to(currentGame.gameRoom).emit("initializeUI", currentGame.players, currentPlayer, gameNumber);
        }, 500); 
        
        //socket.emit("initializeUI", currentGame.players, currentPlayer)
        //socket.emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
        //socket.emit("updateOtherPlayers", currentGame.players);
        
        //io.to(currentGame.gameRoom).emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
        //io.to(currentGame.gameRoom).emit("updateOtherPlayers", currentGame.players);
    })

    socket.on("everything_else", () => {
        console.log("tests")
        let currentGame = games[0];
        socket.emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
        socket.emit("updateOtherPlayers", currentGame.players);
    })

    socket.on("connectToPrevious", (gameRoomNumber, oldPlayer) => {
        
        console.log(gameRoomNumber)
        let currentGame = games[gameRoomNumber];
        socket.join(currentGame.gameRoom); 
        currentGame.players[socket.id] = currentGame.players[oldPlayer];
        console.log(currentGame.players); 

    })

    socket.on("attemptToPass", () => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];

        if (currentGame.currentPlayerTurn != currentGame.players[socket.id].playerNumber) {
            alert("NOT UR TURN TO PASS");
        } else {
            currentGame.pass(); 

            setTimeout(() => {
                let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
                
                io.to(currentGame.gameRoom).emit("updateTurn", currentPlayer);
                io.to(currentGame.gameRoom).emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
            }, 1000); 
        }


    })


    socket.on("attemptToPlay", (selected) => {
        let gameNumber = parseInt(getRoom(socket).substring(4));
        let currentGame = games[gameNumber];

        if (currentGame.currentPlayerTurn != currentGame.players[socket.id].playerNumber) {
            socket.emit("ERROR", "NOT UR TURN TO PLAY");
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

            socket.emit("ERROR", playType);

            if (playType < 0) {
                socket.emit("ERROR", "INVALID PLAY TYPE");
            } else {
                let deckIndices = currentGame.deckCardIndexes;
                let deckCards = []
                for (let i = 0; i < deckIndices.length; i++) {
                    deckCards.push(currentGame.cards[deckIndices[i]]);
                }

                let num_cards2 = deckCards.length;

                if (num_cards2 == 0) {
                    socket.emit("ERROR", "START OF ROUND");
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
                                io.to(currentGame.gameRoom).emit("results", currentGame.winner);
                            }, 200);
                        }
                    }, 1000); 
                } else {
                    if (num_cards != num_cards2) {
                        socket.emit("ERROR", "NOT CORRECT CARDS");
                    } else {
                        if (higherThanDeck(cards_to_check, deckCards, num_cards)) {
                            socket.emit("ERROR", "Yay");
                            currentGame.playCards(socket.id, cards_to_check, num_cards);
                            setTimeout(() => {
                                let currentPlayer = currentGame.playerUsernames[currentGame.currentPlayerTurn - 1]; 
                                socket.emit("confirmMove");
                                io.to(currentGame.gameRoom).emit("updateTurn", currentPlayer);
                                io.to(currentGame.gameRoom).emit("updateDeck", currentGame.cards, currentGame.deckCardIndexes);
                                io.to(currentGame.gameRoom).emit("updateOtherPlayers", currentGame.players);
                            }, 1000); 
                        } else {
                            socket.emit("ERROR", "NOT HIGHER THAN DECK");
                        }
                    }

                }


            }
        }


    });

    socket.on("disconnecting", () => {
        console.log(socket.rooms); // the Set contains at least the socket ID
      });
    
      socket.on("disconnect", () => {
        console.log(`disconnecting from server`)
      });
});
  
httpServer.listen(3003, () => {
    console.log("listening")
});