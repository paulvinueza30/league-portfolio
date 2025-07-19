// TODO: Add sounds

import { Button } from "@/components/ui/button";
import { githubIcon, linkedInIcon } from "@/assets/summoner-spells";

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
    <div className="w-fit h-fit flex gap-1 items-center select-none">
      {summonerSpells.map((s) => (
        <Button
          key={s.name}
          className="w-8 h-8 p-0 rounded-none"
          onClick={() => window.open(s.link, "_blank", "noopener,noreferrer")}
        >
          <img src={s.img} alt={s.name + "icon"} draggable={false} />
        </Button>
      ))}
    </div>
  );
}
