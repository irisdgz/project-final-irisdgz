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
      return res.status(400).json({ success: false, message: "name, city, lat, lng are required" });
    }

    const place = await Place.create({
      name,
      city,
      category,
      address,
      features,
      location: { type: "Point", coordinates: [Number(lng), Number(lat)] },
      createdBy: req.user.userId,
    });

    res.status(201).json({ success: true, place });
  } catch (err) {
    next(err);
  }
});

export default router;