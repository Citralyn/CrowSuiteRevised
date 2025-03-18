//for error modals
// winner modals
// and also start of game 
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';
import socket from "../../socket";

import { useState } from "react";

export default function Message() {
    const [msg, setMsg] = useState("")
    const [title, setTitle] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    socket.on("ERROR", (new_msg) => {
        setMsg(new_msg)
        setTitle("INCORRECT MOVE")
        setShow(true)
    })

    socket.on("ALERT", (new_msg) => {
      setMsg(new_msg)
      setTitle("ALERT")
      setShow(true)
  })

    return(
        <div>
      <Modal className="text-center" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
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