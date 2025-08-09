import { type ApiReqDetails } from "./index.ts";
import { type AnkiApiResponse } from "./types.ts";

export const ankiApiDetails: ApiReqDetails<AnkiApiResponse> = {
  redisKey: "anki-progress",
  staleAfter: Infinity,
  fetchFn: async () => null,
};
