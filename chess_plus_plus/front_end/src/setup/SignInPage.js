import { useEffect, useState } from "react";
import serverURL from '../config/serverConfig';
import Base64Url from 'crypto-js/enc-base64url';
import CryptoJS from "crypto-js";
import { json, useSearchParams } from 'react-router-dom';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import LoginError from "./LoginError";

const SHA256 = require('crypto-js/sha256');
const clientId = '39i33g2381dako8dicf0nd5hdl'; 
const USER_POOL_ID = 'us-east-1_AAixkhVH9'
const cognitoDomainName = 'https://chessplusplus.auth.us-east-1.amazoncognito.com';


function SignInPage({setIsLoggedIn}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkIfLoggedInThroughCognito = async () => {
            if (searchParams.get('code') == null) {
                return false;
            }
    
            window.history.replaceState({}, document.title, window.location.origin);
            const state = searchParams.get('state');
            const verifierItem = `codeVerifier-${state}`
            const codeVerifier = sessionStorage.getItem(verifierItem);
            sessionStorage.removeItem(verifierItem);
    
            if (codeVerifier == null) {
                setErrorMessage('Could not verify user code. Try logging in again.')
                return false;
            }
    
            console.log('Validating login with backend')
            await fetch(serverURL('/authenticate'), {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({
                    code: searchParams.get('code'),
                    verifier: codeVerifier,
                })
            }).then((response) => response.json())
              .then((data) => {
                console.log(data.id_token)
                localStorage.setItem('oauth', data.id_token)
            }).catch((err) => {
                setErrorMessage(err);
            });
    
        }

        checkIfLoggedInThroughCognito();
        setIsLoading(false);
        if (localStorage.getItem('oauth') !== null) {
            setIsLoggedIn(true);
            window.location.replace('/');
        }
        else {
            setIsLoggedIn(false);
        }
    });

    

    const tokensAreValid = (tokens) => {
        console.log('access token: ', tokens.access_token)
        return true;
        // TODO BY JAKE: Make a request to the backend server to verify the JWT.  https://stackoverflow.com/questions/40302349/how-to-verify-jwt-from-aws-cognito-in-the-api-backend derek soike answer
        // 
    }
    

    return (
        <>
        {isLoading && <p>Loading... please wait</p>}
        {!isLoading && <NotLoggedIn errorMessage={errorMessage}/>}
        </>

    )
}

const NotLoggedIn = ({errorMessage}) => {

    const generateNonce = () => {
        return Base64Url.stringify(CryptoJS.lib.WordArray.random(16));
    }

    const sendUserToCognito = () => {
        const state = generateNonce();
        const codeVerifier = generateNonce();
        sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
        
        const codeChallenge = Base64Url.stringify(SHA256(codeVerifier));
        window.location.replace(`${cognitoDomainName}/login?client_id=${clientId}&state=${state}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=http://localhost:3000/login`);
    }
    return (
        <>
        <p>
            You need to be signed in to continue.
        </p>
        <button onClick={sendUserToCognito}>login</button> {/*style this*/}
        {errorMessage!=='' && <LoginError message={errorMessage} />}
        </>
    )
}
export default SignInPage;