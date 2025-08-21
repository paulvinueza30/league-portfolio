// components/social/ProgressDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { progressButton } from "@/assets";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useQueryClient } from "@tanstack/react-query";
import {
  AnkiApiResponse,
  GithubApiResponse,
  LeetCodeApiResponse,
  RiotApiResponse,
  WakaApiReponse,
} from "api/progress/types";
import { Badge } from "../ui/badge";
import {
  format,
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
  parse,
} from "date-fns";
import {
  goGopher,
  goText,
  javaLogo,
  jsLogo,
  pythonLogo,
  typescriptLogo,
} from "@/assets/skills";

export default function ProgressDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <img
          src={progressButton}
          alt="progress icon"
          draggable={false}
          className="w-14 h-12"
        />
      </DialogTrigger>
      <DialogContent
        className="
    !max-w-6xl w-full max-h-[80vh] overflow-auto
    [&>button]:hidden rounded-none select-none
    bg-[#010A13] border border-[#463714]
    shadow-[0_0_50px_rgba(70,55,20,0.4)] backdrop-blur-sm
  "
      >
        <DialogHeader>
          <DialogTitle className="text-[#CDBE91]">Progress</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full overflow-y-auto text-black max-w-full max-h-full grid gap-4 justify-center">
          <RiotProgressCard />
          <WakaProgressCard />
          <LeetCodeProgressCard />
          <GitHubProgressCard />
          <AnkiProgressCard />
        </div>
        <DialogClose
          className="absolute top-1 right-0.5 rounded-4xl bg-[#1E272C] text-[#BBAE86] border-4 border-[#614B23] p-0.5"
          asChild
        >
          <X className="w-8 h-8 " />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export const progressCardClass =
  "w-full min-w-3/4 bg-slate-950 border border-slate-800 shadow-sm text-white";
export function RiotProgressCard() {
  const queryClient = useQueryClient();
  const queryKey = ["progress", "riot"];
  const cachedData = queryClient.getQueryData<{
    data: RiotApiResponse;
    timestamp: number;
  }>(queryKey);
  const data = cachedData?.data;

  if (!data) return <h1>NO DATA</h1>;
  const lastUpdated = formatDistanceToNow(new Date(cachedData.timestamp), {
    addSuffix: true,
  });

  const outcome = data.win ? "Victory" : "Defeat";
  const outcomeColor = data.win
    ? "text-blue-600 bg-blue-200"
    : "text-red-600 bg-red-200";

  return (
    <Card className={progressCardClass}>
      <CardHeader className="flex items-center text-lg font-semibold">
        <h3>Leauge Summary</h3>
      </CardHeader>

      <CardContent>
        <div className={`grid grid-cols-2 gap-4 space-y-4`}>
          <div className="bg-slate-900 p-4 text-white h-full flex items-center">
            <div className="flex items-center justify-between  w-full">
              <div className="flex items-center gap-3">
                <img
                  src={data.profileIcon || "/placeholder.svg"}
                  alt="Profile Icon"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">
                      {data.summonerName}
                    </p>
                    {data.rankInfo.hotStreak && (
                      <span className="text-red-400 text-xs">🔥</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {data.rankInfo.wins}W / {data.rankInfo.losses}L
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-items-end items-end">
                <div className="flex flex-row items-center">
                  <img
                    src={data.rankInfo.rankImg}
                    alt="Rank"
                    className="w-fit h-12 -m-6"
                  />
                  <p className="text-sm font-semibold text-white">
                    {data.rankInfo.tier} {data.rankInfo.rank}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {data.rankInfo.leaguePoints} LP
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-900">
            {data.plus50 && (
              <div className="w-12 h-12 text-black bg-amber-500 rounded-full flex items-center justify-center">
                <p className="text-xs font-bold">+50</p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <img
                src={data.champImg}
                alt={data.champName}
                className="w-8 h-8 rounded"
              />
              <div>
                <p className="font-semibold text-sm">{data.champName}</p>
                <p className="text-xs text-gray-400">{data.position}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-mono">
                {data.kills}/{data.deaths}/{data.assists}
              </p>
              <p className="text-xs text-gray-400">KDA</p>
            </div>
            <div className="text-right">
              <Badge className={outcomeColor}>{outcome}</Badge>
              <p className="text-xs text-gray-400 mt-1">{data.relativeTime}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-400">{`Last updated: ${lastUpdated} `}</CardFooter>
    </Card>
  );
}
export function AnkiProgressCard() {
  const queryClient = useQueryClient();
  const queryKey = ["progress", "anki"];
  const cachedData = queryClient.getQueryData<{ data: AnkiApiResponse }>(
    queryKey
  );

  const data = cachedData?.data;

  if (!data) return <h1>NO DATA</h1>;

  console.log(data)
  const relativeTime = formatDistanceToNow(
    new Date(Number(data.timeOfReview)),
    {
      addSuffix: true,
    }
  );
  const minutes = data.reviewTime; // e.g. 20.88

  const duration = intervalToDuration({
    start: 0,
    end: minutes * 60 * 1000,
  });
  const deviceNameCleaned = data.device

  return (
    <Card className={progressCardClass}>
      <CardHeader className="flex items-center text-lg font-semibold">
        <h3 className="text-lg font-semibold">Recent Anki Session</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Study stats */}
            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-sm text-gray-400 mb-1">Review Time</p>
              <p className="text-xl font-mono font-bold">
                {formatDuration(duration)}
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-sm text-gray-400 mb-1">Device</p>
              <p className="font-semibold">{deviceNameCleaned}</p>
            </div>
          </div>

          <div className="space-y-4 p-3 max-w-sm bg-slate-900 overflow-auto">
            <div>
              <p className="text-sm text-gray-400 mb-2">Decks</p>
              {data.recentDecks.map((d, idx) => {
                return (
                  <p className="truncate text-md line-clamp-2" key={idx}>{`${
                    idx + 1
                  }. ${d}`}</p>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-gray-400">{`Last updated: ${relativeTime} `}</CardFooter>
    </Card>
  );
}

const langToSrc: Record<string, string> = {
  python: pythonLogo,
  golang: goText,
  java: javaLogo,
  typescript: typescriptLogo,
  javascript: jsLogo,
};

export function LeetCodeProgressCard() {
  const queryClient = useQueryClient();
  const queryKey = ["progress", "leetcode"];
  const cachedData = queryClient.getQueryData<{
    data: LeetCodeApiResponse;
    timestamp: number;
  }>(queryKey);

  const data = cachedData?.data;
  if (!data) return <h1>NO DATA</h1>;
  const submissions = data.submissions;
  return (
    <Card className={progressCardClass}>
      <CardHeader className="flex items-center text-lg font-semibold">
        Recent LeetCode Submissions
      </CardHeader>
      <CardContent className="space-y-2">
        {submissions.map((submission, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_1.5fr_1fr]  justify-between py-2 px-3 bg-slate-900 rounded"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`w-2 h-2 rounded-full ${
                  submission.status === "Accepted"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              ></span>
              <img
                className="w-4 h-4"
                src={langToSrc[submission.lang]}
                alt="language"
              />
              <span className="font-medium text-sm truncate">
                {submission.title}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 text-xs flex-shrink-0">
              <a
                onClick={() => window.open(submission.problemLink, "_blank")}
                className="text-blue-400 underline hover:text-slate-50"
              >
                Problem
              </a>
              <span>|</span>
              <a
                onClick={() => window.open(submission.solutionLink, "_blank")}
                className="text-blue-400 underline hover:text-slate-50"
              >
                Submission
              </a>
            </div>
            <span className="text-xs text-gray-400 flex justify-end align-text-bottom items-end">
              {submission.relativeTime.replace(/^about\s+/i, "")}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-gray-400 text-xs">
        {`Last updated: ${formatDistanceToNow(new Date(cachedData.timestamp), {
          addSuffix: true,
        })}`}
      </CardFooter>
    </Card>
  );
}

export function GitHubProgressCard() {
  const getRepoColor = (repoName: string) => {
    const colors = [
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-orange-600",
      "bg-pink-600",
    ];
    const index = repoName.length % colors.length;
    return colors[index];
  };
  const getCommitHash = (url: string): string | null => {
    if (!url) {
      return null;
    }

    const split = url.split("/");
    const lastPart = split.pop();

    if (!lastPart) {
      return null;
    }

    return lastPart.slice(0, 7);
  };
  const queryClient = useQueryClient();
  const queryKey = ["progress", "github"];
  const cachedData = queryClient.getQueryData<{
    data: GithubApiResponse;
    timestamp: number;
  }>(queryKey);

  const data = cachedData?.data;
  if (!data) return <h1>NO DATA</h1>;
  const commits = data.commits;
  return (
    <Card className={progressCardClass}>
      <CardHeader className="flex items-center justify-between text-lg font-semibold">
        <span>Recent GitHub Activity</span>
        <span className="text-sm text-green-400">
          {data.weeklyCounter} commits this week
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        {commits.map((commit, index) => (
          <div
            key={index}
            className="flex items-center gap-3 py-2 px-3 bg-slate-900 rounded hover:bg-slate-800"
          >
            <Badge
              className={`${getRepoColor(commit.repo.name)} text-white text-xs`}
            >
              {commit.repo.name}
            </Badge>
            <span className="text-sm flex-1 truncate">
              {commit.commitMessage}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <a
                onClick={() => window.open(commit.commitUrl, "_blank")}
                className="text-blue-400 hover:text-slate-50 cursor-pointer"
              >
                {getCommitHash(commit.commitUrl)}
              </a>
              <span className="text-gray-400">{commit.created_at}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-gray-400 text-xs">
        {`Last updated: ${formatDistanceToNow(new Date(cachedData.timestamp), {
          addSuffix: true,
        })}`}
      </CardFooter>{" "}
    </Card>
  );
}

function WakaProgressCard() {
  const queryClient = useQueryClient();
  const queryKey = ["progress", "waka"];
  const cachedData = queryClient.getQueryData<{
    data: WakaApiReponse;
    timestamp: number;
  }>(queryKey);

  const data = cachedData?.data;
  if (!data) return <h1>NO DATA</h1>;
  let topLang = data.topLanguange;
  if (topLang.toLowerCase().includes("go")){
    topLang = "golang"
  }
  const start = format(parse(data.start, "yyyy/MM/dd", new Date()), "MMMM d");
  const end = format(parse(data.end, "yyyy/MM/dd", new Date()), "MMMM d");

  return (
    <Card className={progressCardClass}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Code Summary</h3>
          <span className="text-xs text-gray-400">
            {start} - {end}
          </span>
        </div>
        {/* Time Stats in Header */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Total Time</p>
            <p className="text-xl font-mono font-bold text-white">
              {data.cumTotal}
            </p>
          </div>
          <div className="bg-slate-900 rounded p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Daily Average</p>
            <p className="text-xl font-mono font-bold text-white">
              {data.dailyAverage}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Language */}
          <div className="bg-slate-900 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-400 mb-3">Primary Language</p>
            <div className="flex items-center gap-3 mb-3">
              <img
                className="w-4 h-4"
                src={langToSrc[topLang.toLowerCase()]}
                alt=""
              />
              <p className="font-semibold text-lg text-white">{topLang}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-mono">{data.topLanguageTime}</p>
            </div>
          </div>

          {/* Right: Project */}
          <div className="bg-slate-900 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-400 mb-3">Top Project</p>
            <p className="font-semibold text-lg text-white mb-3 truncate">
              {data.topProject}
            </p>
            <div className="text-center">
              <p className="text-sm font-mono">{data.topProjectTime}</p>
            </div>
          </div>
        </div>

        {/* Environment Footer */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-xs text-gray-400">Top Editor</p>
            <p className="text-sm font-semibold text-white">
              {data.editorUsed}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Top OS</p>
            <p className="text-sm font-semibold text-white">{data.osUsed}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-400">
        Last updated: 1 hour ago
      </CardFooter>
    </Card>
  );
}
