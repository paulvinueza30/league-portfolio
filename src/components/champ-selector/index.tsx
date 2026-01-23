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
    <div className="w-full max-w-[6rem] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[18rem] xl:max-w-[22rem] 2xl:max-w-[39.5em] h-auto sm:h-full flex flex-col gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 justify-center shadow-none">
      <div className="flex flex-col items-center justify-center">
        <img
          src={greyRole}
          alt="Grey role icon"
          className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
        />
        <div className="bg-[#363825] w-full h-0.5 my-0.5 sm:my-1 md:my-2 lg:my-3" />

        <div className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 joy-champ-portrait">
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
          <span className="text-center text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-[#939088] font-medium mt-0.5 sm:mt-1">
            ポール
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-0.5 sm:pt-1.5 md:pt-2 lg:pt-2.5 xl:pt-3 pb-0 sm:pb-1 md:pb-2 lg:pb-3">
        <div
          className={`joy-lock-in-button relative w-14 h-5 sm:w-20 sm:h-8 md:w-24 md:h-9 lg:w-28 lg:h-10 xl:w-xs xl:h-12 transition-transform duration-150 ${
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
              className={`relative z-10 text-[9px] sm:text-xs md:text-sm lg:text-base transition-colors drop-shadow-sm ${
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
