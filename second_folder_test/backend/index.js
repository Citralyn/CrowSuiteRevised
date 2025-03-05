import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

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