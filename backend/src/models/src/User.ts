import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export default class UserModel {
    private userSchema: any = null

    public generateSchema(): void {
        this.userSchema = new mongoose.Schema( {
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true }
        } )

        this.userSchema.plugin( uniqueValidator )

        mongoose.model( "Users", this.userSchema )
    }
}