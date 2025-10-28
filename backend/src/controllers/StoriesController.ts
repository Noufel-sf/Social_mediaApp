import { AuthenticatedRequest } from "../middlewares/isAuth";
import { Story } from "../models/Story";
import User from "../models/User";
import { Request, Response } from "express";






export const GetAllUserStories = async (req: AuthenticatedRequest, res: Response) => {
  try {

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 3600);

    const currentUser = req.user;

    if(!currentUser) return res.status(400).json({ message: 'No user logged in '});

    const friendsList = currentUser.friends;

    const stories = await Story.find({
      author_id: { $in: friendsList },
      createdAt: { $gt: twentyFourHoursAgo }
      }
    ).populate(
      "author_id",
      "username ProfileImg"
    );

    res.status(200).json({ stories });
  } catch (error: any) {
    console.error("❌ Error fetching stories:", error);
    res.status(500).json({
      message: "Failed to fetch stories",
      error: error.message,
    });
  }
};


export const CreateStory = async (req: AuthenticatedRequest, res: Response) => {
  // console.log("=== CreateStory Hit ===");
  // console.log("BODY RAW:", req.body);
  // console.log("FILE RAW:", req.file);


    try {
    const { caption } = req.body;

    const author = req.user;
    
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // console.log(author._id);


    const storyFile = req.file?.path; // or req.file.url if using Cloudinary

    const newStory = new Story({
      caption,
      author_id: author._id,
      storyFile,
    });

    await newStory.save();

    res.status(201).json({ message: "Story created successfully!", story: newStory });
  } catch (error: any) {
    console.error("🔥 Error creating story:", error);
    res.status(500).json({ message: "Failed to create story", error: error.message });
  }
};


export const DeleteStory = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const deletedStory = await Story.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting story:", error);
    res.status(500).json({ message: "Failed to delete story", error });
  }
};
