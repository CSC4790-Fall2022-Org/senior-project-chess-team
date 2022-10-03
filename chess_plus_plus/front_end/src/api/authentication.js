import serverURL from '../config/serverConfig'

export const fetchTokensFromCognito = async (code, codeVerifier) => {
    return await fetch(serverURL("/authenticate"), {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({
            code: code,
            verifier: codeVerifier,
        }),
    });
};



