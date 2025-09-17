import { AuthenticatedRequest } from "../middlewares/isAuth";
import { Message } from "../models/Message";
import { Request, Response } from 'express';


export const getMessages = async (req: AuthenticatedRequest, res: Response) => {

    try {
        
        const user = req.user;

        if(!user) return res.status(400).json({ message: 'No user logged in' });

        const recieverId = req.params.id;

        if(!recieverId) return res.status(400).json({ message: 'Reciever id not provided' });

        const messages = await Message.find({
            $or:[ 
                {
                    senderId: user._id,
                    recieverId: recieverId
                },
                {
                    senderId: recieverId,
                    recieverId: user._id
                }
            ]
        }).populate("senderId recieverId", "firstName lastName");


        res.status(200).json(messages);


    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}