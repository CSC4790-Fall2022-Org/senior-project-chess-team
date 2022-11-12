import x from '../chess/files/pieces/wR.png' 
import css from './card.css'

function Card({name, description, id, playCard}) {
    // determine image based on name
    return (
        <div class='card' onClick={() => playCard(id)}>
            <p>{name}</p>
            <img src={x} />
            <p>{description}</p>
        </div>
    )
}
export default Card