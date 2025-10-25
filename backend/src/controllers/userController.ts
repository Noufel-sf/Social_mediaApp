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
            nickname: user.nickname
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

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            });

            res.status(200).json({
                user
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

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    res.status(200).json({ message: "user logged out succesfully" });
};

export const FetchCurrentUser = (req: AuthenticatedRequest, res: Response) => {
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

export const UpdateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log("=== UpdateUserProfile Hit ===");
    console.log("BODY RAW:", req.body);
    console.log("FILE RAW:", req.file);

    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(400).json({ message: "No user logged in" });
    }

    const user = await User.findById(loggedInUser._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, bio } = req.body;

   
    user.username = username || user.username;
    user.bio = bio || user.bio;

    
    if (req.file) {
      user.ProfileImg = req.file.path; 
      console.log("✅ Profile image updated:", req.file.path);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserProfilepageData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("friends", "username ProfileImg")
      .populate({
        path: "Posts",
        populate: {
          path: "Author",
          select: "username ProfileImg",
        },
      });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const UpdateUserCoverImg = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // console.log("=== UpdateUserCoverImg Hit ===");
        // console.log("BODY RAW:", req.body);
        // console.log("FILE RAW:", req.file);

        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(400).json({ message: "No user logged in" });
        }

        const user = await User.findById(loggedInUser._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (req.file) {
            user.CoverImg = req.file.path; 
            console.log("✅ Cover image updated:", req.file.path);
        }

        await user.save();

        res.status(200).json({ message: "User cover image updated successfully", user });
    } catch (error) {
        console.error("❌ Error updating cover image:", error);
        res.status(500).json({ message: "Server error", error });
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
        }).select('receiverId');

        const alreadySentToUser = await FriendRequest.find({
           receiverId: loggedInUser._id,
        }).select("senderId");

        const alreadySentToUserIds = alreadySentToUser.map((req) => req.senderId);

        const alreadySentIds = alreadySent.map((req) => req.receiverId);

        const excludeIds = [loggedInUser._id, ...loggedInUser.friends, ...alreadySentIds, ...alreadySentToUserIds];

        const recommendedUsers = await User.find({
            _id: {
                $nin: excludeIds
            }
            });


        res.status(200).json({friendSuggestions:recommendedUsers})

        
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
