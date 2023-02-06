import { Schema, model } from "mongoose";

// Document interface
export interface UserInterface {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  membership_status: boolean;
  profilePicture?: string | null;
}

// Schema
const userSchema = new Schema<UserInterface>({
  first_name: { type: String, required: true, minLength: 1, maxLength: 30 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 30 },
  username: { type: String, required: true, minLength: 1, maxLength: 30 },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 7 },
  membership_status: { type: Boolean, required: true, default: false },
  profilePicture: { type: String, default: null },
});

export const User = model<UserInterface>("User", userSchema);
