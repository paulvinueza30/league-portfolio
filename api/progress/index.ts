import "dotenv/config";

import { Redis } from "@upstash/redis";
import { riotApiDetails } from "./riot.ts";
import { ankiApiDetails } from "./anki.ts";
import { githubApiDetails } from "./github.ts";
import { wakaApiDetails } from "./waka.ts";
import { leetcodeApiDetails } from "./leetcode.ts";

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

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

export const apiRegistry = {
  riot: riotApiDetails,
  anki: ankiApiDetails,
  github: githubApiDetails,
  waka: wakaApiDetails,
  leetcode: leetcodeApiDetails,
} satisfies Record<string, ApiReqDetails<any>>;

export const apiKeys = Object.keys(apiRegistry);
export type ApiKey = keyof typeof apiRegistry;

export default async function GET(key: ApiKey) {
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
