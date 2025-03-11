import socket from "../../socket.js";
import { useEffect } from "react";
import Button from "react-bootstrap/Button"

export default function HomePage() {
    useEffect(() => {
        socket.on("connect", () => {
            //
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
          });
    }, [])

    async function getUsername() {
        try {
          const response = await fetch("http://localhost:3003/get_user", {
            credentials: "include"
          });
          if (response.ok) {
            const data = await response.text(); 
            console.log(data); 
            
          }
        } catch(error) {
          console.log(error.message); 
        }
    }

    return(
        <div>
        <Button>meow</Button>
        <Button onClick={getUsername}>this will get cookie - if it exists</Button>
        </div>
    )
}