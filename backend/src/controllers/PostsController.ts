import { Request, Response } from "express";
import Post from "../models/Post";


export const CreatePost = async (req: Request, res: Response) => {
  console.log("=== CreatePost Hit ===");
  console.log("BODY RAW:", req.body);
  console.log("FILES RAW:", req.files);

  try {
    const { content, Author_id } = req.body;
    const PostCovers = (req.files as Express.Multer.File[]).map(
      (file: any) => file.path
    );

    const newPost = new Post({ content, Author_id, PostCovers });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("🔥 Error creating post:", error);
    res.status(500).json({ message: "Failed to create post", error });
  }
};


export const GetAllPosts = async (req: Request, res: Response) => {

    try {
        const posts = await Post.find()
            .populate("Author_id", "name avatar") // Populate author details
            .populate({
                path: "comments",
                populate: {
                    path: "Author_id",
                    select: "name avatar",
                },
            });

        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

export const GetPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
            .populate("Author_id", "name avatar")
            .populate({
                path: "comments",
                populate: {
                    path: "Author_id",
                    select: "name avatar",
                },
            });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Failed to fetch post" });
    }
}

export const GetUserPosts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ Author_id: id })
            .populate("Author_id", "name avatar")
            .populate({
                path: "comments",
                populate: {
                    path: "Author_id",
                    select: "name avatar",
                },
            });
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Failed to fetch user posts" });
    }
}


export const DeletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Failed to delete post" });
    }
}


