import "dotenv/config";
import { type ApiReqDetails } from ".";
import { MINUTE } from "../time";

export const riotApiDetails: ApiReqDetails<RiotApiResponse> = {
  redisKey: "riot-progress",
  staleAfter: 30 * MINUTE,
  fetchFn: getRecentMatch,
};
export interface RiotApiResponse {
  summonerName: string;
  profileIcon: string;
  position: string;
  champName: string;
  champImg: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  plus50: boolean;
}

const puuid =
  "nhFsuZBKVP5go-OZQleZE_2r-k2NTQacmxNsndkA1TxoGJyI8y00TEqHvax3PYbcEzW4s62hQK9hZQ";

const apiKey = process.env.VITE_APP_RIOT_API_KEY;
if (!apiKey) {
  throw new Error("Missing Riot API key in env");
}
async function getRecentMatch(): Promise<RiotApiResponse | null> {
  try {
    let response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=1`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": apiKey as string,
        },
      }
    );
    if (!response.ok)
      throw new Error(`Match list fetch failed: ${response.status}`);

    const matches = await response.json();
    if (!matches || matches.length === 0)
      throw new Error("No ranked matches found");
    const mostRecentMatch = matches[0];
    response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${mostRecentMatch}`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": apiKey as string,
        },
      }
    );
    const matchInfo = await response.json();

    const relevantData = await extractPlayerData(matchInfo);
    return relevantData;
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function extractPlayerData(
  matchInfo: any
): Promise<RiotApiResponse | null> {
  try {
    const player = matchInfo.info.participants.find(
      (p: any) => p.puuid === puuid
    );
    if (!player) throw new Error("Player not found in match info");
    const latestVersion = await getLatestVersion();
    const profileIcon = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${player.profileIcon}.png`;
    const champImg = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${player.championName}.png`;
    return {
      summonerName: player.riotIdGameName + "#" + player.riotIdTagline,
      profileIcon: profileIcon,
      position: player.individualPosition,
      champName: player.championName,
      champImg: champImg,
      kills: player.kills,
      deaths: player.deaths,
      assists: player.assists,
      win: player.win,
      plus50: player.nexusTakedowns > 0,
    };
  } catch (e: any) {
    console.error("Failed to extract player data:", e);
    return null;
  }
}
async function getLatestVersion() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  if (!response.ok)
    throw new Error(`Failed to fetch DDragon versions: ${response.status}`);
  const versions = await response.json();
  if (!versions || !versions.length)
    throw new Error("No versions returned from DDragon");
  return versions[0];
}
