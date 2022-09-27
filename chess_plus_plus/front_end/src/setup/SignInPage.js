import serverURL from "../config/serverConfig";

function SignInPage() {
    const cognitoUrl = 'https://chessplusplus.auth.us-east-1.amazoncognito.com/login?client_id=39i33g2381dako8dicf0nd5hdl&response_type=token&scope=phone+email+openid+aws.cognito.signin.user.admin+profile&redirect_uri=https://localhost:3000/home'

    return (
        <>
        <p>
            You need to be signed in to continue.
        </p>
        <a href={cognitoUrl} rel="noreferrer">signin</a>
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