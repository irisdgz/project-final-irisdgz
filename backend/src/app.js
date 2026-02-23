import "dotenv/config";
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import { connectDB } from "./db/connectDB.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// API docs
app.get("/", (req, res) => {
  res.json({
    message: "Baby Changing Places API",
    endpoints: listEndpoints(app),
  });
});

app.use(routes);

// Error handler LAST
app.use(errorHandler);

export default app;
