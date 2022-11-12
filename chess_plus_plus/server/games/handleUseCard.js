const game = require('../games/games')

function handleUseCard(arg, userName) {
    console.log(arg)
    const playerGame = game.getById(arg.gameId)
    const playerColor = playerGame.color(userName)
    playerGame.playCard(playerColor, arg.cardId)
    return playerGame
}

exports.handleUseCard = handleUseCard