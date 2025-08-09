import { type ApiReqDetails } from "./index.ts";
import { MINUTE } from "../time.ts";
import { startOfWeek, format } from "date-fns";
import { type WakaApiReponse } from "./types.ts";
import "dotenv/config";

export const wakaApiDetails: ApiReqDetails<WakaApiReponse> = {
  redisKey: "waka-progress",
  staleAfter: 30 * MINUTE,
  fetchFn: getSummary,
};

const API_KEY = process.env.WAKA_API_KEY;

async function getSummary(): Promise<WakaApiReponse | null> {
  const username = "paulvinueza30";
  const now = new Date();
  let start = format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy/MM/dd");
  const end = format(now, "yyyy/MM/dd");

  try {
    let response = await await fetch(
      `https://wakatime.com/api/v1/users/${username}/summaries?start=${start}&end=${end}&api_key=${API_KEY}`
    );

    const summary = await response.json();

    const cumTotal = summary.cumulative_total.text;
    const dailyAverage = summary.daily_average.text;
    const summaryData = summary.data.find(
      (s: any) => s.grand_total.minutes > 1
    );
    const language = summaryData.languages?.[0];
    const project = summaryData.projects?.[0];
    const editor = summaryData.editors?.[0];
    const os = summaryData.operating_systems?.[0];

    const topLanguage = language?.name || "N/A";
    const topLanguageTime = language?.text || "0 mins";
    const topLanguagePercent = language?.percent || 0;

    const topProject = project?.name || "N/A";
    const topProjectTime = project?.text || "0 mins";
    const topProjectPercent = project?.percent || 0;

    const topEditor = editor?.name || "N/A";
    const topOS = os?.name || "N/A";

    return {
      cumTotal: cumTotal,
      dailyAverage: dailyAverage,
      topLanguange: topLanguage,
      topLanguageTime: topLanguageTime,
      topLanguagePercent: topLanguagePercent,
      topProjectTime: topProjectTime,
      topProjectPercent: topProjectPercent,
      topProject: topProject,
      editorUsed: topEditor,
      osUsed: topOS,
      start: start,
      end: end,
    };
  } catch (e) {
    console.log(e);
  }
  return null;
}
