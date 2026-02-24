import express from "express";
import mongoose from "mongoose";
import { Review } from "../models/Review.js";
import { authenticateUser } from "../middleware/auth.js";
import { recalcRatingForPlace } from "../utils/recalcRating.js";

const router = express.Router();

// GET /places/:id/reviews
router.get("/places/:id/reviews", async (req, res, next) => {
  try {
    const placeId = new mongoose.Types.ObjectId(req.params.id);
    const reviews = await Review.find({ placeId }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
});

// POST /places/:id/reviews (protected)
router.post("/places/:id/reviews", authenticateUser, async (req, res, next) => {
  try {
    const placeId = new mongoose.Types.ObjectId(req.params.id);
    const { rating, comment } = req.body;

    const review = await Review.create({
      placeId,
      userId: req.user.userId,
      rating,
      comment,
    });

    await recalcRatingForPlace(placeId);

    res.status(201).json({ success: true, review });
  } catch (err) {
    // handle unique index (one review per user per place)
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "You already reviewed this place" });
    }
    next(err);
  }
});

export default router;