import Card from "./Card";

function Hand({cards, ws, id}) {
    console.log('hand rendered')
    return (
        <div id='hand'>
            {cards.map(item => <Card name={item.name} description={item.description} />)}
        </div>
    )
}

export default Hand;