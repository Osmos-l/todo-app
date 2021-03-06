const Task = require( '../models/Task' );
const TokenMiddleware = require( '../middleware/token' );
const url = require( 'url' );

exports.createTask = ( req, res, next ) => {
    const { name, owner } = req.body;

    console.log( req.body );

    if ( !name || !owner ) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    const task = new Task({
        owner,
        name,
        expired: false
    })

    task.save()
        .then( () => {
            return res.status(201).json( task );
        })
        .catch( (error) => {
            return res.status(400).json({
                error: "Erreur"
            })
        });
}

exports.getAllTask = ( req, res, next ) => {
    const ownerId = req.params.owner;

    if ( !ownerId ) {
        return res.status(400).json({
            message: "Invalid parameters"
        });
    }

    Task.find( { owner: ownerId } )
        .then( tasks => {
            return res.status(200).json( tasks );
        })
        .catch(
            error => {
                return res.status(500).json({ message: 'Server error ' + error });
            }
        );
}

exports.deleteTask = ( req, res, next ) => {
    const toRemoveID = req.params.id;

    if ( !toRemoveID ) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const token = TokenMiddleware.getToken( req );
    const tokenUserID = TokenMiddleware.getUserIDFromToken( token );

    Task.findOneAndDelete( 
        { _id: toRemoveID },
        { filter: { owner: tokenUserID } }
    ) 
    .then( res => {
        return res.status(200).json({});
    })
    .catch(
        error => {
            return res.status(500).json({ message: 'Server error ' + error });
        }
    );

}

exports.updateTask = ( req, res, next ) => {
    const toUpdateID = req.params.id;

    const expired = req.body.expired;

    if ( expired == undefined ) {
        return res.status(400).json({
            message: "Missing to update value !"
        });
    }

    if ( !toUpdateID ) {
        return res.status(400).json({
            message: "Invalid task ID"
        })
    }

    const token = TokenMiddleware.getToken( req );
    const tokenUserID = TokenMiddleware.getUserIDFromToken( token );

    Task.findOneAndUpdate( 
        { _id: toUpdateID },
        { filter: { owner: tokenUserID },
          $set: { expired } }
    ) 
    .then( task => {
        return res.status(200).json( task );
    })
    .catch(
        error => {
            return res.status(500).json({ message: 'Server error ' + error });
        }
    );

}