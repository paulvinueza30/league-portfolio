import { apiKeys } from "./registry.ts";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  const routes = apiKeys.map((k) => `/api/progress/${k}`);
  res.status(200).json({ routes, keys: apiKeys });
}
