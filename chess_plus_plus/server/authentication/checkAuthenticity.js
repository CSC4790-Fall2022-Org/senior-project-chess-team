import {CognitoJwtVerifier} from "aws-jwt-verify";
//import {jwt_decode} from "jwt-decode";

const axios = require('axios')

const checkAuthenticity = async (body) => {
    
    let jwts = await fetchJwtFromAws(body);
    if (jwts == null) {
        return {'error': 'could not authenticate with AWS'}
    }
    id_token = jwts.id_token

    if (await validIdToken(id_token)) {
        return {"id_token": jwts.id_token};
    }

    return {"error": 'could not validate JWT'}

}

//const validIdToken = async id_token => {
    
    // TODO: Verify these JWT's with AWS. https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
    // https://stackoverflow.com/questions/40302349/how-to-verify-jwt-from-aws-cognito-in-the-api-backend
    // https://aws.amazon.com/premiumsupport/knowledge-center/decode-verify-cognito-json-token/
    // above may be useful

    //Verifier that expects valid access tokens
const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-east-1_AAixkhVH9",
    tokenUse: "access",
    clientId: "39i33g2381dako8dicf0nd5hdl",
});

try {
    const payload = await verifier.verify(
        id_token
    );
    console.log("Token is valid. Payload is ", payload);
} catch {
    console.log("Token not found");
}

    //return true; // until below works
//     var decodedToken = require('jwt-decode');
//     var decoded = decodedToken(id_token);
//     console.log(decoded);
//     if (decoded.kid == userPoolId) {
//         var jwt = require('jsonwebtoken');
//         var jwkToPem = require('jwk-to-pem');
//         var pem = jwkToPem(jwk);
//         jwt.verify(id_token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {});

//         const verifier = CognitoJwtVerifier.create({
//             userPoolId: "<user_pool_id>",
//             tokenUse: "access",
//             clientId: "<client_id>",
//         });
//         try {
//             const payload = await verifier.verify(
//                 id_token //JWT as string
//             );
//             console.log("Token Valid. Payload: ", payload);
//         } catch {
//             console.log("Invalid Token");
//         }
//     }
// }
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