import express from "express";
import { Place } from "../models/Place.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// GET /places?city=Stockholm&category=cafe
router.get("/", async (req, res, next) => {
  try {
    const { city, category } = req.query;
    const filter = {};

    if (city) filter.city = city;
    if (category) filter.category = category;

    const places = await Place.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json({ success: true, places });
  } catch (err) {
    next(err);
  }
});

// GET /places/:id
router.get("/:id", async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });
    res.json({ success: true, place });
  } catch (err) {
    next(err);
  }
});

// POST /places (protected)
router.post("/", authenticateUser, async (req, res, next) => {
  try {
    const { name, city, category, address, lat, lng, features } = req.body;

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

    const place = await Place.create({
      name,
      city,
      category,
      address,
      features: features || {},
      location: { type: "Point", coordinates: [lngNum, latNum] }, // [lng, lat]
      createdBy: req.user.userId,
    });

    res.status(201).json({ success: true, place });
  } catch (err) {
    next(err);
  }
});

export default router;