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
    <div className="flex flex-row gap-4 w-full items-center">
      <img
        className="w-24 h-24 rounded-[10vw] border-2 border-[#87714D]"
        src={champ ? champPortrait : devRole}
        alt="Software engineer dev role"
      />
      <div className="flex flex-col text-left text-[#CAB15A] text-md tracking-widest">
        <h4>Declaring Intent</h4>
        <h2 className="uppercase font-bold text-lg">Full Stack Dev</h2>
        <h3>Paul Vinueza</h3>
      </div>
    </div>
  );
}

export default function PlayerSection() {
  return (
    <div className="flex-col justify-items-start w-full">
      <h1 className="uppercase font-bold text-[#929189] tracking-widest ml-5 mb-3">
        First Pick
      </h1>
      <div className="flex flex-row w-full gap-3">
        <div className="bg-[#FABE0B] w-2" />
        <div className="w-full flex flex-col gap-4">
          <PlayerSeperator />
          <PlayerCard />
          <PlayerSeperator />
        </div>
      </div>
    </div>
  );
}
