const express = require( 'express' );
const router = express.Router();

const taskCtrl= require( '../controllers/task' );
const auth = require( '../middleware/auth' );

router.get( '/:owner', auth, taskCtrl.getAllTask );
router.post( '/', auth, taskCtrl.createTask );
router.put( "/:id", auth, taskCtrl.updateTask );
router.delete( '/:id', auth, taskCtrl.deleteTask );

module.exports = router;