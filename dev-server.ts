import express from "express";
import cors from "cors";
import handler from "./api/progress/index.ts";

const app = express();
app.use(cors());

app.get("/api/progress", async (req, res) => {
  try {
    await handler(req as any, res as any);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(3001, () => {
  console.log("🚀 Dev API server running on http://localhost:3001");
});
