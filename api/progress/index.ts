// api/progress/index.ts
import getProgress, { apiKeys } from "./registry.ts";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');
    
    if (key) {
      if (!apiKeys.includes(key)) {
        return Response.json({ error: "Invalid key", keys: apiKeys }, { status: 400 });
      }
      const data = await getProgress(key as any);
      return Response.json(data);
    }
    
    const routes = apiKeys.map((k) => `/api/progress?key=${k}`);
    return Response.json({ routes, keys: apiKeys });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}