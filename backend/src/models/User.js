import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /.+\@.+\..+/, // simple email format check
    },

    username: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Optional: ensure index is actually created
userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);