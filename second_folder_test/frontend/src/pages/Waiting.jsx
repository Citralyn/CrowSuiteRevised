import Button from "react-bootstrap/Button"
import socket from "../../socket";
import { addNewCookies, setGameState } from '../utilities/cookies.js';
import { useNavigate } from 'react-router';
import { getGameID } from "../utilities/cookies.js"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"
import { HGap, VGap } from "../components/Gap"

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
        <div className="cool_color">
            <HGap h={"10vh"}></HGap>
            <div style={{height: "20vh"}}></div>
            <Container className="p-4 login_card rounded w-50 text-center">
            <h1>{playerAmount}/4 players have joined</h1>
            <Button variant="primary" onClick={startGame}>START</Button>
            </Container>
            <HGap h={"60vh"}></HGap>
        </div>
    )
}