const Task = require( '../models/Task' );
const url = require( 'url' );

exports.createTask = ( req, res, next ) => {
    const { name, owner } = req.body;

    if ( !name || !owner ) {
        req.status(400).json({ message: 'Missing parameters' });
    }

    const task = new Task({
        owner: owner,
        name: name,
        expired: false
    })

    task.save()
        .then( () => {
            res.status(201).json({
                message: 'Task saved successfully!'
            });
        })
        .catch( (error) => {
            res.status(400).json({
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
        .catch( error => res.status(500).json({ message: 'Server error ' + error }) );
}