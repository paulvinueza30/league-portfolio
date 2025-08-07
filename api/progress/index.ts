import "dotenv/config";

import { Redis } from "@upstash/redis";
import { riotApiDetails } from "./riot";
import { ankiApiDetails } from "./anki";
import { githubApiDetails } from "./github";
import { wakaApiDetails } from "./waka";
import { leetcodeApiDetails } from "./leetcode";

const KV_URL = process.env.VITE_APP_KV_REST_API_URL;
const KV_TOKEN = process.env.VITE_APP_KV_REST_API_TOKEN;

const redis = new Redis({
  url: KV_URL,
  token: KV_TOKEN,
});

export type CachedResult<T> = { data: T; timestamp: number };

export interface ApiReqDetails<T> {
  redisKey: string;
  staleAfter: number;
  fetchFn: () => Promise<T | null>;
}

const apiRegistry = {
  riot: riotApiDetails,
  anki: ankiApiDetails,
  github: githubApiDetails,
  waka: wakaApiDetails,
  leetcode: leetcodeApiDetails,
} satisfies Record<string, ApiReqDetails<any>>;

export default async function GET(key: keyof typeof apiRegistry) {
  const api = apiRegistry[key];
  if (!api) return { error: "Unknown API" };

  type Data = Awaited<ReturnType<typeof api.fetchFn>>;

  const cached = await redis.get<CachedResult<Data>>(api.redisKey);
  const now = Date.now();

  const isFresh = cached && now - cached.timestamp < api.staleAfter;

  if (isFresh) {
    // return {
    //   ...cached,
    //   timestamp: cached.timestamp,
    //   source: "store",
    // };
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
