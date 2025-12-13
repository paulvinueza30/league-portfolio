import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import { devRole } from "@/assets/role";
import { champPortrait } from "@/assets/self-pics";

import { useAtom } from "jotai";
import { selectedChampAtom } from "@/atoms/champAtom";

function PlayerSeperator() {
  return (
    <div className="flex flex-row items-center text-[#929189] w-full ">
      <Circle className="w-2 h-2 fill-[#929189]" />
      <Separator decorative={true} className="flex-1 bg-[#929189] " />
    </div>
  );
}

function PlayerCard() {
  const [champ] = useAtom(selectedChampAtom);

  return (
    <div className="flex flex-row gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full items-center">
      <img
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-[10vw] border-2 border-[#87714D]"
        src={champ ? champPortrait : devRole}
        alt="Software engineer dev role"
      />
      <div className="flex flex-col text-left text-[#CAB15A] text-[10px] sm:text-xs md:text-sm lg:text-md tracking-widest">
        <h4 className="text-[10px] sm:text-xs md:text-sm lg:text-base">
          Declaring Intent
        </h4>
        <h2 className="uppercase font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          Full Stack Dev
        </h2>
        <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">
          Paul Vinueza
        </h3>
      </div>
    </div>
  );
}

export default function PlayerSection() {
  return (
    <div className="flex-col justify-items-start w-full">
      <h1 className="uppercase font-bold text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-[#929189] tracking-widest ml-1 sm:ml-2 md:ml-3 lg:ml-5 mb-1 sm:mb-2 md:mb-2.5 lg:mb-3">
        First Pick
      </h1>
      <div className="flex flex-row w-full gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
        <div className="bg-[#FABE0B] w-1.5 sm:w-2" />
        <div className="w-full flex flex-col gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
          <PlayerSeperator />
          <PlayerCard />
          <PlayerSeperator />
        </div>
      </div>
    </div>
  );
}
