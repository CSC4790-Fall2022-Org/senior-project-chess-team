const game = require('../games/games')

function handlePromotionMove(arg) {

    arg = JSON.parse(arg)

    console.log(arg.move, arg.promotionPiece)

    let playerGame = game.getById(arg.game_id)

    playerGame.makeMove(arg.board.playerIsWhite, arg.move)
    playerGame.promotePawn(arg.board.playerIsWhite, arg.promotionPiece, arg.move.dest)

    return playerGame
}

exports.handlePromotionMove = handlePromotionMove