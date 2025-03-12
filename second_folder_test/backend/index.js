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

app.post("/login", (req, res) => {
    console.log(req.body)
    console.log(`Username is ${req.body.username}`);
    res.clearCookie('username', { path: '/' });
    console.log(req.cookies)
    res.cookie("username", req.body.username, { maxAge: 86400000});
    res.send('Cookie Set!');
    console.log(req.cookies)
});

app.get("/set_socket", (req, res) => {
    if (req.cookies.socket) {
        res.send('already here');
    } else {
        res.cookie("socket", req.body.socket, { maxAge: 86400000});
        res.send('Cookie Set!');
    }
})

app.get("/get_user", (req, res) => {
    const username = req.cookies.username;
    console.log(req.cookies)
    console.log(req.cookies.username)
    if (username) {
        res.send(`${username}`);
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


import { Game, Player } from "../frontend/src/utilities/game"; 
import { addNewCookies } from "../frontend/src/utilities/cookies"

let games = [];
let game0 = new Game("room0", 1);
games.push(game0); 
let currentGameNumber = 0; 
let totalPlayers = 0; 


io.on("connection", (socket) => {
    console.log(`Incoming client: ${socket.id}`); // x8WIv7-mJelg7on_ALbx

    socket.on("playerJoined", (username) => {
        let currentGame = games[currentGameNumber];
        totalPlayers += 1;

        let newPlayer = Player(username, totalPlayers, socket.id);
        currentGame.addPlayer(newPlayer);
        socket.join(currentGame.gameRoom); 
        addNewCookies(socket.id, currentGameNumber);
        io.to(currentGame.gameRoom).emit("playerConfirmed", currentGame.numberOfPlayers);

        if (currentGame.numberOfPlayers >= 4) {
            totalPlayers = 0; 
            currentGameNumber += 1; 
            let newGameRoom = "room" + (currentGameNumber); 
            let newGame = new Game(newGameRoom, currentGameNumber);
            games.push(newGame);

            io.to(currentGame.gameRoom).emit("readyToStart");
        }
    }); 
});
  
httpServer.listen(3003, () => {
    console.log("listening")
});