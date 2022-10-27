import React from 'react'
import {BoardState} from '../model/boardState.js'
import Square from './square.js'
import '../ui/game.css'
import { Bishop, Knight, Pawn, Rook, Queen, King } from '../model/pieces/subpieces.js'

export class Game extends React.Component {

    constructor(props) {
        console.log("constructor for game")
        super();
        
        this.state = {
            boardState: new BoardState(props.isWhite)
        }
        this.update = this.update.bind(this);
        this.sendMove = this.sendMove.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.receievedMove = this.receievedMove.bind(this);
        this.youWin = this.youWin.bind(this);
        this.youLose = this.youLose.bind(this);
    }

    update(board) {
        console.log('update', board)
        this.setState({boardState: board, });
    }

    sendMove(src_pos, dest_pos) {
        console.log('made move')
        this.props.ws.emit('playerMove', JSON.stringify({
            game_id: this.props.id, 
            move: {
                    src: src_pos,
                    dest: dest_pos,
                  },
            board: this.state.boardState
        }))
    }

    makeMove(move) {
        console.log("moveing")
        console.log(this.state.boardState)
        this.state.boardState.movePiece(move.src, move.dest);
        console.log("move?")

        console.log('supposed to send move', this.props.ws)
            console.log(this.state.boardState.board)
            this.update(this.state.boardState);
    }

    // TODO: put UI for win and handling win stuff here
    youWin(board) {
        this.receievedMove(board)
        console.log("you win")
    }

    // TODO: put UI for loss and handling loss stuff here
    youLose(board) {
        this.receievedMove(board)
        console.log("you lose")
    }

    receievedMove(board) {
        console.log(board.board)
        let newBoard = new BoardState(this.props.isWhite)
        newBoard.blackKingInCheck = board.board.blackKingInCheck
        newBoard.whiteKingInCheck = board.board.whiteKingInCheck
        newBoard.board = this.convertToPieces(board.board.board)
        console.log('before', newBoard)
        newBoard.updateAllMoves();
        console.log('after')
        this.update(newBoard);
    }
    componentDidMount() {
        console.log('game mount')
        this.props.ws.on('updateAfterMove', this.receievedMove)
        this.props.ws.on('bob', console.log('bob rec'))
        this.props.ws.on('win', this.youWin)
        this.props.ws.on('loss', this.youLose)
    }

    componentDidUpdate() {
        console.log('game updated')
    }
    componentWillUnmount() {
        console.log('game will unmount')
        this.props.ws.removeListener("updateAfterMove")
        this.props.ws.removeListener('bob')
    }


    convertToPieces(board) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                switch(board[i][j]?.type) {
                    case 'Pawn':
                        board[i][j] = new Pawn(board[i][j].isWhite, board[i][j]?.hasMoved)
                        break;
                    case 'Rook':
                        board[i][j] = new Rook(board[i][j].isWhite, board[i][j]?.hasMoved)
                        break
                    case 'Knight':
                        board[i][j] = new Knight(board[i][j].isWhite, board[i][j]?.hasMovedd)
                        break
                    case 'Bishop':
                        board[i][j] = new Bishop(board[i][j].isWhite, board[i][j]?.hasMoved)
                        break
                    case 'Queen':
                        board[i][j] = new Queen(board[i][j].isWhite, board[i][j]?.hasMoved)
                        break
                    case 'King':
                        board[i][j] = new King(board[i][j].isWhite, board[i][j]?.hasMoved)
                        break
                    default:
                        break
                }
            }
        }
        return board
    }

    
    render() {
        let boardSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                boardSquares.push(<Square piece={this.state.boardState.board[i][j]} 
                    pos={String(i) + ',' + String(j)} 
                    state={this.state}
                    updateGame={this.update}
                    sendMove={this.sendMove}></Square>
                    );
            }
        }
        return (
            // Put all the pieces in here...
            <div class='chessboard'>
                {boardSquares}
            </div>
        )
    }
}