import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const httpServer = createServer(app);
const io = new Server( httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});



io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("hello_from_server", "hello");
    socket.on("bye", (msg) => {
        console.log(msg);
    })
});

httpServer.listen(3000); 
