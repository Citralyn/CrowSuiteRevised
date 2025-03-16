import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState, useEffect } from "react"

function Card({suit, number}) {
    return(
        <Container 
        style={{width: "5vw", height: "8vw"}} 
        className="bg-light shadow rounded"
        >
            <Col className="d-flex flex-column align-items-center">
                <Row className="justify-content-center">{number}</Row>
                <Row className="justify-content-center">of</Row>
                <Row className="justify-content-center">{suit}</Row>
            </Col>
        </Container>
    )
}

function DeckCard({suit, number}) {
    return(
        <Container 
        style={{width: "7vw", height: "10vw"}} 
        className="bg-light shadow rounded"
        >
            <Col className="d-flex flex-column align-items-center">
                <Row className="justify-content-center">{number}</Row>
                <Row className="justify-content-center">of</Row>
                <Row className="justify-content-center">{suit}</Row>
            </Col>
        </Container>
    )
}

function HeldCard({id, cards, held, setHeld, 
    selected, setSelected, amountSelected, setAmountSelected}) {
    const [suit, setSuit] = useState("pigeon");
    const [number, setNumber] = useState(0);


    function changeToSelected() {
        let currentHeld = held;
        let currentSelected = selected;
        let currentAmountSelected = amountSelected;
        currentHeld[id] = false;
        currentSelected[id] = true;
        currentAmountSelected += 1;
        setHeld(currentHeld);
        setSelected(currentSelected);
        setAmountSelected(currentAmountSelected);
    }

    useEffect(() => {
        if (cards.length > 0) {
            setSuit(cards[id].suit)
            setNumber(cards[id].number)
        } 
    }, [cards])


    return(         
        <div onClick={changeToSelected}>
            {held[id] && <Card suit={suit} number={number}/>}
        </div>
    )
}

function SelectedCard({id, cards, held, 
    setHeld, selected, setSelected, amountSelected, setAmountSelected}) {
    function changeToHeld() {
        let currentHeld = held;
        let currentSelected = selected;
        let currentAmountSelected = amountSelected;
        currentHeld[id] = true;
        currentSelected[id] = false;
        currentAmountSelected -= 1;
        setHeld(currentHeld);
        setSelected(currentSelected);
        setAmountSelected(currentAmountSelected);
    }

    let suit = cards[id].suit;
    let number = cards[id].number;

    return(
        <div onClick={changeToHeld}>
            {selected[id] && <Card suit={suit} number={number}/>}
        </div>
    )
}

export { DeckCard, HeldCard, SelectedCard }