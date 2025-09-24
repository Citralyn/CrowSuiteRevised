import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState, useEffect } from "react"

function Card({suit, number}) {

        function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const isMobile = useIsMobile();


    return(
        <Container 
        style={{width: isMobile ? "15vw" : "8vw", height: isMobile ? "25vw" : "12vw"}} 
        className="card_txt d-flex bg-light shadow rounded m-1 justify-content-center align-items-center"
        >
            <Col className="d-flex flex-column align-items-center">
                <Row className="card_txt justify-content-center">{number}</Row>
                <Row className="card_txt justify-content-center">of</Row>
                <Row className="card_txt justify-content-center">{suit}</Row>
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
        <>
        {held[id] &&
        <div onClick={changeToSelected}>
            <Card suit={suit} number={number}/>
        </div>
        }
        </>   
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