import socket from "../../socket.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { getGameState, getGameID } from "../utilities/cookies.js"

import Button from "react-bootstrap/Button"

export default function HomePage() {
  const navigateTo = useNavigate();

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`${socket.id} has connected`);
          });
    }, [])

    function goToTutorial() {
      navigateTo('/tutorial');
    }

    async function playGame() {
      let state = await getGameState(); 

      if (state != "new") {
        let current_game_id = await getGameID(); 
        console.log(current_game_id)
        socket.emit("connectToPrevious", current_game_id); 

        if (state == "waiting") {
          navigateTo('/waiting');
        } else {
          navigateTo('/game');
        }

      } else {
        navigateTo('/login');
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