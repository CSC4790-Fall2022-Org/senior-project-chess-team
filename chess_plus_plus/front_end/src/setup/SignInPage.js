import { useEffect } from "react";
import serverURL from "../config/serverConfig";


function SignInPage({setIsLoggedIn}) {

    const cognitoUrl = 'https://chessplusplus.auth.us-east-1.amazoncognito.com/login?client_id=39i33g2381dako8dicf0nd5hdl&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/login'

    useEffect(() => {
        console.log('yooo');
        if (hasFragmentIdentifier()) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    });
    const hasFragmentIdentifier = () => {
        let url = window.location.href;
        return url.includes('#');
    }


    const doOtherThing = () => {
        setIsLoggedIn(true);
        
    }
    return (
        <>
        <p>
            You need to be signed in to continue.
        </p>
        <button onClick={doOtherThing}> login </button> 
        <br />
        <a href={cognitoUrl} rel="noreferrer"> signin </a>
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