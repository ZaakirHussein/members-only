import { Schema, model } from "mongoose";
import { UserInterface } from "./User";

// Document interface
interface PostInterface {
  user: UserInterface;
  title: string;
  body: string | number;
}

// Schema
const postSchema = new Schema<PostInterface>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, minLength: 1, maxLength: 40 },
    body: { type: String, required: true, minLength: 1, maxLength: 240 },
  },
  { timestamps: true }
);

const Post = model<PostInterface>("Post", postSchema);
