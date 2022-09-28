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

const searchParams = new URL(location).searchParams;

if (searchParams.get("code") != null) {
    window.history.replaceState({}, document.title, "/");
    //logged in

    //get state and PKCE
    const state = searchParams.get("state");
    const codeVerifier = sessionStorage.getItem(`codeVerifier-${state}`);
    sessionStorage.removeItem(`codeVerifier-${state}`);
    if (codeVerifier == null) {
        throw new Error("Unexpected Code");
    }

    //switch code for tokens
    const res = await fetch(`${cognitoUrl}/oauth/token`, {
        method: "POST",
        headers: new Headers({"content-type": "application/x-www-form-urlencoded"}),
        body: Object.entries({
            "grant_type": "authorization_code",
			"client_id": clientId,
			"redirect_uri": window.location.origin,
			"code": searchParams.get("code"),
			"code_verifier": codeVerifier,
		}).map(([k, v]) => `${k}=${v}`).join("&"),
	});
	if (!res.ok) {
		throw new Error(res);
	}
	const tokens = await res.json();
} else {
    //redirect to login
    const state = await generateNonce();
    const codeVerifier = await generateNonce();
    sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
    const codeChallenge = base64URLEncode(await sha256(codeVerifier));
    //redirect to login
    window.location = `${cognitoUrl}/login?response-type=code&client_id=${clientID}&state=${state}`
}