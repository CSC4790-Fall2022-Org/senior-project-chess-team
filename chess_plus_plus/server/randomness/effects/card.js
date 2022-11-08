class Card {
    constructor(name, frequency) {
        this.name = name
        this.description = ''
        this.frequency = frequency
    }

    action(boardState) {
        // template for subclass
    } 
}

exports.Card = Card