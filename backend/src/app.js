import "dotenv/config";
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Baby Changing Places API",
    endpoints: listEndpoints(app),
  });
});

app.use(routes);
app.use(errorHandler);

export default app;