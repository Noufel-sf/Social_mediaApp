import mongoose, {Schema} from 'mongoose';

export interface FriendRequestI extends Document {
    senderId: mongoose.Types.ObjectId;
    recieverId: mongoose.Types.ObjectId;
    status: 'pending' | 'accepted' | 'rejected';
};


export interface FriendRequestI1 extends FriendRequestI{
    _id: mongoose.Types.ObjectId;
}


const RequestSchema = new Schema<FriendRequestI1>({

    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    recieverId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }

},
{
    timestamps: true
});

export const FriendRequest = mongoose.model('friendRequest', RequestSchema);
