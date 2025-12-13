import { greyRole } from "@/assets/role";
import { champPortrait } from "@/assets/self-pics";

import { useAtom } from "jotai";
import { selectedChampAtom, lockInAtom } from "@/atoms/champAtom";

export default function ChampSelector() {
  const [champ, setChamp] = useAtom(selectedChampAtom);
  const [_, setLockedIn] = useAtom(lockInAtom);
  const handleOnChampClick = (champName: string) => {
    setChamp(champName);
  };
  return (
    <div className="w-full max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[18rem] xl:max-w-[22rem] 2xl:max-w-[39.5em] h-full flex flex-col gap-1 sm:gap-2 md:gap-3 justify-between shadow-none">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img
          src={greyRole}
          alt="software engineer role"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
        <div className="bg-[#363825] w-full h-0.5 my-1 sm:my-2 md:my-3" />

        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 joy-champ-portrait">
          <button
            className={`
    border-2 border-[#463714] 
    transition-all duration-200 
    w-full h-full
    ${
      champ === "Paul"
        ? ""
        : "hover:border-[#c89b3c] hover:scale-105 active:scale-85"
    }
  `}
            onClick={() => handleOnChampClick("Paul")}
            disabled={champ === "Paul"}
          >
            <img
              draggable={false}
              src={champPortrait}
              alt="Champion portrait of me"
              className="w-full h-full object-cover"
            />
          </button>
          <span className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-[#939088] font-medium">
            ポール
          </span>
        </div>
      </div>
      <div className="flex justify-center pb-1 sm:pb-2 md:pb-3">
        <div
          className={`joy-lock-in-button relative w-20 h-8 sm:w-24 sm:h-9 md:w-28 md:h-10 lg:w-xs lg:h-12 transition-transform duration-150 ${
            champ && "hover:scale-105 active:scale-85"
          }`}
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            borderBottomLeftRadius: "60% 100%",
            borderBottomRightRadius: "60% 100%",
            backgroundColor: champ ? "#5bc0de" : "#666666",
            padding: "2px",
          }}
        >
          <button
            className={`w-full h-full text-white font-bold uppercase tracking-wider flex items-center justify-center relative group ${
              !champ && " cursor-not-allowed"
            }`}
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
              borderBottomLeftRadius: "60% 100%",
              borderBottomRightRadius: "60% 100%",
              backgroundColor: "#0c0d0e",
            }}
            onClick={() => champ && setLockedIn(true)}
            disabled={!champ}
          >
            <span
              className={`relative z-10 text-xs sm:text-sm md:text-base transition-colors drop-shadow-sm ${
                champ ? "group-hover:text-[#5bc0de]" : "text-gray-500"
              }`}
            >
              Lock In
            </span>

            {champ && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5bc0de] to-transparent opacity-5 group-hover:opacity-20 transition-opacity blur-lg pointer-events-none" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
