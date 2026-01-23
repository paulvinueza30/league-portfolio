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
