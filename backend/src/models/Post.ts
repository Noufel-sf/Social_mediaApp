import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    Author_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    PostCovers: [
      {
        type: String, 
        required: false,
        default: [],
      },
    ],
    // likes: [
    //   {
    //     type: Types.ObjectId,
    //     ref: "User",
    //     require: false,
    //     default: [],
    //   },
    // ],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
        default: [],
        require: false,
      },
    ],
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
export default Post;
