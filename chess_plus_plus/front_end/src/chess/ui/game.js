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
        console.log(board.board);
        let newBoard = new BoardState(this.props.isWhite);
        newBoard.blackKingInCheck = board.board.blackKingInCheck;
        newBoard.whiteKingInCheck = board.board.whiteKingInCheck;
        newBoard.isWhiteTurn = board.board.isWhiteTurn;
        newBoard.board = this.convertToPieces(board.board.board);
        console.log("before", newBoard);
        newBoard.updateAllMoves();
        console.log("after");
        this.update(newBoard);
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
                boardSquares.push(
                    <Square
                        piece={this.state.boardState.board[i][j]}
                        pos={String(i) + "," + String(j)}
                        state={this.state}
                        sendMove={this.sendMove}
                        specialProperty={Effects.SPECIAL_SQUARE}
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
