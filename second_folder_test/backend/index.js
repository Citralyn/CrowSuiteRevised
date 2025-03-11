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
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
  
httpServer.listen(3003, () => {
    console.log("listening")
});