import express, { type Request, type Response } from "express";
import cors from "cors";
import getProgress, { apiKeys } from "./api/progress/registry.js";

const app = express();
app.use(cors());

app.get("/api/progress", async (req: Request, res: Response) => {
  try {
    const key = req.query.key as string;
    
    if (key) {
      if (!apiKeys.includes(key)) {
        return res.status(400).json({ error: "Invalid key", keys: apiKeys });
      }
      const data = await getProgress(key as any);
      return res.json(data);
    }
    
    const routes = apiKeys.map((k) => `/api/progress?key=${k}`);
    return res.json({ routes, keys: apiKeys });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(3001, () => {
  console.log("🚀 Dev API server running on http://localhost:3001");
});
