import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    Author: {
      type: Types.ObjectId,
      ref: "user", 
      required: true,
    },
    
    PostCovers: [
      {
        type: String, 
        required: false,
        default: [],
      },
    ],

    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
        default: [],
        required: false,
      },
    ],

    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
        required: false
      }
    ]
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
export default Post;
