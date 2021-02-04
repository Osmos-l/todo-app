const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

const config = require( '../config.json' );

const User = require( '../models/User' );

exports.signup = ( req, res, next ) => {

    const { username, email, password } = req.body;

    if ( !username || !email || !password ) {
        res.status(400).json({ message: 'Invalid parameters' });
    }

    bcrypt.hash( password, 10 )
        .then( hash => {
            const user = new User( {
                username: username,
                email: email,
                password: hash
            } );
            user.save()
                .then( () => res.status( 201 ).json( { user: user } ) )
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error });
                });
        } )
        .catch(error => {
            console.log(error);
            res.status(500).json({ error });
        });
};

exports.login = ( req, res, next ) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        res.status(400).json({ message: 'Invalid parameters' });
    }

    User.findOne({ email: email })
        .then( user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }

            bcrypt.compare( password, user.password)
                .then( valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'});
                    }

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            config.token,
                            { expiresIn: '24h' }
                        )
                    });

                })
                .catch( error => res.status(500).json({ error }) )
        })
        .catch( error => res.status(500).json({ error }) );
};