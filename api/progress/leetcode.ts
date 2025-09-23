import { type ApiReqDetails } from "./registry.ts";
import { MINUTE } from "../time.ts";

import { formatDistanceToNow } from "date-fns";
import { type LeetCodeSubmission, type LeetCodeApiResponse } from "./types.ts";
const API_URL = "https://leetcode.com/graphql";

export const leetcodeApiDetails: ApiReqDetails<LeetCodeApiResponse> = {
  redisKey: "leetcode-progress",
  staleAfter: 0 * MINUTE,
  fetchFn: getRecentSubmission,
};

async function getRecentSubmission(): Promise<LeetCodeApiResponse | null> {
  try {
    const session = process.env.LEETCODE_SESSION;
    const username = process.env.LEETCODE_USERNAME;
 
    if (!session || !username) return { submissions: [] };

    const query = `query recentSubmissions($username: String!, $limit: Int!) {
      recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        statusDisplay
        lang
        timestamp
      }
    }`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com/",
        "User-Agent": "Mozilla/5.0",
        "Cookie": `LEETCODE_SESSION=${session}`,
      },
      body: JSON.stringify({
        query,
        variables: { username, limit: 10 },
      }),
    });

    if (!response.ok) return { submissions: [] };
    const json = await response.json();
    const items = json?.data?.recentSubmissionList;
    if (!Array.isArray(items)) return { submissions: [] };

    console.log(items);
    const res: LeetCodeSubmission[] = items.map((s: any) => {
      const title = s?.title;
      const slug = s?.titleSlug;
      const problemLink = `https://leetcode.com/problems/${slug}/`;
      const solutionLink = `http://leetcode.com${s?.url ?? ""}`;
      const timestamp = s?.timestamp;
      let relativeTime = "Unknown";
      if (timestamp !== undefined && timestamp !== null) {
        const n = Number(timestamp);
        const ms = Number.isFinite(n)
          ? (String(Math.trunc(n)).length === 10 ? n * 1000 : n)
          : NaN;
        if (Number.isFinite(ms)) {
          try {
            relativeTime = formatDistanceToNow(new Date(ms), { addSuffix: true });
          } catch {}
        }
      }
      const lang = s?.lang;
      const status = s?.statusDisplay;
      return {
        title: title ?? "N/A",
        problemLink,
        solutionLink,
        relativeTime,
        lang: lang ?? "N/A",
        status: status ?? "N/A",
      };
    });

    return { submissions: res };
  } catch (e: any) {
    console.log(e);
  }
  return null;
}
