import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./isAuth";

interface DecodedToken {
  id: string;
}

export const isAuth2 = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;

    console.log("this is the token " + token);

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET!
    ) as DecodedToken;

    const user = await User.findById(decoded.id)
      .select("-password")
      // .populate({
      //   path: "Posts",
      //   populate: {
      //     path: "Author", // nested populate
      //     select: "username email ProfileImg CoverImg bio",
      //   },
      // });

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.log("Auth failed");
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
