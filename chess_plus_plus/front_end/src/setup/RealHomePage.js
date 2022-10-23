import { useSearchParams } from "react-router-dom";
import {useState} from 'react';
import {Game} from '../chess/ui/game.js'
import Banner from '../chess/ui/banner.js'

function RealHomePage({setIsLoggedIn}) {

    return (
        <>
        <Banner setIsLoggedIn={setIsLoggedIn}></Banner>
        <button class="startButton">Start Game</button>
        </>
    )
}

export default RealHomePage;