import { useEffect } from "react";
import serverURL from '../config/serverConfig';
import Base64Url from 'crypto-js/enc-base64url';
import CryptoJS from "crypto-js";
import { useSearchParams } from 'react-router-dom';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const USER_POOL_ID = 'fakeIdstringUntilWeAddDotEnv'

function SignInPage({setIsLoggedIn}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const SHA256 = require('crypto-js/sha256');
    const clientId = '39i33g2381dako8dicf0nd5hdl'; // lets extract these to config files

    const verifier = CognitoJwtVerifier.create({
        userPoolId: `${USER_POOL_ID}`,
        tokenUse: 'access',
        clientId: `${clientId}`,
    });

    const cognitoDomainName = 'https://chessplusplus.auth.us-east-1.amazoncognito.com';
    useEffect(() => {
        checkIfLoggedInThroughCognito();
        if (localStorage.getItem('oauth') !== null) {
            console.log('success');
            setIsLoggedIn(true);
            window.location.replace('/');
        }
        else {
            console.log('fail');
            setIsLoggedIn(false);
        }
    });

    const generateNonce = () => {
        return Base64Url.stringify(CryptoJS.lib.WordArray.random(16));
    }

    const checkIfLoggedInThroughCognito = () => {
        if (searchParams.get('code') == null) {
            return false;
        }
        window.history.replaceState({}, document.title, window.location.origin);
        const state = searchParams.get('state');
        const verifierItem = `codeVerifier-${state}`
        const codeVerifier = sessionStorage.getItem(verifierItem);
        sessionStorage.removeItem(verifierItem);

        if (codeVerifier == null) {
            throw new Error("Code verifier was null.");
        }
        try {
            const payload = verifier.verify(searchParams.get('code'));
            console.log('Valid token. Payload: ', payload);
            localStorage.setItem('oauth', searchParams.get('code'));
            return true;
        }
        catch {
            console.log('Invalid token.');
            return false;
        }
    }

    const sendUserToCognito = () => {
        const state = generateNonce();
        const codeVerifier = generateNonce();
        sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
        
        const codeChallenge = Base64Url.stringify(SHA256(codeVerifier));
        console.log('how did i get here');
        window.location.replace(`${cognitoDomainName}/login?client_id=${clientId}&state=${state}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=http://localhost:3000/login`);
    }
    return (
        <>
        <p>
            You need to be signed in to continue.
        </p>
        <button onClick={sendUserToCognito}>login</button> {/*style this*/}
        </>

    )
}

const makerequest = () => {
    console.log('making request');
    fetch(serverURL("/hello"))
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => console.log(err));
}
export default SignInPage;