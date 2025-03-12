import socket from "../../socket.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from "react-bootstrap/Button"

export default function HomePage() {
    useEffect(() => {
        socket.on("connect", () => {
            console.log(`${socket.id} has connected`);
          });
    }, [])

    async function getGameState() {
      try {
        const response = await fetch("http://localhost:3003/get_game_state", {
          credentials: "include"
        });

        if (response.ok) {
          const data = await response.text(); 
          console.log(`State is {data}`); 
          return data; 
        }

      } catch(error) {
        console.log(error.message); 
      }
    }

    const navigateTo = useNavigate();

    function goToTutorial() {
      navigateTo('/tutorial');
    }

    function playGame() {
      let state = getGameState(); 
      if (state == "new") {
        navigateTo('/login');
      } else if (state == "waiting") {
        navigateTo('/waiting');
      } else {
        navigateTo('/game');
      }
    }

    return(
        <div>
          <h1>CROWSUITE</h1>
          <Button onClick={playGame}>Play</Button>
          <Button onClick={goToTutorial}>How 2 Play</Button>
        </div>
    )
}