import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"

export function Card({selected, setSelected, suit, value}) {
    
    function handleClick() {
        let newselected = selected + 1;
        setSelected(newselected);
        console.log(newselected)
    }

    return(
        <div onClick={() => {handleClick()}}>
        <Container style={{width: "5vw", height: "8vw"}} className="bg-light shadow rounded">
            <Col className="d-flex flex-column align-items-center">
            <Row className="justify-content-center">{suit}</Row>
            <Row className="justify-content-center">{value}</Row>
            </Col>
        </Container>
        </div>
    )
}

export function DeckCard({selected, setSelected, suit, value}) {
    
    function handleClick() {
        let newselected = selected + 1;
        setSelected(newselected);
        console.log(newselected)
    }

    return(
        <div onClick={() => {handleClick()}}>
        <Container style={{width: "10vw", height: "16vw"}} className="bg-light shadow rounded">
            <Col className="d-flex flex-column align-items-center">
            <Row className="justify-content-center">{suit}</Row>
            <Row className="justify-content-center">{value}</Row>
            </Col>
        </Container>
        </div>
    )
}

export function GlowCard({selected, setSelected, suit, value}) {
    
    function handleClick() {
        let newselected = selected + 1;
        setSelected(newselected);
        console.log(newselected)
    }

    return(
        <div onClick={() => {handleClick()}}>
        <Container style={{width: "5vw", height: "8vw"}} className="bg-light shadow rounded">
            <Col className="d-flex flex-column align-items-center">
            <Row className="justify-content-center">{suit}</Row>
            <Row className="justify-content-center">{value}</Row>
            </Col>
        </Container>
        </div>
    )
}