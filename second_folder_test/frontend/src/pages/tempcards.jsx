class PlayerCard {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

let cards = [];
let birds = ["pigeon", "duck", "seagull", "crow"];

let card_index = 1; 

for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
        let card = new PlayerCard(birds[j], i);
        cards.push(card); 
    
        card_index += 1;
    }
}

export default cards;