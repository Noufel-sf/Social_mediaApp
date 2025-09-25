import { Request, Response } from "express";
import { FriendRequest } from "../models/FriendRequest";
import User from "../models/User";
import { AuthenticatedRequest } from "../middlewares/isAuth";

export const SendRequest = async (req: AuthenticatedRequest, res: Response) => {
    try {

        if(!req.user) return res.status(400).json({ message: 'No user logged in '}); 

        const receiverId = req.params.id;
        
        const senderId = req.user._id;

        if (!receiverId)
            return res
                .status(400)
                .json({ message: "receiver id not provided" });

        //@ts-ignore
        if (req.user.friends.includes(receiverId))
            return res.status(400).json({ message: "already friends" });

        const existingRequest = await FriendRequest.findOne({
            senderId: senderId,
           receiverId:receiverId,
            status: "pending",
        });

        if (existingRequest)
            return res
                .status(400)
                .json({ message: "friend request already sent " });

        const request = await FriendRequest.create({
            senderId: senderId,
           receiverId:receiverId,
        });

        res.status(201).json({
            success: true,
            message: "Friend request sent successfully",
            request: request,
        });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error });
    }
};

export const AcceptRequest = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const receiver = req.user;
        if(!receiver) return res.status(400).json({ message: 'No user logged in '}); 
        const friendRequestId = req.params.id;

        if (!friendRequestId)
            return res.status(400).json({ message: "no request id provided" });

        const friendRequest = await FriendRequest.findById(friendRequestId);

        if (!friendRequest)
            return res
                .status(404)
                .json({ message: "friend request not found" });

        // console.log(receiver._id)
        // console.log(friendRequest.receiverId);
        // console.log(friendRequest.receiverId.toString() !=receiver._id.toString());

        if (friendRequest.receiverId.toString() !=receiver._id.toString())
            return res.status(301).json({ message: "not authorized" });

        if (friendRequest.status == "accepted")
            return res.status(400).json({ message: "already accepted" });

        const senderId = friendRequest?.senderId;

        await FriendRequest.findByIdAndUpdate(friendRequestId, {
            status: "accepted",
        });

        await User.findByIdAndUpdate(
           receiver._id,
            { $push: { friends: senderId } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            senderId, 
            { $push: { friends:receiver._id } },
            { new: true }
        );

        res.status(200).json({
            message: "friend request accepted",
            friendRequest: friendRequest,
            friendList:receiver.friends,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const RejectRequest = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const receiver = req.user;
        if(!receiver) return res.status(400).json({ message: 'No user logged in '}); 

        const friendRequestId = req.params.id;

        if (!friendRequestId)
            return res.status(400).json({ message: "no request id provided" });

        const friendRequest = await FriendRequest.findById(friendRequestId);

        if (!friendRequest)
            return res
                .status(404)
                .json({ message: "friend request not found" });

        if (friendRequest.receiverId.toString() !=receiver._id.toString())
            return res.status(301).json({ message: "not authorized" });

        if (friendRequest.status == "rejected")
            return res.status(400).json({ message: "already rejected" });

        if (friendRequest.status == "accepted")
            return res.status(400).json({ message: "already accpeted" });

        await FriendRequest.findByIdAndUpdate(friendRequestId, {
            status: "rejected",
        });

        res.status(200).json({
            message: "friend request rejeced",
            friendRequest: friendRequest,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const ShowFriendRequests = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const receiver = req.user;
        if(!receiver) return res.status(400).json({ message: 'No user logged in '}); 

        const friendRequests = await FriendRequest.find({
           receiverId:receiver._id,
            status: "pending",
        })
            .populate("senderId", "username")
            .select("_id senderId");

        if (!friendRequests || friendRequests.length == 0)
            return res.status(200).json({ message: "no friend requests" });

        // const sendersId = friendRequests.map(fr => fr.senderId);

        // const senders = await User.find({_id: {
        //     $in: sendersId
        // }}).select('firstName lastName email');

        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
