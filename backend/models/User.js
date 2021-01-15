import * as mongoose from 'mongoose';

const UserSchema = mongoose.Schema( {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
} );

export default mongoose.model("User", UserSchema);