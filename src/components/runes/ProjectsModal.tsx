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
} from "@/components/ui/card";
import { fetchProjects, type Project } from "./projects";
import { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

const githubIconPath = "/assets/summoner-spells/vecteezy_github-logo-git-hub-icon-on-white-background_16833872.jpg";

export function ProjectsModal() {
  const { data: projects, isLoading, isError, error } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-full text-[#F0E6D2]">Loading Projects...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-full text-red-500">Error: {error?.message}</div>;
  }

  if (!projects || projects.length === 0) {
    return <div className="flex justify-center items-center h-full text-[#F0E6D2]">No projects found.</div>;
  }

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
    <CarouselItem key={project.title} className="h-full basis-1/2">
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
          <h3 className="text-xl font-bold">{project.title}</h3>
        </CardHeader>
        <CardContent className="text-[#CDBE91] w-full">
          <div className="relative mb-4">
            {project.demo_url && project.demo_url.length > 0 ? (
              <video
                ref={videoRef}
                src={project.demo_url}
                poster={project.image_url}
                muted
                className={`object-cover rounded-none transition-opacity duration-500 ${
                  isVideoReady ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <img src={project.image_url} />
            )}
            <div className="absolute inset-0 flex self-end justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(project.source_url, "_blank")}
                className="black-gradient w-11 h-11 flex justify-center items-center cursor-pointer"
              >
                <img
                  src={githubIconPath}
                  alt="source code"
                  className="w-full h-full border-4 border-black rounded-full "
                />
              </div>
            </div>
          </div>

          <p className="text-md">{project.description}</p>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
