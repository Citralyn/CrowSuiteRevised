import OtherPlayer from "../components/OtherPlayer"
import Deck from "../components/Deck.jsx"
import Message from "../components/Message"
import { SelectedCard, HeldCard } from "../components/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"

import socket from "../../socket.js";
import { getPlayerID } from "../utilities/cookies.js"

import { useState, useEffect } from "react";


function Selection({cards, held, setHeld, selected, setSelected, 
    amountSelected, setAmountSelected}) {
    return(
        <Container>
                <Row>
                {Array.from({ length: selected.length }, (_, i) => (
                    <Col key={i} >
                        <SelectedCard 
                        id = {i}
                        cards = {cards}
                        held={held}
                        setHeld={setHeld}
                        selected={selected}
                        setSelected={setSelected}
                        amountSelected={amountSelected}
                        setAmountSelected={setAmountSelected}
                        >
                        </SelectedCard>
                    </Col>
                ))}
                </Row>
                <Row>
                    <Col><Button>Play</Button></Col>
                    <Col><Button>Pass</Button></Col>
                </Row>
        </Container>
    )

}

function PlayerCards({playerNumber, username, cards, held, setHeld, 
    selected, setSelected, amountSelected, setAmountSelected}) {
    return(
        <Container>
                <Row>
                    <Col>Player# {playerNumber}</Col>
                    <Col>{username}</Col>
                </Row>
                <Row>
                {Array.from({ length: held.length }, (_, i) => (
                    <Col key={i} >
                        <HeldCard 
                        id = {i}
                        cards = {cards}
                        held={held}
                        setHeld={setHeld}
                        selected={selected}
                        setSelected={setSelected}
                        amountSelected={amountSelected}
                        setAmountSelected={setAmountSelected}
                        >
                        </HeldCard>
                    </Col>
                ))}
                </Row>
        </Container>
    )
}

export default function Game() {
    const [cards, setCards] = useState([
        {value: 0, number: 0, suit: 0}, {value: 0, number: 0, suit: 0}, {value: 0, number: 0, suit: 0}
    ]);
    const [selected, setSelected] = useState([
        false, false, false, false, false, false,
        false, false, false, false, false, false, false
    ]);
    const [amountSelected, setAmountSelected] = useState(0); 
    const [held, setHeld] = useState([
        true, true, true, true, true, true,
        true, true, true, true, true, true, true
    ]);
    const [username, setUser] = useState(""); 
    const [playerNumber, setPlayerNumber] = useState(0); 
    const [currentPlayer, setCurrentPlayer] = useState(""); 

    useEffect(() => {
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i].value)
        }
    }, [cards]);

    socket.on("initializeUI", async (players, currentPlayer) => {
        console.log("being initialized?")
        let current_player_id = await getPlayerID();

        const current_player_object = players[current_player_id];
        console.log(current_player_object); 

        let newCards = [...current_player_object.playerCards];

        setCards(newCards);
        setUser(current_player_object.username);
        setPlayerNumber(current_player_object.playerNumber);
        setCurrentPlayer(currentPlayer); 
    }); 

    if (cards.length === 0) {
        return(<h1>undefined</h1>)
    } else {
    return(
        <div>
            <h1>{currentPlayer}'s turn to play</h1>
            <Row>
                <OtherPlayer requestedIndex={2} givenIndex={playerNumber}/>
            </Row>
            <Row>
                <OtherPlayer requestedIndex={1} givenIndex={playerNumber}/>
                <Deck/>
                <OtherPlayer requestedIndex={3} givenIndex={playerNumber}/>
            </Row>
            {(amountSelected > 0) && <Selection 
                cards={cards}
                held={held}
                setHeld={setHeld}
                selected={selected}
                setSelected={setSelected}
                amountSelected={amountSelected}
                setAmountSelected={setAmountSelected}
            />}
            <PlayerCards
                playerNumber={playerNumber}
                username={username}
                cards={cards}
                held={held}
                setHeld={setHeld}
                selected={selected}
                setSelected={setSelected}
                amountSelected={amountSelected}
                setAmountSelected={setAmountSelected}
            />
        </div>
    )
}
}