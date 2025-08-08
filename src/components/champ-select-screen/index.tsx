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
import { useGSAP } from "@gsap/react";
import { gsapAtom } from "@/atoms/gsapAtom";
import { gsap } from "gsap/gsap-core";
gsap.registerPlugin(useGSAP);

function Seperator() {
  return <div className="w-14 h-0.5 my-5 bg-[#524A42]" />;
}

function HextechCircle() {
  return (
    <>
      <div
        className="absolute w-[45em] h-[36em] border-[3px] border-[#534631] rounded-full pointer-events-none z-0 shadow-lg hextech-circle"
        style={{
          clipPath: "inset(5% 0% 10% 0%)",
          filter: "drop-shadow(0 0 8px rgba(83, 70, 49, 0.4))",
          background:
            "radial-gradient(circle at center, rgba(83, 70, 49, 0.1), transparent 70%)",
        }}
      />

      <div
        className="absolute w-[46em] h-[34em] border-[2px] border-[#6b5a42] rounded-full pointer-events-none z-0 opacity-90 hextech-circle"
        style={{
          clipPath: "inset(5% 1% 10% 0%)",
          filter: "drop-shadow(0 0 6px rgba(107, 90, 66, 0.4))",
        }}
      />

      <div
        className="absolute w-[50em] h-[37em] pointer-events-none z-0 hextech-circlez"
        style={{
          clipPath: "polygon(0% 5%, 20% 3%, 3% 5%, 100% 15%, 100% 90%, 0% 90%)",
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
    </>
  );
}

export default function ChampSelectScreen() {
  const [isLockedIn] = useAtom(lockInAtom);
  const [selectedSkin] = useAtom(skinAtom);
  const [, setAnimationComplete] = useAtom(gsapAtom);

  const getBackgroundStyle = () => {
    if (selectedSkin) {
      return {
        backgroundImage: `
        radial-gradient(ellipse 50% 50% at center, 
          transparent 30%, 
          rgba(0,0,0,0.4) 60%,
          rgba(0,0,0,0.9) 100%
        ),
        url(${selectedSkin.skinImg})
      `,
        backgroundSize: "100% 100%",
        backgroundPosition: "calc(50% + 120px)",
        backgroundRepeat: "repeat",
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

  useGSAP(() => {
    const tl = gsap.timeline({
      duration: 0.8,
      onComplete: () => {
        setAnimationComplete(true);
      },
    });
    tl.from(".bg-picture", {
      opacity: 0.9,
      scale: 1.1,
      y: -50,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "sine.inOut",
    })
      .from(
        ".match-intro-item",
        {
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power1.inOut",
        },
        ">"
      )
      .from(
        ".player-section",
        {
          x: "-25vw",
          opacity: 0.5,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      )
      .from(
        ".bottom-row-item",
        {
          y: "-2vh",
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
          stagger: 0.4,
        },
        "<"
      )
      .from(
        ".hero-section",
        {
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
        },
        ">"
      )
      .from(
        ".hextech-circle",
        {
          rotation: 480,
          opacity: 0,
          duration: 0.8,
          transformOrigin: "center 50%",
          ease: "expo.in",
        },
        "<"
      );
  }, []);

  const apiKeys = ["riot"];
  useQueries({
    queries: apiKeys.map((api) => ({
      queryKey: ["progress", api],
      queryFn: async () => {
        const res = await fetch(
          `http://localhost:3001/api/progress?key=${api}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      },
    })),
  });

  return (
    <div
      className="min-h-screen max-h-screen w-full bg-cover bg-center bg-no-repeat select-none flex flex-col justify-between overflow-hidden bg-picture"
      style={getBackgroundStyle()}
    >
      <MyJoyRide />
      <div className="flex flex-col gap-6 flex-1 ">
        <div className="w-4xl justify-items-center self-center mt-10 match-intro">
          <MatchIntro />
        </div>
        <div className="flex flex-row flex-1 justify-between">
          <div className="w-1/4 player-section">
            <PlayerSection />
          </div>
          <div className="inline-flex justify-center relative">
            <HextechCircle />
            <div className="z-10 hero-section">
              {isLockedIn ? <SkinCarousel /> : <ChampSelector />}
            </div>
          </div>

          <div className="w-1/4">{/* Empty space to balance */}</div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_auto] gap-x-5 mb-6 items-end h-50 mx-6">
        <div className="bottom-row-item">
          <Chatbox />
        </div>
        <div className="flex flex-row gap-x-5 items-end bottom-row-item">
          <Seperator />
          <RuneSelection />
          <SummonerSpells />
          <div className="h-8 w-0.5 bg-[#525861] my-2.5 bottom-row-item" />
          <BMSection />
          <Seperator />
        </div>
        <div className="flex flex-row items-end my-1 gap-4 flex-1 bottom-row-item">
          <QueueInfo />
          <SocialPanel />
        </div>
      </div>
    </div>
  );
}
