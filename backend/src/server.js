import app from "./app.js";

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});