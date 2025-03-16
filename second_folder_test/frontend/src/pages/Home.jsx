import socket from "../../socket.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { getGameState, getGameID } from "../utilities/cookies.js"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"

import Button from "react-bootstrap/Button"

export default function HomePage() {
  const navigateTo = useNavigate();

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`${socket.id} has connected`);
          });

        socket.on("disconnect", (reason, details) => {
            console.log(reason);

            console.log(details.message);

            console.log(details.description);

            console.log(details.context);
        })
    }, [])

    function goToTutorial() {
      navigateTo('/tutorial');
    }

    async function playGame() {
      navigateTo('/login');
      /*
      let state = await getGameState(); 

      if (state != "new") {
        let current_game_id = await getGameID(); 
        console.log(current_game_id)
        socket.emit("connectToPrevious", current_game_id); 

        if (state == "waiting") {
          navigateTo('/waiting');
        } else {
          navigateTo('/game');
        }

      } else {
        navigateTo('/login');
      }*/
    }

    return(
        <div className="cool_color">
          <div style={{height: "20vh"}}></div>
          <Container className="text-center">
            <Container className="w-50 other_color rounded">
          <h1>CROWSUITE</h1>
            </Container>

          <Row>
            <Col><Image className="logo" src="pigeon_logo.png"></Image></Col>
            <Col><Image className="logo" src="duck_logo.png"></Image></Col>
            <Col><Image className="logo" src="seagull_logo.png"></Image></Col>
            <Col><Image className="logo" src="crow_logo.png"></Image></Col>
          </Row>
          <Row>
          <Col/>
          <Col><Button onClick={playGame}>Play</Button></Col>
          
          <Col><Button onClick={goToTutorial}>How 2 Play</Button></Col>
          <Col/>
          </Row>
          </Container>
          <div style={{height: "20vh"}}></div>
        </div>
    )
}