const games = require('./games')

test('Generate random square sets a square for both players', () => { 
    const game = new games.Game('1test', 'jest', 'jest2')
    game.generateRandomSquare()
    expect(game.whiteSpecialSquare).not.toBeNull()
    expect(game.blackSpecialSquare).not.toBeNull()
    expect(game.whiteSpecialSquare).not.toEqual(game.blackSpecialSquare)
});

test('Flip turns changes both board states active turns', () => {
    const game = new games.Game('1test', 'jest', 'jest2')
    const currentWhiteTurn = game.whiteBoard.isWhiteTurn
    const currentBlackTurn = game.blackBoard.isWhiteTurn
    game.flipTurns()
    expect(game.whiteBoard.isWhiteTurn).not.toEqual(currentWhiteTurn)
    expect(game.blackBoard.isWhiteTurn).not.toEqual(currentBlackTurn)
    expect(game.whiteBoard.isWhiteTurn).toEqual(game.blackBoard.isWhiteTurn)
})