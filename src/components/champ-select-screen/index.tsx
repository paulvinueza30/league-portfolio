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
import SkinCarousel from "../skin-carousel";

import { useAtom } from "jotai";
import { lockInAtom, skinAtom } from "@/atoms/champAtom";

import MyJoyRide from "./MyJoyRide";

import { useQueries } from "@tanstack/react-query";
import { useChampSelectAnimation } from "@/hooks/useChampSelectAnimation";
import { skipAnimationsAndQueueAtom } from "@/atoms/queueAtom";

function Seperator() {
  return (
    <div className="w-2 sm:w-3 md:w-4 lg:w-6 xl:w-8 2xl:w-14 h-0.5 my-1.5 sm:my-2 md:my-2.5 lg:my-3 xl:my-4 2xl:my-5 bg-[#524A42]" />
  );
}

function HextechCircle() {
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 xl:-mt-6 w-[12em] h-[10em] sm:w-[18em] sm:h-[14em] md:w-[22em] md:h-[18em] lg:w-[32em] lg:h-[26em] xl:w-[38em] xl:h-[30em] 2xl:w-[45em] 2xl:h-[36em] border-[2px] sm:border-[2px] md:border-[2px] lg:border-[2px] xl:border-[3px] border-[#534631] rounded-full pointer-events-none z-0 shadow-lg hextech-circle"
        style={{
          clipPath: "inset(5% 0% 10% 0%)",
          filter: "drop-shadow(0 0 8px rgba(83, 70, 49, 0.4))",
          background:
            "radial-gradient(circle at center, rgba(83, 70, 49, 0.1), transparent 70%)",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 xl:-mt-6 w-[14em] h-[10em] sm:w-[21em] sm:h-[15em] md:w-[26em] md:h-[20em] lg:w-[36em] lg:h-[28em] xl:w-[42em] xl:h-[32em] 2xl:w-[50em] 2xl:h-[37em] pointer-events-none z-0 hextech-circlez"
        style={{
          clipPath: "polygon(0% 5%, 20% 3%, 3% 5%, 100% 15%, 100% 90%, 0% 90%)",
        }}
      >
        {Array.from({ length: 200 }, (_, i) => {
          const angle = (360 / 200) * i;

          return (
            <div
              key={i}
              className="absolute w-0.5 h-1.5 sm:h-2 md:h-3 lg:h-4 bg-[#534631]"
              style={{
                left: "50%",
                top: "41%",
                transform: `rotate(${angle}deg) translateY(-7.5em)`,
                transformOrigin: "center bottom",
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default function ChampSelectScreen() {
  const [isLockedIn] = useAtom(lockInAtom);
  const [selectedSkin] = useAtom(skinAtom);
  const [skipAnimationsAndQueue] = useAtom(skipAnimationsAndQueueAtom);

  useChampSelectAnimation(skipAnimationsAndQueue);

  const getBackgroundStyle = () => {
    if (selectedSkin) {
      return {
        backgroundImage: `
        radial-gradient(ellipse clamp(12em, 30vw, 45em) clamp(10em, 24vw, 36em) at center, 
          transparent 0%, 
          transparent 25%,
          rgba(0,0,0,0.1) 45%,
          rgba(0,0,0,0.3) 65%,
          rgba(0,0,0,0.7) 85%,
          rgba(0,0,0,0.95) 100%
        ),
        url(${selectedSkin.skinImg})
      `,
        backgroundSize: "clamp(12em, 30vw, 45em) clamp(10em, 24vw, 36em)",
        backgroundPosition: "center calc(50% - 2rem)",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a1a1a",
      };
    }

    return {
      backgroundImage: `url(${champSelectBgImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100%",
    };
  };

  const apiKeys = ["waka", "riot", "github", "leetcode", "anki"];
  useQueries({
    queries: apiKeys.map((api) => ({
      queryKey: ["progress", api],
      queryFn: async () => {
        const res = await fetch(`api/progress?key=${api}`);
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      },
    })),
  });

  return (
    <div
      className="min-h-screen max-h-screen w-full bg-cover bg-center bg-no-repeat select-none flex flex-col justify-between md:justify-start overflow-hidden bg-picture"
      style={getBackgroundStyle()}
    >
      <MyJoyRide />
      <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-6 flex-shrink md:flex-1 min-h-0 justify-start">
        <div className="w-full max-w-full sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl flex flex-col items-center self-center mt-2 md:mt-3 lg:mt-4 xl:mt-6 2xl:mt-10 match-intro px-1 sm:px-4">
          <MatchIntro />
        </div>
        <div className="flex flex-row flex-shrink md:flex-1 min-h-0 max-h-[30vh] md:max-h-none justify-between items-center">
          <div className="hidden md:flex w-1/6 sm:w-1/5 md:w-1/4 player-section flex-shrink-0 items-center h-full">
            <PlayerSection isLockedIn={isLockedIn} />
          </div>
          <div className="inline-flex justify-center relative flex-1 max-w-full items-center py-0 sm:py-0 md:py-2">
            <HextechCircle />
            <div className="z-10 hero-section flex justify-center">
              {isLockedIn ? <SkinCarousel /> : <ChampSelector />}
            </div>
          </div>
          <div className="hidden md:block w-1/6 sm:w-1/5 md:w-1/4 flex-shrink-0">
            {/* Empty space to balance */}
          </div>
        </div>
      </div>
      {/* Small screen layout: Chat and Rune in separate rows */}
      <div className="flex flex-col md:hidden gap-2 mb-2 items-center w-full px-1 sm:px-4">
        {/* Chat row - centered on small screens */}
        <div className="flex justify-center items-end bottom-row-item w-full">
          <Chatbox />
        </div>
        {/* Rune row - centered on small screens */}
        <div className="flex justify-center items-end bottom-row-item w-full">
          <RuneSelection />
        </div>
      </div>
      {/* Tablet layout: Only Chat moved up */}
      <div className="hidden md:flex lg:hidden flex-col gap-2 sm:gap-3 mb-2 sm:mb-3 items-center w-full px-2 sm:px-4">
        {/* Chat row - centered on tablet screens */}
        <div className="flex justify-center items-end bottom-row-item w-full">
          <Chatbox />
        </div>
      </div>
      {/* Bottom row */}
      <div className="flex flex-row md:flex lg:grid lg:grid-cols-[1fr_auto_1fr] gap-x-0.5 sm:gap-x-1 md:gap-x-2.5 lg:gap-x-3 xl:gap-x-5 mb-4 md:mb-2.5 lg:mb-3 xl:mb-4 items-end mx-0.5 sm:mx-1.5 md:mx-2 lg:mx-3 xl:mx-6 overflow-visible">
        {/* Chat - visible on lg+ screens only */}
        <div className="bottom-row-item hidden lg:flex lg:justify-start lg:items-end">
          <Chatbox />
        </div>
        {/* Center section */}
        <div className="flex flex-row gap-x-1 sm:gap-x-1.5 md:gap-x-2.5 lg:gap-x-1.5 xl:gap-x-2 2xl:gap-x-5 items-end bottom-row-item justify-center overflow-visible flex-nowrap">
          <Seperator />
          {/* Rune - hidden only on small screens (moved above), visible on md+ */}
          <div className="hidden md:flex items-end">
            <RuneSelection />
          </div>
          <SummonerSpells />
          <div className="h-5 sm:h-6 md:h-7 lg:h-8 w-0.5 bg-[#525861] bottom-row-item flex-shrink-0" />
          <BMSection />
          <Seperator />
        </div>
        {/* Right section */}
        <div className="flex flex-row items-end justify-end gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 bottom-row-item flex-shrink-0">
          <QueueInfo />
          <SocialPanel />
        </div>
      </div>
    </div>
  );
}
