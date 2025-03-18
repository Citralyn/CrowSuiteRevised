import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { HGap, VGap } from "../components/Gap"

import { useState } from "react";

function Card1() {
    return (
        <Card style={{ width: '25vw' }}>
          <Card.Img variant="top" src="pigeon_queen.png" />
          <Card.Body>
            <Card.Title>Objective</Card.Title>
            <Card.Text>
              CrowSuite is a 4 player game where the goal is to get rid of your cards.
              On each round, the winner of the previous round will play 1, 2, 3, or 5 cards,
              and in a clockwise order each following player will play that same amount of cards.
              If a move is played that everyone passes on, a new round starts. This continues 
              until someone runs out of cards and wins the game.
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
            <Card.Title>Card Order</Card.Title>
            <Card.Text>
              Suit order * from lowest to highest * is pigeon, duck, seagull, crow.
              Card order * from lowest to highest * is numerical, so 1, 2, ..., 13. 
              Thus, a 2 of crows will beat a 2 of pigeons, but a 4 of ducks will beat a 3 of crows.
              When comparing pairs, the pair with the higher high card wins. 
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
            <Card.Title>Additional Notes</Card.Title>
            <Card.Text>
              5-card hands are the same as normal poker hands. 
              The order * from lowest to highest * is straight, flush, full-house, four-of-a-kind, straight-flush.
              A straight is 5 cards in numerical order.
              A flush is 5 cards of the same suit.
              A full-house is a pair and a triple * full-houses are ranked by the value in the triple not the pair *.
              A four-of-a-kind is 4 cards of the same value and a random single.
              A straight-flush is 5 cards in numerical order of the same suit.
            </Card.Text>
          </Card.Body>
        </Card>
      );

}

export default function Tutorial() {
    return(
        <div className="main_bg">
            <HGap h={"10vh"}></HGap>
            <Row className="text-center"><h1>How To Play CrowSuite</h1></Row>
            <HGap h={"5vh"}></HGap>
            <Row className="justify-content-center text-center">
                <Col/>
                <Col><Card1></Card1></Col>
                <Col><Card2></Card2></Col>
                <Col><Card3></Card3></Col>
                <Col/>
            </Row>
            <HGap h={"20vh"}></HGap>
        </div>
    )
}