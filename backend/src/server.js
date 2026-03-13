import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

const port = process.env.PORT || 8081;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
};

startServer();