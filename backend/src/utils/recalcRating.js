import { Review } from "../models/Review.js";
import { Place } from "../models/Place.js";

export const recalcRatingForPlace = async (placeId) => {
  const agg = await Review.aggregate([
    { $match: { placeId } },
    {
      $group: {
        _id: "$placeId",
        avgRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const avgRating = agg[0]?.avgRating || 0;
  const reviewCount = agg[0]?.reviewCount || 0;

  await Place.findByIdAndUpdate(placeId, {
    avgRating: Math.round(avgRating * 10) / 10,
    reviewCount,
  });
};