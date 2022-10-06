import React , { useState, useEffect, useRef }from 'react'
import io from 'socket.io-client';
import serverURL from '../config/serverConfig';



export default function GamePage() {

    const socket = useRef(null)

    useEffect(() => {

        const newSocket = io(serverURL(), {
            path: '/game/socket.io'
        });

        socket.current = newSocket;

        newSocket.on('disconnect', () => {
            console.log('we disconnected for free');
        });


        return () => {
            newSocket.close();
        }
        }, [socket])


    return (
        <>
                <p>{socket.current && socket.current.connected ? 'yes' : 'noo'}</p>
                <button onClick={() => console.log(socket.current.connected)}>but</button>
                <button onClick={() => socket.current.close()}>but</button>

        </>
    )
}
