const jwt   = require( 'jsonwebtoken' );
const config = require( '../config.json' );
const TokenMiddleware  = require('./token');

module.exports = ( req, res, next ) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
       
        const userId = TokenMiddleware.getUserIDFromToken( token );

        if ( req.body.userId && req.body.userId !== userId ) {
            throw 'User ID non valable';
        } else {
            next();
        }

    } catch( error ) {
        res.status(401).json({ error: 'Requête non authentifée !' });
    }
}