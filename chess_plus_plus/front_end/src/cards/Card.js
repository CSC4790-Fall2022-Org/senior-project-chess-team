import x from '../chess/files/pieces/wR.png' 
import css from './card.css'

function Card({name, description, id, playCard}) {
    // determine image based on name
    return (
        <div>
            <div class='card' onClick={() => playCard(id)}>
                <p id='title'>{name}</p>    
                <p id='description'>{description}</p>
            </div>
        </div>

    )
}
export default Card