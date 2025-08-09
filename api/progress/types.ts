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
  rankInfo: {
    leaguePoints: number;
    hotStreak: boolean;
    tier: string;
    rank: string;
    rankImg: string;
    wins: number;
    losses: number;
  };
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

export interface WakaApiReponse {
  cumTotal: string;
  dailyAverage: string;
  topLanguange: string;
  topLanguageTime: string;
  topLanguagePercent: number;

  topProject: string;
  topProjectTime: string;
  topProjectPercent: number;
  editorUsed: string;
  osUsed: string;
  start: string;
  end: string;
}
