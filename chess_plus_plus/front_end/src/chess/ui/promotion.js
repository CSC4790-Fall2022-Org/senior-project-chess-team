import { Bishop, Knight, Pawn, Queen, Rook } from '../model/pieces/subpieces'
import  PromotionPiece  from './promotionPiece'
import './promotion.css'
export default function Promotion({selection, boardState}) {



    return(
        <div class="promotionContainer">
            <PromotionPiece piece={new Knight()} selection={selection}/>
            <PromotionPiece piece={new Bishop()} selection={selection}/>
            <PromotionPiece piece={new Rook()} selection={selection}/>
            <PromotionPiece piece={new Queen()} selection={selection}/>
        </div>
    )
}
