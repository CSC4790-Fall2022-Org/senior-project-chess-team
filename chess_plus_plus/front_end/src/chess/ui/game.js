import React from "react";
import { BoardState } from "../model/boardState.js";
import Square from "./square.js";
import "../ui/game.css";
import {
    Bishop,
    Knight,
    Pawn,
    Rook,
    Queen,
    King,
} from "../model/pieces/subpieces.js";
import Promotion from "./promotion.js";
import Effects from "./effects.js";
export class Game extends React.Component {
    constructor(props) {
        // console.log("constructor for game")
        super();

        this.state = {
            boardState: new BoardState(props.isWhite),
            promotionMove: null,
            specialSquares: {}
        };
        this.update = this.update.bind(this);
        this.sendMove = this.sendMove.bind(this);
        this.receievedMove = this.receievedMove.bind(this);
        this.sendPromotionMove = this.sendPromotionMove.bind(this);
        this.youWin = this.youWin.bind(this);
        this.youLose = this.youLose.bind(this);
    }

    update(board) {
        // console.log('update', board)
        this.setState({boardState: board, });
    }
    // *****
    sendMove(src_pos, dest_pos) {
        if (this.state.boardState.isPawnPromotion(src_pos, dest_pos)) {
            this.setState({
                promotionMove: { src_pos, dest_pos },
            });
            return;
        }
        this.props.ws.emit(
            "playerMove",
            JSON.stringify({
                game_id: this.props.id,
                move: {
                    src: src_pos,
                    dest: dest_pos,
                },
                board: this.state.boardState,
            })
        );
    }

    // TODO: put UI for loss and handling loss stuff here
    youLose(board) {
        this.receievedMove(board)
        // console.log("you lose")
        // window.alert("You lose");
        var ask = window.confirm("You lose, Ok to play again.");
        if (ask) {
            window.alert("Come on, now");
    
            window.location.href = "http://localhost:3000/";
        }
    }
    youWin(board) {
        this.receievedMove(board)
        // console.log("you lose")
        // window.alert("You lose");
        var ask = window.confirm("You win, Ok to play again.");
        if (ask) {
            window.alert("bye");
    
            window.location.href = "http://localhost:3000/";
        }
    }

    receievedMove(board) {
        console.log(board);
        let newBoard = new BoardState(this.props.isWhite);
        newBoard.blackKingInCheck = board.board.blackKingInCheck;
        newBoard.whiteKingInCheck = board.board.whiteKingInCheck;
        newBoard.isWhiteTurn = board.board.isWhiteTurn;
        newBoard.board = this.convertToPieces(board.board.board);
        newBoard.updateAllMoves();
        this.update(newBoard);
        let newSpecialSquares = {}
        newSpecialSquares[board.specialSquare] = Effects.SPECIAL_SQUARE
        this.setState({specialSquares: newSpecialSquares})
    }

    

    sendPromotionMove(pieceType) {
        console.log(pieceType);
        const move = this.state.promotionMove;
        this.setState({promotionMove: null})
        console.log(this.state)
        this.props.ws.emit(
            "promotion",
            JSON.stringify({
                game_id: this.props.id,
                move: {
                    src: move.src_pos,
                    dest: move.dest_pos,
                },
                board: this.state.boardState,
                promotionPiece: pieceType
            })
        );
    }
        
    componentDidMount() {
        console.log("game mount");
        this.props.ws.on("updateAfterMove", this.receievedMove);
        this.props.ws.on('win', this.youWin)
        this.props.ws.on('loss', this.youLose)
    }

    componentDidUpdate() {
        console.log("game updated");
    }
    componentWillUnmount() {
        //console.log("game will unmount");
        this.props.ws.removeListener("updateAfterMove");
        this.props.ws.removeListener("bob");
        this.props.ws.removeListener("win");
        this.props.ws.removeListener("lose");
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
                        board[i][j] = new Knight(board[i][j].isWhite, board[i][j]?.hasMoved)
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
        return board;
    }

    render() {
        let boardSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let squareProperty = null
                if (`${i},${j}` in this.state.specialSquares) {
                    squareProperty = this.state.specialSquares[`${i},${j}`]
                }
                boardSquares.push(
                    <Square
                        piece={this.state.boardState.board[i][j]}
                        pos={String(i) + "," + String(j)}
                        state={this.state}
                        sendMove={this.sendMove}
                        specialProperty={squareProperty}
                    ></Square>
                );
            }
        }
        return (
            <div class="game">
                {this.state.promotionMove !== null
                 && <Promotion selection={this.sendPromotionMove} boardState={this.state.boardState}/>}
                <div class="chessboard">{boardSquares}</div>
            </div>
        );
    }
}
