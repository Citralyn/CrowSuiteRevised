import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id); 
        });
        
        socket.on("disconnect", () => {
            console.log(socket.id); 
        });
        
        socket.on("hello_from_server", (msg) => {
            console.log(msg);
        })
    
    }, []); 

    return(
        <h1>Home</h1>
    )
}