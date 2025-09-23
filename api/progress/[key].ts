import getProgress, { apiKeys } from "./registry.ts";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const rawKey = Array.isArray(req.query?.key) ? req.query.key[0] : req.query?.key;
  if (!rawKey || !apiKeys.includes(rawKey)) {
    res.status(400).json({ error: "Invalid key", keys: apiKeys });
    return;
  }

  try {
    const data = await getProgress(rawKey as any);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


