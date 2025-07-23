import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { githubIcon } from "@/assets";
import { projects, type Project, type Skill } from "./projects";
import { runeButton } from "@/assets/buttons";

import { ChevronUp, ChevronDown, Check, X } from "lucide-react";

import { type ReactNode, useState, useRef, useEffect } from "react";

// Plugins im thinking about loop , opacity, parralax

function ProjectsModal() {
  return (
    <>
      <Carousel className="self-end w-full flex flex-1 rounded-none relative">
        <CarouselContent className="rounded-none h-full">
          {projects.map((project: Project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="
  absolute left-[1px] top-1/2 z-50
  bg-[#0A1428] 
  border-2 border-[#463714]  
  hover:border-[#C89B3C] 
  text-[#CDBE91] 
 
  rounded-full
  transition-all duration-300
  shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]
"
        />

        <CarouselNext
          className="
  absolute right-[1px] top-1/2 z-50
  bg-[#0A1428] 
  border-2 border-[#463714] 
  hover:border-[#C89B3C] 
  text-[#CDBE91] 
  rounded-full 
  transition-all duration-300
  shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]
  hover:shadow-[0_0_10px_rgba(200,155,60,0.3)]
"
        />
      </Carousel>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setVideoReady] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoReady(false);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleCanPlay = () => setVideoReady(true);

    vid.addEventListener("canplay", handleCanPlay);
    return () => {
      vid.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <CarouselItem key={project.name} className="h-full basis-1/2">
      <Card
        className="
          w-full h-full rounded-none text-center
          bg-[#0A1428] 
          border-2 border-[#463714] 
          grid grid-rows-[auto_auto_2fr_auto] p-2 
          hover:border-[#C89B3C] 
          hover:bg-[#1E272C]
          cursor-pointer
          transition-all duration-300
          text-[#F0E6D2]
          shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]
        "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader className="p-2">
          <h3 className="text-xl font-bold">{project.name}</h3>
        </CardHeader>
        <CardContent className="text-[#CDBE91] w-full">
          <div className="relative mb-4">
            {project.video ? (
              <video
                ref={videoRef}
                src={project.video}
                poster={project.image}
                muted
                className={`object-cover rounded-none transition-opacity duration-500 ${
                  isVideoReady ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <img src={project.image} />
            )}
            <div className="absolute inset-0 flex self-end justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="black-gradient w-11 h-11 flex justify-center items-center cursor-pointer"
              >
                <img
                  src={githubIcon}
                  alt="source code"
                  className="w-full h-full border-4 border-black rounded-full "
                />
              </div>
            </div>
          </div>

          <p className="text-md">{project.description}</p>
        </CardContent>
        <CardFooter className="p-0 flex justify-center gap-3 self-end">
          {project.tags.map((skill: Skill, idx: number) => (
            <div
              key={idx}
              className="flex flex-col gap-2 text-[#CDBE91] text-sm"
            >
              <img
                className="h-6 w-6 self-center"
                src={skill.img}
                alt={skill.img}
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </CardFooter>
      </Card>
    </CarouselItem>
  );
}

export default function RuneSelection() {
  const [runeLabel, setRuneLabel] = useState<string>("Projects");
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);

  const runePages: Record<string, ReactNode> = {
    Projects: ProjectsModal(),

    Experience: <h1>Experience</h1>,

    "About Me": <h1>About me</h1>,
  };
  const runes = Object.keys(runePages);
  return (
    <div className="flex justify-between items-center gap-3 ">
      <Dialog>
        <DialogTrigger onClick={() => setActiveModal(runePages[runeLabel])}>
          <img
            src={runeButton}
            alt="rune button"
            className="w-12 h-12"
            draggable={false}
          />
        </DialogTrigger>
        <DialogContent
          className="
  !max-w-none w-6xl h-[45em] [&>button]:hidden rounded-none
  select-none
  bg-[#010A13] 
  border border-[#463714]
  shadow-[0_0_50px_rgba(70,55,20,0.4)]
  backdrop-blur-sm
"
        >
          <div className="relative h-full">{activeModal}</div>
          <DialogClose
            className="absolute top-1 right-0.5 rounded-4xl bg-[#1E272C] text-[#BBAE86] border-4 border-[#614B23] p-0.5"
            asChild
          >
            <X className="w-8 h-8 " />
          </DialogClose>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger className="border-3 border-[#98A0A9] bg-[#2e373f] h-12 w-2xs flex justify-between items-center px-3">
          <span className="text-lg text-[#BCAC88]">{runeLabel}</span>
          <div className="flex flex-col text-[#797B6F]">
            <ChevronUp className="w-2.5 h-2.5" />
            <ChevronDown className="w-2.5 h-2.5 -mt-0.5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={-2}
          side="top"
          className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none bg-[#111417] text-[#BCAC88]"
        >
          {runes.map((name, idx) => (
            <div
              key={name}
              className="flex justify-between items-center w-full"
            >
              <DropdownMenuItem
                className="w-full flex justify-between bg-[#1E2328] data-[highlighted]:bg-[#5a5f63] data-[highlighted]:text-[#BCAC88]"
                onClick={() => {
                  setRuneLabel(name);
                }}
              >
                {name}
                {name == runeLabel && (
                  <Check className="w-2 h-2 text-[#C7C0B1]" />
                )}
              </DropdownMenuItem>
              {idx < runes.length - 1 && (
                <DropdownMenuSeparator className="bg-[#BCAC88] h-0.5" />
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
