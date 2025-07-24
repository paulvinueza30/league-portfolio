// TODO: Add sounds
import { githubIcon, linkedInIcon } from "@/assets/summoner-spells";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function SummonerSpells() {
  interface SummonerSpell {
    name: string;
    img: string;
    link: string;
  }

  const summonerSpells: SummonerSpell[] = [
    {
      name: "LinkedIn",
      img: linkedInIcon,
      link: "https://www.linkedin.com/in/paul-vinueza-032473221/",
    },
    {
      name: "Github",
      img: githubIcon,
      link: "https://github.com/paulvinueza30",
    },
  ];

  return (
    <div className="w-fit h-fit flex gap-4 items-center select-none">
      {summonerSpells.map((s) => (
        <HoverCard>
          <HoverCardTrigger
            key={s.name}
            className="w-12 h-12 p-0 rounded-none"
            onClick={() => window.open(s.link, "_blank", "noopener,noreferrer")}
          >
            <img src={s.img} alt={s.name + "icon"} draggable={false} />
          </HoverCardTrigger>
          <HoverCardContent
            className="
  bg-[#010A13] 
  border-2 border-[#463714] 
  text-[#F0E6D2] 
  rounded-none 
  shadow-[0_0_15px_rgba(70,55,20,0.6)]
  backdrop-blur-sm
  p-3
  select-none
  font-medium
  text-sm
"
          >
            {"Link to my " + s.name + "!"}
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
