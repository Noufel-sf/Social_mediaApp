import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken";
import { UserI } from "../models/User";
import bcrypt from "bcryptjs";
import { FriendRequest } from "../models/FriendRequest";
import { AuthenticatedRequest } from "../middlewares/isAuth";

export const Register = async (req: Request<{}, {}, UserI>, res: Response) => {
    const { username, email, nickname, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            username,
            email,
            nickname,
            password,
        });

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            nickname: user.nickname,
            token: generateAccessToken(user._id.toString()),
        });
    } catch (error) {
        res.status(500).json({ message: "server error!", error: error });
    }
};

export const Login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password)
            return res.status(400).json({ message: "all fields are required" });

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = generateAccessToken(user._id.toString());
            const refreshToken = generateRefreshToken(user._id.toString());

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                sameSite: "strict",
                // path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
            });

            res.status(200).json({
                _id: user._id,
                username: user.username,
                token: accessToken,
            });
        } else {
            return res.status(400).json({
                message: "invalid informations",
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "server error", error: err });
    }
};

export const Logout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    res.status(200).json({ message: "user logged out succesfully" });
};

export const me = (req: AuthenticatedRequest, res: Response) => {
    
    res.json(req.user);
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        if (!users) return res.status(404).json({ message: "no users" });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getRecommendedUsers  = async (req: AuthenticatedRequest, res: Response) => {
    try {
        
        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(400).json({ message: "No user logged in"})

        const user = await User.findById(loggedInUser._id).select('friends');

        if (!user) return res.status(404).json({ message: "User not found" });

        const alreadySent = await FriendRequest.find({
            senderId: loggedInUser._id
        }).select('recieverId');

        const alreadySentToUser = await FriendRequest.find({
            recieverId: loggedInUser._id,
        }).select("senderId");

        const alreadySentToUserIds = alreadySentToUser.map((req) => req.senderId);

        const alreadySentIds = alreadySent.map((req) => req.recieverId);

        const excludeIds = [loggedInUser._id, ...loggedInUser.friends, ...alreadySentIds, ...alreadySentToUserIds];

        const recommendedUsers = await User.find({
            _id: {
                $nin: excludeIds
            }
            });


        res.status(200).json(recommendedUsers)

        
    } catch (error) {

        res.status(500).json(error);
    }   
};

export const getFriends = async (req: AuthenticatedRequest, res: Response) => {
  try {
    
    const loggedInUser = req.user;

    if(!loggedInUser) return res.status(400).json({ message: 'No user logged in' });

    const user = await User.findById(loggedInUser._id)
      .populate("friends", "username email"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Error fetching friends", error });
  }
};
