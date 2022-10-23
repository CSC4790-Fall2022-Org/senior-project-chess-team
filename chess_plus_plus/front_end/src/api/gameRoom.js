import serverURL from "../config/serverConfig"

export const createGameRoom = async () => {
    console.log('creating game room')
    const response = await fetch(serverURL('/game'), {
        method: 'POST',
        headers: new Headers({
            "content-type": "application/json",
            'Authorization': `Bearer ${userId}`,
        }),
    });

    return response;
}

export const joinGameRoom = async gameId => {
    const response = await(fetch(serverURL(`/game/${gameId}`)), {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${userId}`
        }),
    })
}

const userId = localStorage.getItem('id_token')