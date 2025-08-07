import "dotenv/config";

import { Redis } from "@upstash/redis";
import { riotApiDetails } from "./riot";
import { ankiApiDetails } from "./anki";
const redis = new Redis({
  url: "https://growing-glider-24113.upstash.io",
  token: "AV4xAAIjcDEzOWNmNDQ2ODUxYTM0M2NmOWM2YmJiNzUwZGZiYjcyNHAxMA",
});

type CachedResult<T> = { data: T; timestamp: number };

export interface ApiReqDetails<T> {
  redisKey: string;
  staleAfter: number;
  fetchFn: () => Promise<T | null>;
}

const apiRegistry = {
  riot: riotApiDetails,
  anki: ankiApiDetails,
} satisfies Record<string, ApiReqDetails<any>>;

export default async function GET(key: keyof typeof apiRegistry) {
  const api = apiRegistry[key];
  if (!api) return { error: "Unknown API" };

  type Data = Awaited<ReturnType<typeof api.fetchFn>>;

  const cached = await redis.get<CachedResult<Data>>(api.redisKey);
  const now = Date.now();

  const isFresh = cached && now - cached.timestamp < api.staleAfter;

  if (isFresh) {
    return {
      ...cached,
      timestamp: cached.timestamp,
      source: "store",
    };
  }

  try {
    const data = await api.fetchFn();
    await redis.set(api.redisKey, { data, timestamp: now });
    return { data: data, timestamp: now, source: "live" };
  } catch (err) {
    if (cached)
      return { ...cached, timestamp: cached.timestamp, source: "backup" };
    return { error: "Failed to fetch and no cache available" };
  }
}
