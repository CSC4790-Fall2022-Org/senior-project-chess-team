import Card from "./Card";

function Hand({cards, ws, id}) {
    console.log('hand rendered')
    let cardId = 0

    function useCard(cardId) {
        console.log('use card with id', cardId);
    }
    return (
        <div id='hand'>
            {cards.map(item => <Card name={item.name} description={item.description} id={cardId++} useCard={useCard}/>)}
        </div>
    )
}

export default Hand;