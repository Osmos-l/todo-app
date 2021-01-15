import * as mongoose from 'mongoose'

const ItemSchema = mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
} );

export default mongoose.model( "Item", ItemSchema );