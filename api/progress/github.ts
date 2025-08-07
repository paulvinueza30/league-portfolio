import { MINUTE } from "api/time";
import { type ApiReqDetails } from ".";
import { Octokit } from "octokit";
import { startOfWeek, isAfter, formatDistanceToNow } from "date-fns";

const octokit = new Octokit();

export const githubApiDetails: ApiReqDetails<GithubApiResponse> = {
  redisKey: "github-progress",
  staleAfter: 1 * MINUTE,
  fetchFn: getRecentCommit,
};

export interface GithubApiResponse {
  commitMessage: string;
  commitUrl: string;

  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  weeklyCounter: number;
}

async function getRecentCommit(): Promise<GithubApiResponse | null> {
  try {
    const response = await octokit.rest.activity.listPublicEventsForUser({
      username: "paulvinueza30",
      per_page: 50,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!response) throw new Error("Failed to fetch events");
    type PushEventPayload = {
      commits: {
        sha: string;
        message: string;
        url: string;
      }[];
    };

    const pushEvents = response.data
      .filter((event) => event.type === "PushEvent")
      .sort(
        (a, b) =>
          new Date(b.created_at as string).getTime() -
          new Date(a.created_at as string).getTime()
      );
    if (pushEvents.length === 0) {
      throw new Error("No push events found");
    }
    const now = new Date();
    const mondayStart = startOfWeek(now, { weekStartsOn: 1 });
    const weeklyCount = pushEvents.filter((e) =>
      isAfter(new Date(e.created_at as string), mondayStart)
    ).length;

    const mostRecentPush = pushEvents[0];
    const payload = mostRecentPush.payload as PushEventPayload;
    const localeString = mostRecentPush.created_at as string;
    const createdAt = formatDistanceToNow(new Date(localeString), {
      addSuffix: true,
    });
    const firstCommit = payload.commits?.[0];
    return {
      commitMessage: firstCommit?.message ?? "[no commit message]",
      commitUrl: firstCommit?.url ?? "",
      repo: {
        name: mostRecentPush.repo.name,
        url: mostRecentPush.repo.url,
      },
      created_at: createdAt,
      weeklyCounter: weeklyCount,
    };
  } catch (e: any) {
    console.log(e);
  }
  return null;
}
