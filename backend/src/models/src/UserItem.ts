import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export default class UserItemModel {
    private userItemSchema: any = null

    public generateSchema(): void {
        this.userItemSchema = new mongoose.Schema( {
            title: { type: String, required: true },
            finished: { type: Boolean, required: true, default: false },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

        }, {
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
        } )

        this.userItemSchema.plugin( uniqueValidator )

        mongoose.model( "UserItems", this.userItemSchema )
    }
}