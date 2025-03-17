import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { DeckCard } from "../components/Card"

import socket from "../../socket.js";
import { useState, useEffect } from "react";

export default function Deck() {
    const [cards, setCards] = useState([]);
    const [deckIndices, setDeckIndices] = useState([]);

    socket.on("updateDeck", (newCards, newDeckIndices) => {
        console.log(`CARDS ${newCards}`)
        for (let i = 0; i < newCards.length; i++) {
            console.log(newCards[i].value)
        }
        let newCardArray = [...newCards];
        setCards(newCardArray); 
        let newDeckIndicesArray = [...newDeckIndices];
        setDeckIndices(newDeckIndicesArray)

        
    })

    useEffect(() => {
        console.log("cards has updated")
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i].value)
        }
        console.log("here")
    }, [cards]);

    useEffect(() => {
        for (let i = 0; i < deckIndices.length; i++) {
            console.log(deckIndices[i])
        }
    }, [deckIndices]);
    
    return(
        <Container className='deck_color m-3 p-3 rounded shadow w-50'>
            <Row className='justify-content-center align-items-center'>
                {cards.length > 0 && deckIndices.map((index, i) => (
            <Col key={i}>
                <DeckCard
                suit={cards[index].suit}
                number={cards[index].number}
                />
            </Col>
            ))}
            </Row>
        </Container>
    )
}