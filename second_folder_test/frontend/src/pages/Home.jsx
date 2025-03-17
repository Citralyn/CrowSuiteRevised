import socket from "../../socket.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { getGameState, getGameID } from "../utilities/cookies.js"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"
import { HGap, VGap } from "../components/Gap"

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
        <div className="main_bg">
          <div style={{height: "20vh"}}></div>
          <Container className="text-center">
            <Container className=" text-center bg-secondary rounded shadow">
          <h1 style={{fontSize: "10vw"}}>CROWSUITE</h1>
            </Container>

          <Row>
            <Col><Image className="logo" src="pigeon_logo.png"></Image></Col>
            <Col><Image className="logo" src="duck_logo.png"></Image></Col>
            <Col><Image className="logo" src="seagull_logo.png"></Image></Col>
            <Col><Image className="logo" src="crow_logo.png"></Image></Col>
          </Row>
          <HGap h={"5vh"}></HGap>
          <Row className="align-items-center">
            
          <Col/>
          <Col>
          <Container className="rounded shadow" as="button" onClick={playGame}>
              <h2>Play</h2>
          </Container>
          </Col>
          <Col></Col>
          <Col>
          <Container className="rounded shadow" as="button" onClick={goToTutorial}>
            <h2>How 2 Play</h2>
          </Container>
          </Col>
          <Col/>
          </Row>
          </Container>
          <HGap h={"30vh"}></HGap>
        </div>
    )
}