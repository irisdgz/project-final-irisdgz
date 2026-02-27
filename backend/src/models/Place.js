import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },

    category: {
      type: String,
      enum: ["cafe", "restaurant", "mall", "public", "other"],
      default: "other",
    },

    address: { type: String, trim: true },

    city: { type: String, required: true, trim: true },

    // GeoJSON Point (Mongo stores [lng, lat])
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (arr) =>
            Array.isArray(arr) &&
            arr.length === 2 &&
            arr.every((n) => Number.isFinite(n)),
          message: "location.coordinates must be [lng, lat] (two numbers)",
        },
      },
    },

    features: {
      changingTable: { type: Boolean, default: true },
      privateRoom: { type: Boolean, default: false },
      strollerAccess: { type: Boolean, default: false },
      accessible: { type: Boolean, default: false },
      clean: { type: Boolean, default: false },
    },

    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

placeSchema.index({ location: "2dsphere" });

export const Place = mongoose.model("Place", placeSchema);