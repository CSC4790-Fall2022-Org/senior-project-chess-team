import { useState } from "react";
import './GamePageRules.css'

import checkExample from '../chess/files/checkExample.png'
import checkmateExample from '../chess/files/checkmateExample.png'
import pawnExample from '../chess/files/pawnMoves.png'
import bishopExampmle from '../chess/files/BishopMoves.png'
import kingExample from '../chess/files/KingMoves.png'
import knightExample from '../chess/files/KnightMoves.png'
import queenExample from '../chess/files/QueenMoves.png'
import rookExample from '../chess/files/RookMoves.png'
function GamePageRules() {
    const [tab, setTab] = useState(1);

    return (
        <div class="gamePageRules">
            <div class="tabs">
                <ul class="tabsBar">
                    <li class={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>General</li>
                    <li class={tab === 2 ? "active" : ""} onClick={() => setTab(2)}>Pieces</li>
                    <li class={tab === 3 ? "active" : ""} onClick={() => setTab(3)}>Cards</li>
                </ul>
            </div>
            <div class="rulesSection">
                {tab === 1 && <GeneralRules />}
                {tab === 2 && <PieceRules />}
                {tab === 3 && <CardRules />}
            </div>
        </div>
    )
}

const GeneralRules = () => {
    return (
        <div class='gameRules'>
            <p class='subheader'>Check</p>
            <div class='ruleExample'>
                <img class="checkExample" src={checkExample} alt='special square'/>
                <p  class="rule"> When a king is attacked. Black has 3 ways to exit check. You must make a move that removes your king from Check. You may not make a move that puts yourself in Check. </p>
            </div>
            <p class='subheader'>Checkmate</p>
            <div class='ruleExample'>
                <img class="checkExample" src={checkmateExample} alt='special square'/>
                <p  class="rule"> When a king is attacked and the player has no valid moves. White is in checkmate and loses the game.</p>
            </div>
        </div>
    )
}

const PieceRules = () => {
    return (
        <div class='gameRules'>
            <p class='subheader'>Pawn</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Pawn.png" />
                    <img class="pieceExample" src={pawnExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Pawn.png" />
                </div>
                <p  class="rule">A pawn may only capture other pieces diagonally. It may move one square forwards, and two if it has not moved yet. Pawns may not move through pieces.</p>
            </div>

            <p class='subheader'>Knight</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://upload.wikimedia.org/wikipedia/commons/0/09/Chess_Glt45.svg" />
                    <img class="pieceExample" src={knightExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://upload.wikimedia.org/wikipedia/commons/9/97/Chess_Gdt45.svg" />
                </div>
                <p  class="rule">The Knight moves in an L shape and can jump over other pieces. A piece can not move to block a knight from attacking the king.</p>
            </div>

            <p class='subheader'>Bishop</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Bishop%20new.png" />
                    <img class="pieceExample" src={bishopExampmle} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Bishop%20new.png" />
                </div>
                <p  class="rule">The Bishop moves diagonally as many squares as it wishes unless it encounters another piece.</p>
            </div>

            <p class='subheader'>Rook</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Rook.png" />
                    <img class="pieceExample" src={rookExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Rook.png" />
                </div>
                <p  class="rule">The Rook moves as many squares as it wishes in a straight line, horizontally or vertically, unless it encounters another piece. Used for castling (see King). </p>
            </div>

            <p class='subheader'>Queen</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src= "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Queen.png" />
                    <img class="pieceExample" src={queenExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Queen.png" />
                </div>
                <p  class="rule">The Queen is the most powerful piece. The Queen can move in a straight line in any direction: horizontal, vertical, and diagonal. Can move as many squares as she would like unless she encounters another piece.  </p>
            </div>

            <p class='subheader'>King</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20King.png" />
                    <img class="pieceExample" src={kingExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20King.png" />
                </div>
                <p  class="rule">The King is the most important piece. It can move 1 square in any direction. The King may not put itself into Check (see General section). If the King has not yet moved and a Rook has not yet moved, it may "Castle" with the Rook by moving two squares and placing the Rook on its other side (see Rules section for more info). </p>
            </div>
            
        </div>
    )
}

const CardRules = () => {
    return (
        <p style={{textAlign: 'center'}}>Cards</p>
    )
}
export default GamePageRules;