import socket from "../../socket";
import Image from "react-bootstrap/Image"
import Container from 'react-bootstrap/Container'
import ListGroup from "react-bootstrap/ListGroup";

import { useState } from "react";

export default function OtherPlayer({requestedIndex, givenIndex}) {
    const [username, setUsername] = useState("");
    const [numberOfCards, setNumberOfCards] = useState(0);

    socket.on("updateOtherPlayers", (players) => {
        let count = 1; 
        let requestedPlayer;
        for (const [i, player] of Object.entries(players)) {
            if (player.playerNumber == givenIndex) {
                countinue; 
            }
            if (count == requestedIndex) {
                requestedPlayer = player; 
                break;
            }
            count++; 
        }

        setUsername(requestedPlayer.username)
        setNumberOfCards(requestedPlayer.numberOfCards); 

    });

    return(
        <Container style={{width: "15vw"}} className="rounded p-3 bg-primary shadow">
            <Image fluid src="user_icon.png"></Image>
            <ListGroup className="text-center">
                <ListGroup.Item>{username}</ListGroup.Item>
                <ListGroup.Item>{numberOfCards}</ListGroup.Item>
            </ListGroup>
        </Container>
    )
}