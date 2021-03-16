const jwt = require( 'jsonwebtoken' );
const config = require( '../config.json' );

exports.getToken = ( req ) => {
    return req.headers.authorization.split(' ')[1];
}

exports.getUserIDFromToken = ( token ) => {
    let decodedToken;

    try {
        decodedToken = jwt.verify( token, config.token );
    } catch( error ) {
        throw false;
    }

    return userId = decodedToken.userId;
}