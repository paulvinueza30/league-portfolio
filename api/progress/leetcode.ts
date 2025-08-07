import "dotenv/config";
import { type ApiReqDetails } from ".";
import { MINUTE } from "../time";

import { LeetCode } from "leetcode-query";
import { formatDistanceToNow } from "date-fns";

const leetcode = new LeetCode();

export const leetcodeApiDetails: ApiReqDetails<LeetcodeApiResponse> = {
  redisKey: "leetcode-progress",
  staleAfter: 30 * MINUTE,
  fetchFn: getRecentSubmission,
};

export interface LeetcodeApiResponse {
  title: string;
  link: string;
  relativeTime: string;
  lang: string;
  status: string;
}

async function getRecentSubmission(): Promise<LeetcodeApiResponse | null> {
  try {
    const username = "paulvinueza30";
    const user = await leetcode.user(username);
    const mostRecentSubmission = user.recentSubmissionList?.[0];

    const title = mostRecentSubmission?.title;
    const slug = mostRecentSubmission?.titleSlug;
    const problemLink = `https://leetcode.com/problems/${slug}/`;

    const timestamp = mostRecentSubmission?.timestamp;
    const relativeTime = timestamp
      ? formatDistanceToNow(new Date(parseInt(timestamp) * 1000), {
          addSuffix: true,
        })
      : "Unknown";
    const lang = mostRecentSubmission?.lang;
    const status = mostRecentSubmission?.statusDisplay;
    return {
      title: title ?? "N/A",
      link: problemLink,
      relativeTime: relativeTime,
      lang: lang ?? "N/A",
      status: status ?? "N/A",
    };
  } catch (e: any) {
    console.log(e);
  }
  return null;
}
