import { champSelectBgImg } from "@/assets/champ-select";

import MatchIntro from "@/components/match-intro";
import PlayerSection from "@/components/player-section";
import Chatbox from "@/components/chatbox";
import RuneSelection from "@/components/runes";
import SummonerSpells from "@/components/summoner-spells";
import BMSection from "@/components/bm-section";
import QueueInfo from "@/components/queueInfo";
import SocialPanel from "@/components/social-panel";
import ChampSelector from "@/components/champ-selector";

function Seperator() {
  return <div className="w-14 h-0.5 my-5 bg-[#524A42]" />;
}

export default function ChampSelectScreen() {
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
      <div className="flex flex-col gap-6 flex-1 ">
        <div className="w-4xl justify-items-center self-center mt-10">
          <MatchIntro />
        </div>
        <div className="flex flex-row flex-1 justify-between border-2">
          <div className="w-1/4">
            <PlayerSection />
          </div>
          <div className="inline-flex justify-center relative">
            {/* Inner circle (your existing one) */}
            <div
              className="absolute w-[45em] h-[36em] border-[3px] border-[#534631] rounded-full pointer-events-none z-0 shadow-lg"
              style={{
                clipPath: "inset(5% 0% 10% 0%)",
                filter: "drop-shadow(0 0 8px rgba(83, 70, 49, 0.4))",
                background:
                  "radial-gradient(circle at center, rgba(83, 70, 49, 0.1), transparent 70%)",
              }}
            />

            {/* Outer circle for double effect */}
            <div
              className="absolute w-[46em] h-[34em] border-[2px] border-[#6b5a42] rounded-full pointer-events-none z-0 opacity-90"
              style={{
                clipPath: "inset(5% 1% 10% 0%)",
                filter: "drop-shadow(0 0 6px rgba(107, 90, 66, 0.4))",
              }}
            />

            {/* Spines container */}
            <div
              className="absolute w-[50em] h-[37em] pointer-events-none z-0"
              style={{
                clipPath:
                  "polygon(0% 5%, 20% 3%, 3% 5%, 100% 15%, 100% 90%, 0% 90%)",
              }}
            >
              {Array.from({ length: 200 }, (_, i) => {
                const angle = (360 / 200) * i;

                return (
                  <div
                    key={i}
                    className="absolute w-0.5 h-4 bg-[#534631]"
                    style={{
                      left: "50%",
                      top: "41%",
                      transform: `rotate(${angle}deg) translateY(-23em)`,
                      transformOrigin: "center bottom",
                    }}
                  />
                );
              })}
            </div>

            <div className="z-10">
              <ChampSelector />
            </div>
          </div>

          <div className="w-1/4">{/* Empty space to balance */}</div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_auto] gap-x-5 mb-6 items-end h-50 mx-6">
        <Chatbox />
        <div className="flex flex-row gap-x-5 items-end">
          <Seperator />
          <RuneSelection />
          <SummonerSpells />
          <div className="h-8 w-0.5 bg-[#525861] my-2.5" />
          <BMSection />
          <Seperator />
        </div>
        <div className="flex flex-row items-end my-1 gap-4 flex-1 ">
          <QueueInfo />
          <SocialPanel />
        </div>
      </div>
    </div>
  );
}
