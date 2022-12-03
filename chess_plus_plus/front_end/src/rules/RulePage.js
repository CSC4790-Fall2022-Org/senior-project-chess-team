import Banner from "../chess/ui/banner";

function RulePage({ setIsLoggedIn }) {    
    

    return (
        <>
        <Banner />
            Rules page!<br></br>
           <p1>Rules and Starting</p1><br></br>
            <ol>
                <li>1. The player with the white pieces moves first, and then the players take turns moving. One piece may be moved per turn, except for castling (explained later). <br></br></li>
                <br></br><li>2. Each piece has a different moveset:</li>
                <br></br><li><ul><li>Pawns: Illustrated as stick figures. The pawn moves in a straight line forward, but it captures pieces diagonally. It moves one square forward per turn, but on its first move it has the option of moving forward one or two squares. If the pawn reaches the other end of the board, it can be promoted to another piece, usually a Queen. It can be a Queen, Rook, Bishop, or a Knight.</li></ul></li>
                <br></br><li><ul><li>Queen: Identified by a Pearl necklace and crown. The Queen can move in a straight line in any direction: horizontal, vertical, and diagonal. The Queen can move as far as it wants as long as there aren’t pieces of its own color blocking it. </li></ul></li>
                <br></br><li><ul><li>Rook: The Rook, identified as a card, can move any number of squares in one direction – vertically or horizontally – if its path is not blocked. </li></ul></li>
                <br></br><li><ul><li>Bishop: A helicopter on the board, the Bishop can move any number of squares diagonally if its path is not blocked. Note that this Bishop starts on a light square and can reach only other light squares. At the beginning of the game, you have one ”dark-square” Bishop and one ”light-square” Bishop.</li></ul></li>
                <br></br><li><ul><li>Knight: The giraffe figure on the board, it hops directly from its old square to its new square. The Knight can jump over other pieces between its old and new squares. Think of the Knight’s move as an ”L.” It moves two squares horizontally or vertically and then makes a right-angle turn for one more square (“2 then 1”). The Knight always lands on a square opposite in color from its old square.</li></ul></li>
                <br></br><li><ul><li>King: The King is the most important piece, and identified by a crown. When it is trapped, the whole team loses. The King can move one square in any direction. An exception is castling, which is explained later. The King may never move into check - that is, onto a square attacked by an opponent’s piece.</li></ul></li>
                <br></br><li>3. Castling</li>
                <br></br><li><ul><li>Each player may castle only once during a game and only when certain conditions are met. Castling is a special move that lets a player move two pieces at once -the King and one Rook. In castling, the player moves his King two squares either to its left or right toward one of his Rooks. At the same time, the Rook involved goes to the square on the other side of the King. In order to castle, neither the King nor the Rook involved may have moved before. Also, the King may not castle out of check, into check, or through check. Further, there may not be pieces of either color between the King and the Rook involved in castling. </li></ul></li>
                <br></br><li>4. Check, Checkmate, and Stalemate</li>
                <br></br><li><ul><li>The main goal of chess is to checkmate your opponent’s King. The King is not actually captured and removed from the board like other pieces. But if the King is attacked, we say it is put in check and threatened with capture. It must get out of check immediately</li></ul></li>
                <br></br><li><ul><li>If there is no way to get out of check, the position is a checkmate and the side that is checkmated loses.</li></ul></li> 
                <br></br><li><ul><li>It is illegal for a king to move into check. If your King is in check, there are three ways of getting out of check: 1. Capturing the attacking piece; 2. Placing one of your own pieces between the attacker and your King (impossible if the attacker is a Knight); 3. Moving the King away from the attack. If a checked player can do none of these, he is checkmated and loses the game. </li></ul></li>
                <br></br><li><ul><li>If a King is not in check, and that player can make no legal move, the position is called a stalemate and the game is scored as a draw, or tie, with each player receiving a half point.</li></ul></li>
                <br></br><li>5. Randomization</li>
                <br></br><li><ul><li>Cards: Each player can assemble a hand of their own cards. Players receive cards throughout the game by reaching certain squares. These cards can come with several different power-ups that alter the strategy of the game.</li></ul></li>
                <br></br><li><ul><li>Card Types:</li></ul></li>
                <br></br><li><ul><li><ul><li>Frozen Cross - Freeze a random row and column of pieces on the board (including your own)</li></ul></li></ul></li>
                <br></br><li><ul><li><ul><li>Frozen Piece - Freeze a random enemy piece</li></ul></li></ul></li>
                <br></br><li><ul><li><ul><li>Switch Hands - Swap cards with your opponent</li></ul></li></ul></li>
                <br></br><li><ul><li><ul><li>Resurrection - Resurrect a random piece from your dead pieces</li></ul></li></ul></li>
                <br></br><li><ul><li><ul><li>Demotion - Demote a random enemy piece by one rank (ex: demote a rook to a bishop)</li></ul></li></ul></li>
            </ol>
        </>
    )
}

export default RulePage;