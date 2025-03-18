import socket from "../../socket.js";
import { HGap, VGap } from "../components/Gap"

import { useEffect } from "react";
import { useNavigate } from 'react-router';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"


export default function HomePage() {
  const navigateTo = useNavigate();

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`${socket.id} has connected`);
          });

        socket.on("disconnect", (reason, details) => {
            console.log(reason);
        })
    }, [])

    function goToTutorial() {
      navigateTo('/tutorial');
    }

    async function playGame() {
      navigateTo('/login');
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