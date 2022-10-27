const game = require('../games/games')
// Return a tuple with second element indicating check-mate status
function handleMove(arg) {
    // TODO: add check for player color and if their turn
    arg = JSON.parse(arg)
    console.log(arg)
    move = arg.move
    board = arg.board
    game_id = arg.game_id
    console.log(move)
    console.log(board.board[0][0])

    let playerGame = game.getById(game_id)

    playerGame.makeMove(board.playerIsWhite, move)

    // Check for Checkmate
    if (playerGame.opponentInCheckMate(board.playerIsWhite)) {
        return board.playerIsWhite ? [playerGame, 'W'] : [playerGame, 'B']
    }

    return [playerGame, 'X']
}


exports.handleMove = handleMove