import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card';
import socket from "../../socket";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState } from "react";

function Card1() {
    return (
        <Card style={{ width: '25vw' }}>
          <Card.Img variant="top" src="pigeon_queen.png" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      );

}

function Card2() {
    return (
        <Card style={{ width: '25vw' }}>
          <Card.Img variant="top" src="duck_king.png" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      );

}

function Card3() {
    return (
        <Card style={{ width: '25vw' }}>
          <Card.Img variant="top" src="seagull_jack.png" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      );

}

export default function Tutorial() {
    return(
        <div>
            <Row className="text-center"><h1>How To Play CrowSuite</h1></Row>
            <Row>
                <Col><Card1></Card1></Col>
                <Col><Card2></Card2></Col>
                <Col><Card3></Card3></Col>
            </Row>
        </div>
    )
}