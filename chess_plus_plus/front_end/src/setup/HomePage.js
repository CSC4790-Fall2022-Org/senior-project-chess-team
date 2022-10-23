import { useSearchParams } from "react-router-dom";
import {useState} from 'react';
import {Game} from '../chess/ui/game.js'
import Banner from '../chess/ui/banner.js'

function HomePage({setIsLoggedIn}) {

    return (
        <>
        <Banner setIsLoggedIn={setIsLoggedIn}></Banner>
        <button class="startButton">Start Game</button>
        <Game isWhite={false}></Game>
        </>
    )
}

export default HomePage;