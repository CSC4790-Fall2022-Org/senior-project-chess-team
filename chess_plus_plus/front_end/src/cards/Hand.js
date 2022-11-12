import Card from "./Card";
import css from './card.css'

function Hand({cards, ws, id}) {
    console.log('hand rendered')

    function playCard(cardId) {
        console.log('use card with id', cardId);
    }
    return (
        <div class='hand'>
            {cards.map(item => <Card name={item.name} description={item.description} id={item.id} playCard={playCard}/>)}
        </div>
    )
}

export default Hand;