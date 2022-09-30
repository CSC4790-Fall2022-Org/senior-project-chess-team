const axios = require('axios')

const checkAuthenticity = async (body) => {
    let jwts = await fetchJwtFromAws(body);
    console.log('jwts are', jwts);
    if (jwts == null) {
        return {'error': 'could not authenticate with AWS'}
    }
    // TODO: Verify these JWT's with AWS. https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
    // https://stackoverflow.com/questions/40302349/how-to-verify-jwt-from-aws-cognito-in-the-api-backend
    // https://aws.amazon.com/premiumsupport/knowledge-center/decode-verify-cognito-json-token/
    // above may be useful
    return {"id_token": jwts.id_token};
}

const clientId = '39i33g2381dako8dicf0nd5hdl';
const cognitoDomainName = 'https://chessplusplus.auth.us-east-1.amazoncognito.com';

const fetchJwtFromAws = async body => {
    const formBody = new URLSearchParams();
    formBody.append('grant_type', 'authorization_code');
    formBody.append('code', body.code);
    formBody.append('client_id', clientId);
    formBody.append('redirect_uri', 'http://localhost:3000/login')
    formBody.append('code_verifier', body.verifier);

    console.log('requesting tokens from cognito');

    const config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }
    return axios.post(`${cognitoDomainName}/oauth2/token`, formBody, config)
    .then((response) => {
        console.log('finishing axios')
        return response.data
    }).catch((err) => {
        console.log('could not authenticate')
        return null;
    });

}

exports.checkAuthenticity = checkAuthenticity;