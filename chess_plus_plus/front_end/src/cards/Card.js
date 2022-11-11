function Card({name, description, id, useCard}) {
    // determine image based on name
    return (
        <div>
            <p>{id} {name} {description}</p>
            <p>{description}</p>
        </div>
    )
}
export default Card