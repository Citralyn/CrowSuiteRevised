import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import socket from "../../socket.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image"

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { setGameState } from '../utilities/cookies.js';

export default function Login() {
    const [username, setUsername] = useState("");
    const navigateTo = useNavigate();

    socket.on("switchToWaiting", () => {
      navigateTo("/waiting")
    })

    function handleSubmit(event) {
        event.preventDefault();
        socket.emit("playerJoined", username); 
        setGameState("waiting")
        
    }

    return(
      <div className="cool_color">
      <div style={{height: "20vh"}}></div>
      <Container className='w-50 other_color rounded shadow bg-transparent'>
        
        <Row className='justify-content-center align-items-center'>
        <Col/>
        <Col className='bg-light'>
        <Image style={{width: "16vw"}} src="crow_king.png"/>
        </Col>
        <Col>
        <Form className='text-center' onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              onChange={(e) => setUsername(e.target.value)} 
              className='text-center' 
              type="username" 
              placeholder="John Smith" 
              />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Col>
        <Col/>
        </Row>
      </Container>
      <div style={{height: "20vh"}}></div>
      </div>
    )
}