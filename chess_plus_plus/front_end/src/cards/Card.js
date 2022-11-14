import x from '../chess/files/pieces/wR.png' 
import css from './card.css'

function Card({name, description, id, playCard}) {
    // determine image based on name
    return (
        <div class='card' onClick={() => playCard(id)}>
            <p id='title'>{name}</p>
            <img src={x} id='cardImage'/>
            <p id='description'>{description}</p>
        </div>
    )
}
export default Card