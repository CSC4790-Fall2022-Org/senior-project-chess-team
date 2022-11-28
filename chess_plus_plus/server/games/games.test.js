// const games = require('./games');
// const { Rook, Pawn, King } = require('./pieces/subpieces');

// test('Generate random square sets a square for both players', () => { 
//     const game = new games.Game('1test', 'jest', 'jest2')
//     game.generateRandomSquare()
//     expect(game.whiteSpecialSquare).not.toBeNull()
//     expect(game.blackSpecialSquare).not.toBeNull()
//     expect(game.whiteSpecialSquare).not.toEqual(game.blackSpecialSquare)
// });

// test('Making a move changes the turn', () => {
//     const game = new games.Game('1test', 'jest', 'jest2')
//     const currentWhiteTurn = game.whiteBoard.isWhiteTurn
//     const currentBlackTurn = game.blackBoard.isWhiteTurn
//     game.makeMove(true, {src: '6,0', dest: '5,0'})
//     expect(game.whiteBoard.isWhiteTurn).not.toEqual(currentWhiteTurn)
//     expect(game.blackBoard.isWhiteTurn).not.toEqual(currentBlackTurn)
//     expect(game.whiteBoard.isWhiteTurn).toEqual(game.blackBoard.isWhiteTurn)
// });

// test('Promotion causing a checkmate is detected', () => {
//     const game = new games.Game('1test', 'jest', 'jest2')
//     let playerIsWhite = true
//     let pieceType = 'Rook' // Knight, Rook, Bishop, Queen
//     let move = {src: '1,1', dest: '0,1'}
//     game.whiteBoard.board = getWhiteBoardPromotionCausesCheckmate(playerIsWhite)
//     game.makeMove(playerIsWhite, move)
//     game.promotePawn(playerIsWhite, pieceType, move.dest)    

//     expect(game.opponentInCheckMate(playerIsWhite)).toBeTruthy()
// }); 

// test('Can detect if board in checkmate', () => {
//     const game = new games.Game('1test', 'jest', 'jest2')
//     let playerIsWhite = true
//     let pieceType = 'Rook' // Knight, Rook, Bishop, Queen
//     let move = {src: '1,1', dest: '0,1'}
//     game.whiteBoard.board = getWhiteBoardOneMoveAwayFromCheckmate(playerIsWhite)
//     game.makeMove(playerIsWhite, move)
//     game.promotePawn(playerIsWhite, pieceType, move.dest)    

//     expect(game.opponentInCheckMate(playerIsWhite)).toBeTruthy()
// })

// test('Player receieves a card upon moving to special square', () => {
//     const game = new games.Game('1test', 'jest', 'jest2')
//     let playerIsWhite = true
//     game.whiteSpecialSquare = '5,0' // pawn starts on 6,0 so this can me moved to w/ default board
//     expect(game.checkIfMoveToSpecialSquare(playerIsWhite, '5,0')).toBeTruthy()
//     game.makeMove(playerIsWhite, {src: '6,0', dest: '5,0'})
//     expect(game.whiteCards).toHaveLength(1)
// })

// test('Player card disappears from hand when used', () => {
//     const game = new games.Game('1test', 'jest', 'jest2')
//     let color = 'white'
//     game.whiteCards = [game.cardProvider.getCard()]
//     game.playCard(color, game.whiteCards[0].id)
//     expect(game.whiteCards).toHaveLength(0)
// })
// const getWhiteBoardOneMoveAwayFromCheckmate = (playerIsWhite) => {
//     var initBoard = [];
    
//     // Make board of squares
//     for (let i = 0; i < 8; i++) {
//         initBoard[i] = [];
//         for (let j = 0; j < 8; j++) {
//             initBoard[i][j] = null;
//         }
//     }

//     initBoard[1][1] = new Rook(playerIsWhite)
//     initBoard[1][0] = new Rook(playerIsWhite)

//     //Make Kings
//     var kingOpp = new King(!playerIsWhite);
//     var kingClose = new King(playerIsWhite);
//     initBoard[0][6] = kingOpp;
//     initBoard[7][4] = kingClose;

//     // Update possible moves for all pieces
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 8; j++) {
//             var piece = initBoard[i][j];
//             if (piece != null) {
//                 piece.updatePossibleMoves(i, j, initBoard, playerIsWhite);
//             }
//         }
//     }
//     return initBoard;
// }
// const getWhiteBoardPromotionCausesCheckmate = (playerIsWhite) => {
//     var initBoard = [];
    
//     // Make board of squares
//     for (let i = 0; i < 8; i++) {
//         initBoard[i] = [];
//         for (let j = 0; j < 8; j++) {
//             initBoard[i][j] = null;
//         }
//     }

//     initBoard[1][1] = new Pawn(playerIsWhite)
//     initBoard[1][0] = new Rook(playerIsWhite)

//     //Make Kings
//     var kingOpp = new King(!playerIsWhite);
//     var kingClose = new King(playerIsWhite);
//     initBoard[0][6] = kingOpp;
//     initBoard[7][4] = kingClose;

//     // Update possible moves for all pieces
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 8; j++) {
//             var piece = initBoard[i][j];
//             if (piece != null) {
//                 piece.updatePossibleMoves(i, j, initBoard, playerIsWhite);
//             }
//         }
//     }
//     return initBoard;
// }