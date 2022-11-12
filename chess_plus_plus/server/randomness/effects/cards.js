const { Rook, Pawn } = require('../../games/pieces/subpieces.js');
const {Card} = require('./card.js')


class ExampleCard extends Card {
    constructor() {
        super('Example Card', 1);
        this.description = 'Spawns a pawn in the middle of the board'
    }

    action(boardState) {
        // manipulate the boardstate in some way. 
        console.log('Action was called')
        boardState.board[4][4] = new Pawn(boardState.playerIsWhite, false)

    }
}


class ExampleCard2 extends Card {
    constructor() {
        super('Example Card2', 2);
        this.description = 'Spawns a friendly rook in the middle of the board'
    }

    action(boardState) {
        console.log('Action was called')
        boardState.board[3][3] = new Rook(boardState.playerIsWhite, false)

        // manipulate the boardstate in some way. 
    }
}
// instantiate one of each card in the array.
let cards = [
    new ExampleCard(),
    new ExampleCard2()
]
exports.cards = cards