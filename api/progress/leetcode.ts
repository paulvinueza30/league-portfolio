import { type ApiReqDetails } from "./index.ts";
import { MINUTE } from "../time.ts";

import { LeetCode, Credential } from "leetcode-query";
import { formatDistanceToNow } from "date-fns";
import { type LeetCodeSubmission, type LeetCodeApiResponse } from "./types.ts";
const credential = new Credential();
await credential.init(process.env.LEETCODE_SESSION);
const leetcode = new LeetCode(credential);

export const leetcodeApiDetails: ApiReqDetails<LeetCodeApiResponse> = {
  redisKey: "leetcode-progress",
  staleAfter: 5 * MINUTE,
  fetchFn: getRecentSubmission,
};

async function getRecentSubmission(): Promise<LeetCodeApiResponse | null> {
  try {
    const submissions = await leetcode.submissions({ limit: 10 });
    const res: LeetCodeSubmission[] = [];
    submissions.forEach((s) => {
      const title = s?.title;
      const slug = s?.titleSlug;
      const problemLink = `https://leetcode.com/problems/${slug}/`;
      const solutionLink = `http://leetcode.com${s.url}`;
      const timestamp = s?.timestamp;
      const relativeTime = timestamp
        ? formatDistanceToNow(new Date(timestamp), {
            addSuffix: true,
          })
        : "Unknown";
      const lang = s?.lang;
      const status = s?.statusDisplay;
      res.push({
        title: title ?? "N/A",
        problemLink: problemLink,
        solutionLink: solutionLink,
        relativeTime: relativeTime,
        lang: lang ?? "N/A",
        status: status ?? "N/A",
      });
    });
    return { submissions: res };
  } catch (e: any) {
    console.log(e);
  }
  return null;
}
