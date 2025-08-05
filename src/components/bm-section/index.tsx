import {
  defaultSkill,
  allSkills,
  languageSkills,
  frameworkSkills,
  toolSkills,
  utilitySkills,
} from "@/assets/skills";

import { cvButton } from "@/assets/";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type Skill } from "@/assets/skills";
import { Button } from "../ui/button";

import { default as resumePDF } from "/Paul_Vinueza_Resume.pdf";

interface SkillShowCaseProps {
  skills: Skill[];
}

function SkillShowCase({ skills }: SkillShowCaseProps) {
  return (
    <div className="w-full justify-items-center grid grid-cols-4 auto-rows-min h-70 overflow-y-scroll ">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex flex-col justify-start border-2 border-grey-200 hover:bg-gray-200 hover:text-black transform hover:scale-x-85 active:scale-y-90 transition-transform"
        >
          <Button
            variant="ghost"
            className="border-0 bg-transparent hover:bg-transparent outline-none shadow-none "
          >
            <img
              className="w-7 h-7"
              src={skill.img}
              alt={skill.name + "skill"}
              draggable={false}
            />
          </Button>
          <span className="text-center text-xs">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}

function WardButton() {
  const categories: Record<string, Skill[]> = {
    All: allSkills,
    Languages: languageSkills,
    Frameworks: frameworkSkills,
    Tools: toolSkills,
    Utilities: utilitySkills,
  };

  return (
    <Popover>
      <PopoverTrigger className="joy-skills-showcase">
        <img
          className="w-12 h-12 select-none"
          src={defaultSkill}
          alt="THE GO GOPHER!!!"
          draggable={false}
        />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-full bg-[#25282a] text-white select-none"
      >
        <Tabs>
          <TabsList className="bg-[#0f0f0f] border-b border-[#C6AD66]">
            {Object.keys(categories).map((name) => (
              <TabsTrigger
                key={name}
                className="text-xs text-white data-[state=active]:text-[#C6AD66] data-[state=active]:border-b-2 data-[state=active]:border-[#C6AD66] data-[state=active]:bg-amber-100 hover:text-[#C6AD66] transition-colors duration-200 rounded-none px-2 py-1"
                value={name}
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(categories).map(([name, skills]) => (
            <TabsContent
              className="bg-[#1e1e1e] border border-[#333] mt-2 p-2 rounded-sm"
              key={name}
              value={name}
            >
              <SkillShowCase key={name} skills={skills} />
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

export default function BMSection() {
  function handleOnClick() {
    const link = document.createElement("a");

    link.href = resumePDF;
    link.download = "Paul_Vinueza_Resume.pdf";
    link.click();
  }
  return (
    <div className="flex items-center gap-4">
      <WardButton />
      <Button
        variant="ghost"
        className="h-full w-12 joy-resume-button hover:bg-transparent "
        size="icon"
        onClick={handleOnClick}
      >
        <img src={cvButton} alt="Portfolio button" draggable={false} />
      </Button>
    </div>
  );
}
