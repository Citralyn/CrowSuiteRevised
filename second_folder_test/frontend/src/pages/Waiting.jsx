import Button from "react-bootstrap/Button"
import socket from "../../socket";

import { useState } from "react";

export default function Waiting() {
    const [playerAmount, setPlayerAmount] = useState(0); 
    const [readyToStart, setStatus] = useState(false);

    socket.on("readyToStart", () => {
        setStatus(true); 
    })

    socket.on("playerConfirmed", (newPlayerAmount) => {
        setPlayerAmount(newPlayerAmount);
    }) 

    function startGame() {
        if (readyToStart) {
            socket.emit("client_has_started");
        }
    }

    return(
        <div>
            <h1>{playerAmount}/4 players have joined</h1>
            <Button onClick={startGame}></Button>
        </div>
    )
}