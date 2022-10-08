import React , { useState, useEffect, useRef }from 'react'
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import serverURL from '../config/serverConfig';
import {Game} from '../chess/ui/game.js'




export default function GamePage() {

    const socket = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState('');


    useEffect(() => {

        const newSocket = io(serverURL(), {
            path: '/game/socket.io',
            query: `gameId=${searchParams.get('id')}&idToken=${localStorage.getItem('id_token')}`
        });

        socket.current = newSocket;

        newSocket.on('clientColor', color => {
            console.log('color', color)
            setColor(color);
        })

        newSocket.on('disconnect', () => {
            console.log('we disconnected for free');
        });

        

        return () => {
            newSocket.close();
        }
        }, [socket, searchParams])


    return (
        <>
            {color !== '' ? <Game isWhite={(color === 'white')} /> : <p>Waiting for response...</p> }


        </>
    )
}
