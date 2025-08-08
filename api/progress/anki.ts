import { type ApiReqDetails } from "./index.ts";
import { MINUTE } from "../time.ts";

export const ankiApiDetails: ApiReqDetails<AnkiApiResponse> = {
  redisKey: "anki-progress",
  staleAfter: 30 * MINUTE,
  fetchFn: async () => null,
};
export interface AnkiApiResponse {
  recentDecks: string[];
  reviewTime: number;
  device: string;
}
