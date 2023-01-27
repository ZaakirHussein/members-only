import { Schema, model } from "mongoose";

// Document interface
interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  membership_status: boolean;
}

// Schema
const userSchema = new Schema<User>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: { type: Boolean, required: true },
});

const User = model<User>("User", userSchema);
