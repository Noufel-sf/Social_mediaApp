import { Request, Response } from "express";
import { FriendRequest } from "../models/FriendRequest";
import User from "../models/User";

export const SendRequest = async (req: Request, res: Response) => {
    try {
        const recieverId = req.params.id;
        //@ts-ignore
        const senderId = req.user._id;

        if (!recieverId)
            return res
                .status(400)
                .json({ message: "reciever id not provided" });

        //@ts-ignore
        if (req.user.friends.includes(recieverId))
            return res.status(400).json({ message: "already friends" });

        const existingRequest = await FriendRequest.findOne({
            senderId: senderId,
            recieverId: recieverId,
            status: "pending",
        });

        if (existingRequest)
            return res
                .status(400)
                .json({ message: "friend request already sent " });

        const request = await FriendRequest.create({
            senderId: senderId,
            recieverId: recieverId,
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

export const AcceptRequest = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const reciever = req.user;
        const friendRequestId = req.params.id;

        if (!friendRequestId)
            return res.status(400).json({ message: "no request id provided" });

        const friendRequest = await FriendRequest.findById(friendRequestId);

        if (!friendRequest)
            return res
                .status(404)
                .json({ message: "friend request not found" });

        // console.log(reciever._id)
        // console.log(friendRequest.recieverId);
        // console.log(friendRequest.recieverId.toString() != reciever._id.toString());

        if (friendRequest.recieverId.toString() != reciever._id.toString())
            return res.status(301).json({ message: "not authorized" });

        if (friendRequest.status == "accepted")
            return res.status(400).json({ message: "already accepted" });

        const senderId = friendRequest?.senderId;

        await FriendRequest.findByIdAndUpdate(friendRequestId, {
            status: "accepted",
        });

        await User.findByIdAndUpdate(
            //@ts-ignore
            req.user._id,
            { $push: { friends: senderId } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            senderId, //@ts-ignore
            { $push: { friends: req.user._id } },
            { new: true }
        );

        res.status(200).json({
            message: "friend request accepted",
            friendRequest: friendRequest,
            friendList: reciever.friends,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const RejectRequest = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const reciever = req.user;

        const friendRequestId = req.params.id;

        if (!friendRequestId)
            return res.status(400).json({ message: "no request id provided" });

        const friendRequest = await FriendRequest.findById(friendRequestId);

        if (!friendRequest)
            return res
                .status(404)
                .json({ message: "friend request not found" });

        if (friendRequest.recieverId.toString() != reciever._id.toString())
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

export const ShowFriendRequests = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const reciever = req.user;

        const friendRequests = await FriendRequest.find({
            recieverId: reciever._id,
            status: "pending",
        })
            .populate("senderId", "firstName lastName")
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
