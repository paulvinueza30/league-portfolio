import "dotenv/config";
import type { ApiReqDetails } from "./index";
import { MINUTE } from "../time.ts";
import { formatDistanceToNow } from "date-fns";
import type { RiotApiResponse } from "./types";
import { RiotAPI, PlatformId, RiotAPITypes } from "@fightmegg/riot-api";

export const riotApiDetails: ApiReqDetails<RiotApiResponse> = {
  redisKey: "riot-progress",
  staleAfter: 0 * MINUTE,
  fetchFn: getRecentMatch,
};

const PUUID =
  "nhFsuZBKVP5go-OZQleZE_2r-k2NTQacmxNsndkA1TxoGJyI8y00TEqHvax3PYbcEzW4s62hQK9hZQ";

const API_KEY = process.env.RIOT_API_KEY!;
if (!API_KEY) throw new Error("Missing Riot API key in env");

// init once
const rAPI = new RiotAPI(API_KEY);

async function getRecentMatch(): Promise<RiotApiResponse | null> {
  try {
    const ids = await rAPI.matchV5.getIdsByPuuid({
      puuid: PUUID,
      cluster: PlatformId.AMERICAS,
      params: {
        type: RiotAPITypes.MatchV5.MatchType.Ranked,
        count: 1,
      },
    });
    if (!ids?.length) throw new Error("No ranked matches found");
    const match = await rAPI.matchV5.getMatchById({
      matchId: ids[0],
      cluster: PlatformId.AMERICAS,
    });
    const player = await rAPI.league.getEntriesByPUUID({
      region: PlatformId.NA1,
      puuid: PUUID,
    });

    return await extractPlayerData(match, player[0]);
  } catch (err) {
    console.error("[riot] getRecentMatch:", err);
    return null;
  }
}

async function extractPlayerData(
  match: any,
  player: RiotAPITypes.League.LeagueEntryDTO
): Promise<RiotApiResponse | null> {
  try {
    const info = match?.info;
    if (!info?.participants) throw new Error("Bad match payload");

    const p = info.participants.find((x: any) => x.puuid === PUUID);
    if (!p) throw new Error("Player not found");
    const latestV = await rAPI.ddragon.versions.latest();
    const champs = await rAPI.ddragon.champion.all({ version: latestV });
    const rankEmblemUrl = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${player.tier.toLowerCase()}.png`;

    const profileIcon = `https://ddragon.leagueoflegends.com/cdn/${latestV}/img/profileicon/${p.profileIcon}.png`;
    const champImageName =
      champs?.data?.[p.championName]?.image?.full ?? `${p.championName}.png`;
    const champImg = `https://ddragon.leagueoflegends.com/cdn/${latestV}/img/champion/${champImageName}`;

    const relativeTime = formatDistanceToNow(new Date(info.gameCreation), {
      addSuffix: true,
    });

    return {
      summonerName: p.riotIdGameName + "#" + p.riotIdTagline,
      profileIcon,
      relativeTime,
      position: p.individualPosition,
      champName: p.championName,
      champImg,
      kills: p.kills,
      deaths: p.deaths,
      assists: p.assists,
      win: p.win,
      plus50: (p.nexusTakedowns ?? 0) > 0,
      rankInfo: {
        leaguePoints: player.leaguePoints,
        hotStreak: player.hotStreak,
        tier: player.tier,
        rank: player.rank,
        rankImg: rankEmblemUrl,
        wins: player.wins,
        losses: player.losses,
      },
    };
  } catch (err) {
    console.error("[riot] extractPlayerData:", err);
    return null;
  }
}

export { getRecentMatch };
