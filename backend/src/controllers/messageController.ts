import { AuthenticatedRequest } from "../middlewares/isAuth";
import { Message } from "../models/Message";
import { Request, Response } from 'express';


export const getMessages = async (req: AuthenticatedRequest, res: Response) => {

    try {
        
        const user = req.user;

        if(!user) return res.status(400).json({ message: 'No user logged in' });

        const receiverId = req.params.id;

        if(!receiverId) return res.status(400).json({ message: 'receiver id not provided' });

        const messages = await Message.find({
            $or:[ 
                {
                    senderId: user._id,
                   receiverId:receiverId
                },
                {
                    senderId:receiverId,
                   receiverId: user._id
                }
            ]
        }).populate("senderId receiverId", "username ProfileImg");

        messages.forEach((message) => {
            if(!message.delivered) {
                message.delivered = true;
            };

            message.save();
        });


        res.status(200).json(messages);


    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}