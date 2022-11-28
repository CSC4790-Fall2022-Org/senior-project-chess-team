const {handleUseCard} = require('./handleUseCard.js')
const games = require('../games/games')
const cards = require('../randomness/effects/cards')
const { handleMove } = require('./handleMove.js')
const { Rook, King } = require('./pieces/subpieces');


test("Frozen cards do not prevent King from moving", () => {
    let userId = 'JestTest'
    let gameId = games.create(userId).game_id
    const game = games.getById(gameId)
    if (game.whiteUserId === null) {
        game.whiteUserId = game.blackUserId;
        game.blackUserId = null
    }
    game.whiteBoard.board = getBoardWithFrozenPieceAndKingCanMove(true)
    game.whiteCards = [cards.cards[0]]
    game.whiteCards[0].id = 1 // freeze card
    handleUseCard({gameId: gameId, cardId: 1}, userId)
    let move = {src: '6,1', dest: '7,1'}
    let board = game.whiteBoard
    let res = handleMove(JSON.stringify({move: move, board: board, game_id: gameId}))
    expect(res).not.toBeNull()
})

const getBoardWithFrozenPieceAndKingCanMove = playerIsWhite => {
    var initBoard = [];
    
    // Make board of squares
    for (let i = 0; i < 8; i++) {
        initBoard[i] = [];
        for (let j = 0; j < 8; j++) {
            initBoard[i][j] = null;
        }
    }

    initBoard[7][0] = new Rook(!playerIsWhite)

    //Make Kings
    var kingOpp = new King(!playerIsWhite);
    var kingClose = new King(playerIsWhite);
    initBoard[0][6] = kingOpp;
    initBoard[6][1] = kingClose;

    // Update possible moves for all pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var piece = initBoard[i][j];
            if (piece != null) {
                piece.updatePossibleMoves(i, j, initBoard, playerIsWhite);
            }
        }
    }
    return initBoard;
}
