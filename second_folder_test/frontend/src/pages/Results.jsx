import Button from "react-bootstrap/Button"
import socket from "../../socket";

import { useState } from "react";

export default function Results() {
    const [winner, setWinner] = useState(""); 

    socket.on("results", (the_winner) => {
        setWinner(the_winner); 
    })
    return(
        <div>
            <h1>{winner}</h1>
        </div>
    )
}