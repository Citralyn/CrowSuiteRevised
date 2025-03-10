import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

import { useState, useEffect } from 'react';

export default function Login() {
    const [username, setUsername] = useState("");

    useEffect(() => {
      getUsername(); 
    }, [username])

    async function getUsername() {
        try {
          const response = await fetch("http://localhost:3003/get_user", {
            credentials: "include"
          });
          if (response.ok) {
            const data = await response.text(); 
            console.log(data); 
            setUsername(data); 
            
          }
        } catch(error) {
          console.log(error.message); 
        }
    }

    async function setUSCookie(us) {
      try {
        const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: us}),
      })

      if (response.ok) {
        const data = await response.text();  
        console.log(data); 
      }


    } catch (error) {
      console.log(error.message); 
    }

    }

    function handleSubmit(event) {
        event.preventDefault();
        setUSCookie(username); 
    }
    return(
        // stuff with cookies 
        // we'll get logic done, then front-end 
        /*
        lol i think just this
          app.get('/', (req, res) => {
      res.cookie('username', 'JohnDoe', { maxAge: 3600000 }); // Expires in 1 hour
      res.send('Cookie set!');
    });
    */

    <Form as="form" className='text-center' onSubmit={handleSubmit}>
    <Container className='w-50'>
    <Form.Group className="mb-3" controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control onChange={(e) => setUsername(e.target.value)} className='text-center' type="username" placeholder="John Smith" />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
    </Container>
  </Form>
    )
}