import { useSearchParams } from "react-router-dom";
import {Game} from '../chess/ui/game.js'

function HomePage({setIsLoggedIn}) {

    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('oauth');
    }
    return (
        <>
        <h1>home </h1>
        <button onClick={pseudoLogout}> logout </button>
        <Game isWhite={false}></Game>
        </>
    )
}

export default HomePage;