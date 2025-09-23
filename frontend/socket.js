import { io } from "socket.io-client";

// if REMOTE
const socket = io("https://crowsuiterevised.onrender.com");

// if local
//const socket = io("http://localhost:3003");
export default socket; 