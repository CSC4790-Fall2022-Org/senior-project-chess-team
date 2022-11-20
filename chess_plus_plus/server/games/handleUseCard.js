const game = require('../games/games')

function handleUseCard(arg, userName) {
    const playerGame = game.getById(arg.gameId)
    const playerColor = playerGame.color(userName)
    
    if (playerGame.hasUsedCard(userName)) {
        return 'Only one card may be used per turn!'
    }

    if (playerColor === 'white' && !playerGame.whiteBoard.isWhiteTurn) {
        return 'It must be your turn to use a card!'
    }
    if (playerColor === 'black' && playerGame.whiteBoard.isWhiteTurn) {
        return 'It must be your turn to use a card!'
    }
    
    playerGame.playCard(playerColor, arg.cardId)
    console.log('after card is played')
    playerGame.updateMovesOnBoards()
    return playerGame
}

exports.handleUseCard = handleUseCard