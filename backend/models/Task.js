const mongoose = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

const TaskSchema = mongoose.Schema( {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    expired: { type: Boolean, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
} );

TaskSchema.plugin( uniqueValidator );

module.exports = mongoose.model( "Task", TaskSchema );