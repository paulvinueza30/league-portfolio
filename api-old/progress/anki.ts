import { type ApiReqDetails } from "./registry.js";
import { type AnkiApiResponse } from "./types.js";

export const ankiApiDetails: ApiReqDetails<AnkiApiResponse> = {
  redisKey: "anki-progress",
  staleAfter: Infinity,
  fetchFn: async () => null,
};
