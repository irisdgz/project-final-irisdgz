import express from "express";
import authRoutes from "./auth.js";
import placesRoutes from "./places.js";
import reviewsRoutes from "./reviews.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/places", placesRoutes);
router.use("/", reviewsRoutes); // reviews are nested like /places/:id/reviews

export default router;