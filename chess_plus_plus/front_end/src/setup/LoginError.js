const LoginError = ({text}) => {
    const redirectToLogin = () => {
        window.location.replace('/')
    }
    return (
        <>
            <h1>Error authenticating user.</h1>
            <p>{text}</p>
            <button onClick={redirectToLogin}>Return to login</button>
        </>
    )
}

export default LoginError;