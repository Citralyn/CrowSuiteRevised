import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"

import socket from "../../socket.js";

import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
    const [username, setUsername] = useState("");
    const navigateTo = useNavigate();

    socket.on("switchToWaiting", () => {
      navigateTo("/waiting")
    })

    function handleSubmit(event) {
        event.preventDefault();
        socket.emit("playerJoined", username); 
    }

    return(
    <div className="cool_color d-flex justify-content-center align-items-center vh-100 bg-light">
      <Container style={{ maxWidth: '400px' }} className="p-4 rounded shadow bg-white">
        <Form onSubmit={handleSubmit} className="text-center">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
    )
}