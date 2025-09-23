import getProgress, { apiKeys } from "./registry.ts";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const key = req.query?.key as string | undefined;
  if (key) {
    try {
      const data = await getProgress(key as any);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    return;
  }

  const routes = apiKeys.map((k) => `/api/progress/${k}`);
  res.status(200).json({ routes, keys: apiKeys });
}