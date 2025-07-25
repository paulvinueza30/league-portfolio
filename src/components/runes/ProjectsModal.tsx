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
import { projects, type Project, type Skill } from "./projects";
import { githubIcon } from "@/assets/summoner-spells";
import { useEffect, useRef, useState } from "react";

export function ProjectsModal() {
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
