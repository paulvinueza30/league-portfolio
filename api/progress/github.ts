import { MINUTE } from "../time.ts";
import { type ApiReqDetails } from "./index.ts";
import { Octokit } from "octokit";
import { startOfWeek, isAfter, formatDistanceToNow } from "date-fns";
import { type GitHubCommit, type GithubApiResponse } from "./types.ts";

const octokit = new Octokit();

export const githubApiDetails: ApiReqDetails<GithubApiResponse> = {
  redisKey: "github-progress",
  staleAfter: 1 * MINUTE,
  fetchFn: getRecentCommit,
};

async function getRecentCommit(): Promise<GithubApiResponse | null> {
  try {
    const response = await octokit.rest.activity.listPublicEventsForUser({
      username: "paulvinueza30",
      per_page: 10,
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
    const commits: GitHubCommit[] = [];
    pushEvents.forEach((commit) => {
      const payload = commit.payload as PushEventPayload;
      const localeString = commit.created_at as string;
      const createdAt = formatDistanceToNow(new Date(localeString), {
        addSuffix: true,
      });
      const firstCommit = payload.commits?.[0];
      const GitHubCommit: GitHubCommit = {
        commitMessage: firstCommit?.message ?? "[no commit message]",
        commitUrl: firstCommit?.url ?? "",
        repo: {
          name: commit.repo.name,
          url: commit.repo.url,
        },
        created_at: createdAt,
      };
      commits.push(GitHubCommit);
    });

    return {
      commits: commits,
      weeklyCounter: weeklyCount,
    };
  } catch (e: any) {
    console.log(e);
  }
  return null;
}
