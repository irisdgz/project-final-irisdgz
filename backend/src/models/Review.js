import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

// One review per user and per place
reviewSchema.index({ placeId: 1, userId: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);