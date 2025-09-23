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

  const cardImages = [
    "pigeon_jack.png", "duck_jack.png", "seagull_jack.png", "crow_jack.png",
    "pigeon_queen.png", "duck_queen.png", "seagull_queen.png", "crow_queen.png",
    "pigeon_king.png", "duck_king.png", "seagull_king.png", "crow_king.png",
  ]

  return (
    <div className="main_bg">
      <div style={{ height: "10vh" }}></div>

      <div style={{ height: "10vh" }}></div>
      <Container className="text-center">
        <Container className=" text-center text-light">
          <h1 style={{ fontSize: "10vw" }}>CROWSUITE</h1>
        </Container>

        <div style={{ height: "10vh" }}></div>
        <Row className="align-items-center justify-content-center">
          <div className="bg-light rounded" style={{ width: "40vw", padding: "0vw" }}>
            <Image style={{ width: "100%" }} src={cardImages[11]} />
          </div>
        </Row>


        <HGap h={"10vh"}></HGap>

        <Col />
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Container
            className="rounded shadow mb-2"
            as="button"
            onClick={playGame}
            style={{ maxWidth: '300px', padding: '1%' }}
          >
            <h2>Play</h2>
          </Container>
          <Container
            className="rounded shadow"
            as="button"
            onClick={goToTutorial}
            style={{ maxWidth: '300px', padding: '1%' }}
          >
            <h2>How 2 Play</h2>
          </Container>
        </Col>
      </Container>
      <div style={{ height: "10vh" }}></div>

      <div style={{ height: "10vh" }}></div>
    </div>
  )
}

/*
          <Row>
            <Col><Image className="logo" src="pigeon_logo.png"></Image></Col>
            <Col><Image className="logo" src="duck_logo.png"></Image></Col>
            <Col><Image className="logo" src="seagull_logo.png"></Image></Col>
            <Col><Image className="logo" src="crow_logo.png"></Image></Col>
          </Row>
*/