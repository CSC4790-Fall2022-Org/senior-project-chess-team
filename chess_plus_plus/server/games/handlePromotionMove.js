const game = require('../games/games')

function handlePromotionMove(arg) {

    arg = JSON.parse(arg)

    console.log(arg.move, arg.promotionPiece)

    let playerGame = game.getById(arg.game_id)

    playerGame.makeMove(arg.board.playerIsWhite, arg.move)
    playerGame.promotePawn(arg.board.playerIsWhite, arg.promotionPiece, arg.move.dest)

    console.log('in promotion printing moves')
    console.log(playerGame.whiteBoard.board)
    console.log(playerGame.blackBoard.board)
    if (playerGame.opponentInCheckMate(arg.board.playerIsWhite)) {
        return arg.board.playerIsWhite ? [playerGame, 'W'] : [playerGame, 'B']
    }

    return [playerGame, 'X']
}

exports.handlePromotionMove = handlePromotionMove