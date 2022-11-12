const {Card} = require('./card.js')


class ExampleCard extends Card {
    constructor() {
        super('Example Card', 1);
        this.description = 'This is simply an example of how to add a card'
    }

    action(boardState) {
        // manipulate the boardstate in some way. 
        console.log('Action was called')

    }
}


class ExampleCard2 extends Card {
    constructor() {
        super('Example Card2', 2);
        this.description = 'This is simply an example of how to add another card'
    }

    action(boardState) {
        console.log('Action was called')
        // manipulate the boardstate in some way. 
    }
}
// instantiate one of each card in the array.
let cards = [
    new ExampleCard(),
    new ExampleCard2()
]
exports.cards = cards