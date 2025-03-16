//for error modals
// winner modals
// and also start of game 
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';
import socket from "../../socket";

import { useState } from "react";

export default function Message() {
    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    socket.on("ERROR", (new_msg) => {
        setMsg(new_msg)
        setShow(true)
    })

    return(
        <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}