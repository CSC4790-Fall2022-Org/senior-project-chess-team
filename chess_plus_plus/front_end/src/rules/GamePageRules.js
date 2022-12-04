import { useState } from "react";
import './GamePageRules.css'

import checkExample from '../chess/files/checkExample.png'
import checkmateExample from '../chess/files/checkmateExample.png'
import pawnExample from '../chess/files/pawnMoves.png'
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
                    <img class="pieceExample" src={pawnExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://upload.wikimedia.org/wikipedia/commons/9/97/Chess_Gdt45.svg" />
                </div>
                <p  class="rule">A pawn may only capture other pieces diagonally. It may move one square forwards, and two if it has not moved yet. Pawns may not move through pieces.</p>
            </div>

            <p class='subheader'>Bishop</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Bishop%20new.png" />
                    <img class="pieceExample" src={pawnExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Bishop%20new.png" />
                </div>
                <p  class="rule">A pawn may only capture other pieces diagonally. It may move one square forwards, and two if it has not moved yet. Pawns may not move through pieces.</p>
            </div>

            <p class='subheader'>Rook</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Rook.png" />
                    <img class="pieceExample" src={pawnExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Rook.png" />
                </div>
                <p  class="rule">A pawn may only capture other pieces diagonally. It may move one square forwards, and two if it has not moved yet. Pawns may not move through pieces.</p>
            </div>

            <p class='subheader'>Queen</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src= "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Queen.png" />
                    <img class="pieceExample" src={pawnExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Queen.png" />
                </div>
                <p  class="rule">A pawn may only capture other pieces diagonally. It may move one square forwards, and two if it has not moved yet. Pawns may not move through pieces.</p>
            </div>

            <p class='subheader'>King</p>
            <div class='ruleExample'>
                <div class='imageRow'>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20King.png" />
                    <img class="pieceExample" src={pawnExample} alt='special square'/>
                    <img class='pieceDisplay' src="https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20King.png" />
                </div>
                <p  class="rule">A pawn may only capture other pieces diagonally. It may move one square forwards, and two if it has not moved yet. Pawns may not move through pieces.</p>
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