import Card from "./Card";
import css from './card.css'

function Hand({cards, ws, id, gameId}) {
    console.log('hand rendered')

    function CardDAO(playerId, cardId) {
        return {playerId: playerId, cardId: cardId, gameId: gameId}
    }
    function playCard(cardId) {
        console.log('use card with id', cardId);
        ws.emit('useCard', CardDAO(id, cardId))
    }
    return (
        <div class='hand'>
            {cards.map(item => <Card name={item.name} description={item.description} id={item.id} playCard={playCard}/>)}
        </div>
    )
}

export default Hand;