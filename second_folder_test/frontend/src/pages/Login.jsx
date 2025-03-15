import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import socket from "../../socket.js";

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
        <Form className='text-center' onSubmit={handleSubmit}>
          <Container className='w-50'>
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
          </Container>
        </Form>
    )
}