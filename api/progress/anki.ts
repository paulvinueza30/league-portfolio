import { type ApiReqDetails } from "./index.ts";

export const ankiApiDetails: ApiReqDetails<AnkiApiResponse> = {
  redisKey: "anki-progress",
  staleAfter: Infinity,
  fetchFn: async () => null,
};
export interface AnkiApiResponse {
  recentDecks: string[];
  reviewTime: number;
  device: string;
}
