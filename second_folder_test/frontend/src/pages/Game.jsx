import OtherPlayer from "../components/OtherPlayer"
import Message from "../components/Message"
import { SelectedCard, HeldCard, DeckCard } from "../components/Card"

import { useState } from "react";

function CardTable() {
    
}

function Selection() {

}

function PlayerCards() {

}

export default function Game() {
    return(
        <div>
            <Row>
                <OtherPlayer requestedIndex={2} givenIndex={playerNumber}/>
            </Row>
            <Row>
                <OtherPlayer requestedIndex={1} givenIndex={playerNumber}/>
                <CardTable/>
                <OtherPlayer requestedIndex={3} givenIndex={playerNumber}/>
            </Row>
            {(selected > 0) && <Selection />}
            <PlayerCards />
        </div>
    )
}