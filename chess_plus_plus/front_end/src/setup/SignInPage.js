import { useEffect, useState } from "react";
import serverURL from "../config/serverConfig";
import Base64Url from "crypto-js/enc-base64url";
import CryptoJS from "crypto-js";
import logo from '../chess/files/Logo.png';
import { useSearchParams } from "react-router-dom";
import { verifyCognitoCredentials } from '../api/authentication.js'
import './SignInPage.css';

function SignInPage({ setIsLoggedIn }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [idToken, setIdToken] = useState();
    const [verifyIsLoading, setVerifyIsLoading] = useState(true);

    const SHA256 = require("crypto-js/sha256");
    const clientId = "39i33g2381dako8dicf0nd5hdl";

    const cognitoDomainName = "https://chessplusplus.auth.us-east-1.amazoncognito.com";
    useEffect(() => {
        console.log('we run it once')
        if (
            searchParams.get("code") !== null &&
            searchParams.get("state") !== null
        ) {
            setTimeout(() => {
                setVerifyIsLoading(false);
                // Add in an alert or something that we timed out
            }, 15000); 
            const verifyUserDetails = async () => {
                console.log("Checking if user has returned from Cognito");
                window.history.replaceState({}, document.title, window.location.href);
                const state = searchParams.get("state");
                const verifierItem = `codeVerifier-${state}`;
                const codeVerifier = sessionStorage.getItem(verifierItem);
                if (codeVerifier == null) {
                    console.log('null code verifier')
                    setVerifyIsLoading(false)
                }
                console.log("Requesting tokens from cognito");

                let code = searchParams.get('code')
                const response = await verifyCognitoCredentials(code, codeVerifier);

                console.log("Received response from cognito");
                if (response.ok) {
                    console.log("ok");
                    const body = await response.json();
                    console.log(body);
                    setIdToken(body.id_token);
                    sessionStorage.removeItem(verifierItem);
                }
                setVerifyIsLoading(false)
                // return () => {
                //     ignore = true;
                // }
                
            };
            verifyUserDetails();
        } else {
            setVerifyIsLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        if (idToken !== null && typeof idToken !== "undefined") {
            localStorage.setItem('id_token', idToken);
            setIsLoggedIn(true);
            window.location.replace("/");
        } else {
            setIsLoggedIn(false);
        }
    }, [idToken, setIsLoggedIn]);

    const generateNonce = () => {
        return Base64Url.stringify(CryptoJS.lib.WordArray.random(16));
    };

    const sendUserToCognito = () => {
        const state = generateNonce();
        const codeVerifier = generateNonce();
        sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
        const codeChallenge = Base64Url.stringify(SHA256(codeVerifier));
        window.location.replace(
            `${cognitoDomainName}/login?client_id=${clientId}&state=${state}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=http://localhost:3000/login`
        );
    };

    if (verifyIsLoading) {
        return (
            <p> Loading ...</p>
        )
    }
    return (
        <>
        <div class = "background">
        <div class = "banner">
            <img src={logo} class="BannerLogoCorner" />
        </div>
        <div class = "moveButton">
            <button class = "playNow" onClick={sendUserToCognito} role = "button">Play Now</button> {/*style this*/}
        </div>        
        </div>
        </>
    );
}

export default SignInPage;
