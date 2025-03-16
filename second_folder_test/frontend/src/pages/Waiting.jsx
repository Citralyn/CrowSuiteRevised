import Button from "react-bootstrap/Button"
import socket from "../../socket";
import { addNewCookies, setGameState } from '../utilities/cookies.js';
import { useNavigate } from 'react-router';
import { getGameID } from "../utilities/cookies.js"

import { useState } from "react";

export default function Waiting() {
    const [playerAmount, setPlayerAmount] = useState(0); 
    const [readyToStart, setStatus] = useState(false);
    const [gameID, setGameID] = useState(0);
    const navigateTo = useNavigate();

    /*
    socket.on("addPlayerCookie", (gameNumber) => {
        //addNewCookies(socket.id, gameNumber);
        console.log(`new number game ${gameNumber}`); 
        setGameID(gameNumber)
    })*/

    socket.on("readyToStart", () => {
        setStatus(true); 
    })

    socket.on("playerConfirmed", (newPlayerAmount, gameNumber) => {
        setPlayerAmount(newPlayerAmount);
        setGameID(gameNumber);
    }) 


    socket.on("switchToGame", () => {
        navigateTo("/game")
        setGameState("game")
    }) ;

    async function startGame() {
        if (readyToStart) {
            //let current_game_id = await getGameID(); 
            
            console.log("current_game_id is")
            console.log(gameID)
            socket.emit("clientHasStarted", gameID);
        }
    }

    return(
        <div>
            <h1>{playerAmount}/4 players have joined</h1>
            <Button onClick={startGame}></Button>
        </div>
    )
}