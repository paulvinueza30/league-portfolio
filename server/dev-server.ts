import 'dotenv/config';
import express, { type Request, type Response } from "express";
import cors from "cors";
import { getProgress, apiKeys } from "../api/progress/registry.js";

const app = express();
app.use(cors());

app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: "dev-server running... go catch it!" })
})

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

const HOST = process.env.HOST || "0.0.0.0";
const PORT = 3001;

app.listen(PORT, HOST, () => {
  console.log(`🚀 Dev API server running on http://${HOST}:${PORT}`);
});
