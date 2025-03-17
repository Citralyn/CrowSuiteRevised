import Button from "react-bootstrap/Button"
import socket from "../../socket";
import Container from "react-bootstrap/Container";
import { HGap, VGap } from "../components/Gap"

import { useState } from "react";

export default function Results() {
    const [winner, setWinner] = useState(""); 

    socket.on("results", (the_winner) => {
        console.log(`the winner is ${the_winner}`)
        setWinner(the_winner); 
    })
    return(
        <div className="main_bg">
            <HGap h={"40vh"}></HGap>
            <Container className="w-50 rounded shadow py-3 login_card text-center">
            <h1>{winner} won!</h1>
            </Container>
            <HGap h={"60vh"}></HGap>
        </div>
    )
}