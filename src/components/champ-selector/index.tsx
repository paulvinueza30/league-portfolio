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
    <div className="w-[39.5em] h-full flex flex-col gap-1 justify-between shadow-none">
      <div className="flex-1">
        <img src={greyRole} alt="software engineer role" className="w-6 h-6" />
        <div className="bg-[#363825] w-full h-0.5" />

        <div className="w-1/5 h-1/5 flex flex-col justify-items-center gap-2 mt-4">
          <button
            className={`
    border-2 border-[#463714] 
    transition-all duration-200 
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
          <span className="text-center text-lg text-[#939088] font-medium">
            ポール
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className={`relative w-xs h-12 transition-transform duration-150 ${
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
              className={`relative z-10 text-sm transition-colors drop-shadow-sm ${
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
