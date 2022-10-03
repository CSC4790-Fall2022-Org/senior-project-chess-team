import { useEffect, useState } from "react";
import serverURL from "../config/serverConfig";
import Base64Url from "crypto-js/enc-base64url";
import CryptoJS from "crypto-js";
import { useSearchParams } from "react-router-dom";

function SignInPage({ setIsLoggedIn }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [idToken, setIdToken] = useState();
    const [verifyIsLoading, setVerifyIsLoading] = useState(true);

    const SHA256 = require("crypto-js/sha256");
    const clientId = "39i33g2381dako8dicf0nd5hdl";
    const USER_POOL_ID = "us-east-1_AAixkhVH9";

    

    const cognitoDomainName = "https://chessplusplus.auth.us-east-1.amazoncognito.com";
    useEffect(() => {
        console.log('we run it once')
        if (
            searchParams.get("code") !== null &&
            searchParams.get("state") !== null
        ) {
            
            const verifyUserDetails = async () => {
                console.log("Checking if user has returned from Cognito");
                window.history.replaceState({}, document.title, window.location.href);
                const state = searchParams.get("state");
                const verifierItem = `codeVerifier-${state}`;
                const codeVerifier = sessionStorage.getItem(verifierItem);
                if (codeVerifier == null) {
                    console.log('null code verifier')
                    setVerifyIsLoading(false)
                    // return () => {
                    //     ignore = true;
                    // }
                }
                console.log("Requesting tokens from cognito");

                const response = await fetch(serverURL("/authenticate"), {
                    method: "POST",
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                    body: JSON.stringify({
                        code: searchParams.get("code"),
                        verifier: codeVerifier,
                    }),
                });
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
            <p>You need to be signed in to continue.</p>
            <button onClick={sendUserToCognito}>login</button> {/*style this*/}
        </>
    );
}

export default SignInPage;
