const Task = require( '../models/Task' );

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