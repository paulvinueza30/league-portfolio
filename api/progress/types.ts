export interface RiotApiResponse {
  summonerName: string;
  profileIcon: string;
  relativeTime: string;
  position: string;
  champName: string;
  champImg: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  plus50: boolean;
}
export interface AnkiApiResponse {
  recentDecks: string[];
  reviewTime: number;
  device: string;
  timeOfReview: number;
}
export interface LeetCodeSubmission {
  title: string;
  problemLink: string;
  solutionLink: string;
  relativeTime: string;
  lang: string;
  status: string;
}
export interface LeetCodeApiResponse {
  submissions: LeetCodeSubmission[];
}

export interface GitHubCommit {
  commitMessage: string;
  commitUrl: string;

  repo: {
    name: string;
    url: string;
  };
  created_at: string;
}

export interface GithubApiResponse {
  commits: GitHubCommit[];
  weeklyCounter: number;
}
