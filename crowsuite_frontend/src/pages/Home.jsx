import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        console.log("?")
        socket.on("connect", () => {
            console.log(socket.id); 
        });

    }, [socket]); 
    
    return(
        <h1>Home</h1>
    )
}