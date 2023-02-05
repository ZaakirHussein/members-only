import { Schema, model } from "mongoose";

export interface UploadInterface {
  fileName: string;
}

const uploadSchema = new Schema<UploadInterface>({
  fileName: { type: String, required: true },
});

uploadSchema.virtual("path").get(function () {
  return `uploads/${this.fileName}`;
});

export const Upload = model<UploadInterface>("Upload", uploadSchema);
