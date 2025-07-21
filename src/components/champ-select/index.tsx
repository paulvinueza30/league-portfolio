import { champSelectBgImg } from "@/assets/champ-select";

import MatchIntro from "@/components/match-intro";
import PlayerSection from "@/components/player-section";
import Chatbox from "@/components/chatbox";
import RuneSelection from "@/components/runes";
import SummonerSpells from "@/components/summoner-spells";
import BMSection from "@/components/bm-section";
import QueueInfo from "@/components/queueInfo";
import SocialPanel from "@/components/social-panel";

export default function ChampSelect() {
  return (
    <div
      className="border-2 min-h-screen w-full bg-cover bg-center bg-no-repeat select-none flex flex-col justify-between"
      style={{
        backgroundImage: `url(${champSelectBgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="w-4xl justify-items-center self-center mt-10">
          <MatchIntro />
        </div>
        <div className="w-1/4">
          <PlayerSection />
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_auto] gap-x-5 mb-6 items-end h-50 mx-6">
        <Chatbox />
        <div className="flex flex-row gap-x-5 items-end">
          <div className="w-14 h-0.5 my-5 bg-[#524A42]" />
          <RuneSelection />
          <SummonerSpells />
          <div className="h-8 w-0.5 bg-[#525861] my-2.5" />
          <BMSection />
          <div className="w-14 h-0.5 my-5 bg-[#524A42]" />
        </div>
        <div className="flex flex-row items-end my-1 gap-4 flex-1 ">
          <QueueInfo />
          <SocialPanel />
        </div>
      </div>
    </div>
  );
}
