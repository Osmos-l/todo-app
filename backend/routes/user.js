const express = require( 'express' );
const router = express.Router();
const userCtrl = require( '../controllers/user' );

router.post( '/signup', userCtrl.signup );
router.post( '/login', userCtrl.login );
router.get( '/' + '', ( req, res, next ) => {
    return res.status(201).json({ message: "Ok" });
} );

module.exports = router;