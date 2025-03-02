import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server( httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("hello_from_server", "hello");
});

httpServer.listen(3000);