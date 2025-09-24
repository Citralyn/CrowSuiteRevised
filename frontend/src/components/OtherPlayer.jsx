import socket from "../../socket";
import Image from "react-bootstrap/Image"
import Container from 'react-bootstrap/Container'
import ListGroup from "react-bootstrap/ListGroup";

import { useState, useEffect } from "react";



export default function OtherPlayer({requestedIndex, givenIndex}) {
    const [username, setUsername] = useState("");
    const [numberOfCards, setNumberOfCards] = useState(0);

    const images = ["pigeon_king.png", "duck_king.png", "seagull_king.png"];

    useEffect(() => {
        console.log(username);
        console.log(numberOfCards);
    }, [username, numberOfCards]); 
    
    socket.on("updateOtherPlayers", (players) => {
        let our_number = players[socket.id].playerNumber; 
        console.log("updating others")
        console.log(requestedIndex); 
        console.log(givenIndex);
        let count = 1; 
        let requestedPlayer;
        for (const [i, player] of Object.entries(players)) {
            if (player.playerNumber == our_number) {
                continue; 
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

    function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const isMobile = useIsMobile();

    return(
        <Container style={{width: isMobile ? "25vw" : "18vw", height: isMobile ? "42vw" : "30vw"}} className="rounded p-3 other_player_bg shadow">
            <Image fluid src={images[requestedIndex - 1]}></Image>
            <ListGroup className="text-center">
                <ListGroup.Item>{username}</ListGroup.Item>
                <ListGroup.Item>{numberOfCards}</ListGroup.Item>
            </ListGroup>
        </Container>
    )
}