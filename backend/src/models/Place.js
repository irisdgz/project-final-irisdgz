import express from "express";
import { Place } from "../models/Place.js";
import { authenticateUser } from "../middleware/auth.js";

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

// POST add place (protected) - accepts lat/lng
router.post("/", authenticateUser, async (req, res, next) => {
  try {
    const { name, category, address, city, lat, lng, features } = req.body;

    if (!name || !city || lat == null || lng == null) {
      return res.status(400).json({
        success: false,
        message: "name, city, lat, lng are required",
      });
    }

    const latNum = Number(lat);
    const lngNum = Number(lng);

    const validCoords =
      Number.isFinite(latNum) &&
      Number.isFinite(lngNum) &&
      latNum >= -90 &&
      latNum <= 90 &&
      lngNum >= -180 &&
      lngNum <= 180;

    if (!validCoords) {
      return res.status(400).json({
        success: false,
        message: "lat must be -90..90 and lng must be -180..180",
      });
    }

    const newPlace = await Place.create({
      name,
      category,
      address,
      city,
      features: features || {},
      location: { type: "Point", coordinates: [lngNum, latNum] }, // Mongo wants [lng, lat]
      createdBy: req.user.userId,
    });

    res.status(201).json({ success: true, place: newPlace });
  } catch (err) {
    next(err);
  }
});

export default router;