import serverURL from "../config/serverConfig";

function SignInPage() {
    return (
        <>
        <p>
            Signinpage is this
        </p>
        <button onClick={makerequest}> hello button </button>
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