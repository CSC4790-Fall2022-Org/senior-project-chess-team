import { useSearchParams } from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import {Game} from '../chess/ui/game.js'

function HomePage({setIsLoggedIn}) {

    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('id_token');
    }

    const createGame = async () => {
        const response = await createGameRoom();
        console.log(response)
        console.log('yo')
    }

    const joinGame = () => {

    }
    return (
        <>
        <h1>home </h1>
        <button onClick={pseudoLogout}> logout </button>
        <button onClick={createGame}>Create game</button>
        <button onClick={joinGame}>Join game</button>
        <Game isWhite={false}></Game>
        </>
    )
}

export default HomePage;