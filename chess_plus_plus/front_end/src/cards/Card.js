function Card({name, description, id, playCard}) {
    // determine image based on name
    return (
        <div onClick={() => playCard(id)}>
            <p>{id} {name} {description}</p>
            <p>{description}</p>
        </div>
    )
}
export default Card