import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"
import { useState } from "react";
import cards from './tempcards.jsx'
import { DeckCard, Card, GlowCard } from '../utilities/Card.jsx'

function CardTable() {
    return(
        <Container className="bg-success p-5 shadow rounded w-50 h-25">
            <Row>
                {Array.from({ length: 5 }, (_, i) => (
                                        <Col>
                                        <DeckCard key={i} suit={cards[i].suit} value={cards[i].value}></DeckCard>
                                        </Col>
                ))}
            </Row>
        </Container>
    )




}

function Player() {
    return(
        <Container style={{width: "15vw"}} className="rounded p-3 bg-primary shadow">
            <Image fluid src="user_icon.png"></Image>
            <ListGroup className="text-center">
                <ListGroup.Item>username</ListGroup.Item>
                <ListGroup.Item>nafef</ListGroup.Item>
            </ListGroup>
        </Container>
    )
}


function PlayerStats() {
    return(
        <Container className="w-50 bg-transparent">
        <ListGroup className=" text-center">
            <ListGroup.Item>Player # 4</ListGroup.Item>
            <ListGroup.Item>username</ListGroup.Item>
        </ListGroup>

        </Container>
    )


}

function PlayerCards({selected, setSelected}) {
    return(
        <Container className="bg-success p-5 shadow rounded w-75">
            <Col>
            <Row className="text-center">
                <Col><h1>Player #</h1></Col>
                <Col></Col>
                <Col><h1>Username</h1></Col>
            </Row>
            <Row>
                {Array.from({ length: 13 }, (_, i) => (
                    <Col>
                    <Card key={i} selected={selected} setSelected={setSelected} suit={cards[i].suit} value={cards[i].value}></Card>
                    </Col>
                ))}
            </Row>
            </Col>
        </Container>
    )
}

function SelectedCards({selected}) {
    return(
        <Container className="bg-transparent p-5 shadow rounded w-75">
            <Col>
            <Row>
                {Array.from({ length: selected }, (_, i) => (
                                        <Col>
                                        <GlowCard key={i} suit={cards[i].suit} value={cards[i].value}></GlowCard>
                                        </Col>
                ))}
            </Row>
            </Col>
            
            <Row className="justify-content-between">
                <Col><Button variant="warning">Play</Button></Col>
                <Col><Button variant="warning">Pass</Button></Col>
            </Row>
           
        </Container>
    )

}

export default function Prototype() {
    const [selected, setSelected] = useState(0); 

    return(
        <div className="bg-dark coolColor">
            <Row>

            <Player></Player>
            </Row>
            <Row>
            <Player></Player>
            <CardTable></CardTable>
            <Player></Player>
            </Row>
            {(selected > 0) && <SelectedCards selected={selected}></SelectedCards>}
<PlayerCards selected={selected} setSelected={setSelected}></PlayerCards>

        </div>
        
    )
}