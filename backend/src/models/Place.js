import express from "express";
import { Place } from "../models/Place.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// GET all places
router.get("/", async (req, res, next) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json({ success: true, places });
  } catch (err) {
    next(err);
  }
});

// GET one place
router.get("/:id", async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: "Place not found" });
    }
    res.json({ success: true, place });
  } catch (err) {
    next(err);
  }
});

// POST add place (protected)
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { name, category, address, city, location, features } = req.body;

    if (!name || !city) {
      return res.status(400).json({
        success: false,
        message: "Name and city are required",
      });
    }

    const coords = location?.coordinates;
    const lng = Array.isArray(coords) ? coords[0] : null;
    const lat = Array.isArray(coords) ? coords[1] : null;

    if (
      typeof lng !== "number" ||
      typeof lat !== "number" ||
      lng < -180 || lng > 180 ||
      lat < -90 || lat > 90
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid location.coordinates [lng, lat] required",
      });
    }

    const newPlace = await Place.create({
      name,
      category,
      address,
      city,
      location: { type: "Point", coordinates: [lng, lat] },
      features: features || {},
      createdBy: req.user.userId,
    });

    res.status(201).json({ success: true, place: newPlace });
  } catch (err) {
    next(err);
  }
});

export default router;