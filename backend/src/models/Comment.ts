import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "user", // Changed from "User" to "user" to match User model registration
      required: true,
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
