import React , { useState, useEffect }from 'react'
import io from 'socket.io-client';
import serverURL from '../config/serverConfig';


const socket = io(serverURL());
export default function GamePage() {
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
          });
      
          socket.on('disconnect', () => {
            setIsConnected(false);
          });
      
          return () => {
            socket.off('connect');
            socket.off('disconnect');
          };
        }, []);

      console.log(socket?.connected)

    return (
        <>
                <p>{isConnected ? 'yes' : 'no'}</p>
        </>
    )
}
