import { type ApiReqDetails } from ".";
import { MINUTE } from "api/time";

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
