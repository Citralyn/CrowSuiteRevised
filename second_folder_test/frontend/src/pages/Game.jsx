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
import { getPlayerID, getGameID } from "../utilities/cookies.js"

import { useState, useEffect } from "react";


function Selection({cards, used, held, setHeld, selected, setSelected, 
    amountSelected, setAmountSelected}) {

    function playCards() {
        //socket.emit("get_rooms")
        socket.emit("attemptToPlay", selected)
    }

    function passTurn() {
        socket.emit("attemptToPass")
    }

    return(
        <Container>
                <Row>
                {Array.from({ length: selected.length }, (_, i) => (
                    <Col key={i} >
                        {!used[i] &&
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
                        </SelectedCard>}
                    </Col>
                ))}
                </Row>
                <Row>
                    <Col><Button onClick={playCards}>Play</Button></Col>
                    <Col><Button onClick={passTurn}>Pass</Button></Col>
                </Row>
        </Container>
    )

}

function PlayerCards({playerNumber, username, cards, used, held, setHeld, 
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
                        {!used[i] &&
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
                        </HeldCard>}
                    </Col>
                ))}
                </Row>
        </Container>
    )
}

export default function Game() {
    const [cards, setCards] = useState([ ]);
    const [selected, setSelected] = useState([
        false, false, false, false, false, false,
        false, false, false, false, false, false, false
    ]);
    const [amountSelected, setAmountSelected] = useState(0); 
    const [held, setHeld] = useState([
        true, true, true, true, true, true,
        true, true, true, true, true, true, true
    ]);
    const [used, setUsed] = useState([
        false, false, false, false, false, false,
        false, false, false, false, false, false, false
    ]);
    const [playerID, setPlayerID] = useState("undefined"); 
    const [gameID, setGameID] = useState("undefined"); 
    const [username, setUser] = useState(""); 
    const [playerNumber, setPlayerNumber] = useState(0); 
    const [currentPlayer, setCurrentPlayer] = useState(""); 


    useEffect(() => {
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i].value)
        }
        console.log("cards have updated")
        socket.emit("everything_else")
    }, [cards]);

    socket.on("confirmMove", () => {
        let new_used = [...used]; 
        let new_selected = [...selected]; 
        for (let i = 0; i < 13; i++) {
            if (selected[i]) {
                new_used[i] = true; 
                new_selected[i] = false; 
            }
        }

        setUsed(new_used);
        setSelected(new_selected);
        setAmountSelected(0);
    })

    socket.on("initializeUI", (players, currentPlayer, gameNumber) => {
        console.log("being initialized?")
        console.log(playerID);
        console.log(socket.id)
        const current_player_object = players[socket.id];
        console.log(current_player_object); 

        let newCards = [...current_player_object.playerCards];

        setGameID(gameNumber)
        setCards(newCards);
        setUser(current_player_object.username);
        setPlayerNumber(current_player_object.playerNumber);
        setCurrentPlayer(currentPlayer); 
    })

    

    if (cards.length === 0) {
        return(<h1>{socket.id}</h1>)
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
                used={used}
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
                used={used}
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