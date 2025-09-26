import mongoose, {Schema} from 'mongoose';

export interface MessageI extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text: string;
    delivered: boolean;
};


export interface MessageI1 extends MessageI{
    _id: mongoose.Types.ObjectId;
}


const MessageSchema = new Schema<MessageI1>({

    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

   receiverId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    text: {
        type: String,
        required: true
    },

    delivered: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

export const Message = mongoose.model('message', MessageSchema);