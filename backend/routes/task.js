const express = require( 'express' );
const router = express.Router();

const taskCtrl= require( '../controllers/task' );
const auth = require( '../middleware/auth' );

//router.get( '/' + '', auth, taskCtrl.getAllTask );
router.post( '/', auth, taskCtrl.createTask );

module.exports = router;