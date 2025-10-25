import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserI extends Document {
  username: string;
  email: string;
  nickname: string;
  password: string;
  bio: string;
  CoverImg: string;
  ProfileImg: string;
  friends: mongoose.Types.ObjectId[];
  Posts: mongoose.Types.ObjectId[];
}

export interface UserI1 extends Document, UserI {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<UserI1>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },

    bio : {
      type: String,
      required: false,
      default: "",
    },

    CoverImg: {
      type: String,
      required: false,  // means optional nino 
      default: "",
    },

    ProfileImg: {
      type: String,
      required: false,
      default: "",
    },

    Posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre<UserI1>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose
      .model("user")
      .updateMany({ friends: doc._id }, { $pull: { friends: doc._id } });
  }
});

const User = mongoose.model("user", userSchema);

export default User;
