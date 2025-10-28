import { Request, Response } from "express";
import Post from "../models/Post";
import "../models/Comment"; 
import { Comment } from "../models/Comment"; 
import User from "../models/User"; 
import { AuthenticatedRequest } from "../middlewares/isAuth";

export const GetAllUserPosts = async (req: Request, res: Response) => {
  // console.log("🔍 GetAllUserPosts endpoint hit");

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("Author", "username email ProfileImg CoverImg bio") 
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username ProfileImg",
        },
      });

    // console.log("📦 Fetched posts count:", posts.length);
    // console.log("📦 First post (if exists):", posts[0] || "No posts found");

    res.status(200).json({ posts });
  } catch (error: any) {
    console.error("❌ Error fetching posts:", error);
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

export const CreatePost = async (req: Request, res: Response) => {
    // console.log("=== CreatePost Hit ===");
    // console.log("BODY RAW:", req.body);
    // console.log("FILES RAW:", req.files);

  try {
    const { content, Author } = req.body;

    const author = await User.findById(Author);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const PostCovers = (req.files as Express.Multer.File[]).map(
      (file: any) => file.path
    );

    const newPost = new Post({
      content,
      Author: author,
      PostCovers,
    });

    await newPost.save();

    author.Posts.push(newPost._id);
    await author.save();

    res
      .status(201)
      .json({ message: "Post created successfully!", post: newPost });
  } catch (error: any) {
    console.error("🔥 Error creating post:", error);
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};


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
};

export const ToggleLike = async (req: AuthenticatedRequest, res: Response) => {
  try {
    
    const { id } = req.params;

    const currentUser = req.user;

    if(!currentUser) return res.status(400).json({ message: 'No user logged in '}); 

    const post = await Post.findById(id);

    if(!post){
      return res.status(404).json({message: 'post not found'});
    };


    const alreadyLiked = post.likes.some(
      (like) => like.toString() === currentUser._id.toString()
    );

    if(!alreadyLiked){

        const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $push: { likes: currentUser._id },
        },
        {
          new: true
        }
      );

      res.status(200).json({
        message: alreadyLiked? 'Disliked' : 'Liked',
        post: updatedPost
      });

    }else{

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $pull: { likes: currentUser._id },
        },
        {
          new: true
        }

      );

      res.status(200).json({
        message: alreadyLiked? 'Disliked' : 'Liked',
        post: updatedPost
      });
    };

  } catch (error) {
    res.status(500).json(error);
  };
};
