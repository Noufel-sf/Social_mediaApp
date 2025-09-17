"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowFriendRequests = exports.RejectRequest = exports.AcceptRequest = exports.SendRequest = void 0;
const FriendRequest_1 = require("../models/FriendRequest");
const User_1 = __importDefault(require("../models/User"));
const SendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recieverId = req.params.id;
        //@ts-ignore
        const senderId = req.user._id;
        if (!recieverId)
            return res.status(400).json({ message: 'reciever id not provided' });
        //@ts-ignore
        if (req.user.friends.includes(recieverId))
            return res.status(400).json({ message: 'already friends' });
        const existingRequest = yield FriendRequest_1.FriendRequest.findOne({
            senderId: senderId,
            recieverId: recieverId,
            status: 'pending'
        });
        if (existingRequest)
            return res.status(400).json({ message: 'friend request already sent ' });
        const request = yield FriendRequest_1.FriendRequest.create({
            senderId: senderId,
            recieverId: recieverId
        });
        res.status(201).json({ success: true, message: 'Friend request sent successfully', request: request });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error: error });
    }
    ;
});
exports.SendRequest = SendRequest;
const AcceptRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const reciever = req.user;
        const friendRequestId = req.params.id;
        if (!friendRequestId)
            return res.status(400).json({ message: 'no request id provided' });
        const friendRequest = yield FriendRequest_1.FriendRequest.findById(friendRequestId);
        if (!friendRequest)
            return res.status(404).json({ message: 'friend request not found' });
        // console.log(reciever._id)
        // console.log(friendRequest.recieverId);
        // console.log(friendRequest.recieverId.toString() != reciever._id.toString());
        if (friendRequest.recieverId.toString() != reciever._id.toString())
            return res.status(301).json({ message: 'not authorized' });
        if (friendRequest.status == 'accepted')
            return res.status(400).json({ message: 'already accepted' });
        const senderId = friendRequest === null || friendRequest === void 0 ? void 0 : friendRequest.senderId;
        yield FriendRequest_1.FriendRequest.findByIdAndUpdate(friendRequestId, {
            status: 'accepted'
        });
        //@ts-ignore
        yield User_1.default.findByIdAndUpdate(req.user._id, { $push: { friends: senderId } }, { new: true });
        yield User_1.default.findByIdAndUpdate(senderId, //@ts-ignore
        { $push: { friends: req.user._id } }, { new: true });
        res.status(200).json({ message: 'friend request accepted',
            friendRequest: friendRequest,
            friendList: reciever.friends
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.AcceptRequest = AcceptRequest;
const RejectRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const reciever = req.user;
        const friendRequestId = req.params.id;
        if (!friendRequestId)
            return res.status(400).json({ message: 'no request id provided' });
        const friendRequest = yield FriendRequest_1.FriendRequest.findById(friendRequestId);
        if (!friendRequest)
            return res.status(404).json({ message: 'friend request not found' });
        if (friendRequest.recieverId.toString() != reciever._id.toString())
            return res.status(301).json({ message: 'not authorized' });
        if (friendRequest.status == 'rejected')
            return res.status(400).json({ message: 'already rejected' });
        if (friendRequest.status == 'accepted')
            return res.status(400).json({ message: 'already accpeted' });
        yield FriendRequest_1.FriendRequest.findByIdAndUpdate(friendRequestId, {
            status: 'rejected'
        });
        res.status(200).json({ message: 'friend request rejeced',
            friendRequest: friendRequest
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.RejectRequest = RejectRequest;
const ShowFriendRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const reciever = req.user;
        const friendRequests = yield FriendRequest_1.FriendRequest.find({
            recieverId: reciever._id,
            // status: 'pending'
        }).select('senderId -_id');
        if (!friendRequests || friendRequests.length == 0)
            return res.status(404).json({ message: 'no friend requests' });
        const sendersId = friendRequests.map(fr => fr.senderId);
        const senders = yield User_1.default.find({ _id: {
                $in: sendersId
            } }).select('firstName lastName email');
        res.status(200).json(senders);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.ShowFriendRequests = ShowFriendRequests;
