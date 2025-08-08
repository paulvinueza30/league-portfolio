import express from "express";
import cors from "cors";
import GET from "./api/progress/index.ts";

const app = express();
app.use(cors());

app.get("/api/progress", async (req, res) => {
  const { key } = req.query;
  try {
    console.log("🎯 API called with key:", key);
    const result = await GET(key as any);
    console.log("✅ Result:", result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(3001, () => {
  console.log("🚀 Dev API server running on http://localhost:3001");
});
