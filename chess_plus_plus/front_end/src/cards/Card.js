function Card({name, decsription}) {
    // determine image based on name
    return (
        <>
            <p>{name}</p>
            <p>{decsription}</p>
        </>
    )
}
export default Card