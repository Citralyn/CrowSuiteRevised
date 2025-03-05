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

    return(
        <Button>meow</Button>
    )
}