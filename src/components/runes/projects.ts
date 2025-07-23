import {
  tinyAutomator,
  babel,
  shawarmaBros,
  atama,
  libBot,
  tinyVid,
  babelVid,
  broVid,
} from "@/assets/projects";

import {
  reactLogo,
  goGopher,
  postgresLogo,
  pythonLogo,
  jiraLogo,
  fastApiLogo,
  seleniumLogo,
  awsLogo,
  vercelLogo,
  mernLogo,
  mvcLogo,
  jsLogo,
} from "@/assets/skills";

export interface Project {
  name: string;
  description: string;
  tags: Record<string, any>;
  image: string;
  video?: string;
  source_code_link: string;
}

export interface Skill {
  name: string;
  img: string;
}

export const projects: Project[] = [
  {
    name: "TinyAutomator",
    description:
      "Designed and co-developed a lightweight no-code automation platform with a React Flow–based drag-and-drop interface for building trigger-action workflows. Built a modular workflow engine with Google API integration, step-by-step debugging, and a UX accessible to both technical and non-technical users.",
    tags: [
      { name: "React", img: reactLogo },
      { name: "Golang", img: goGopher },
      { name: "PostgreSQL", img: postgresLogo },
    ],
    image: tinyAutomator,
    video: tinyVid,

    source_code_link: "https://github.com/tinyautomator/tinyautomator-core",
  },
  {
    name: "Babel",
    description:
      "Capstone project developing a multilingual translation tool for NATO use cases. Built backend with FastAPI and MVC to handle async translation using Hugging Face models, with selective fine-tuning. Benchmarked output with BLEU and COMET scores. Proposed task queue and SSE integration to improve latency. Wrote technical documentation and collaborated using Jira for structured development.",
    tags: [
      { name: "Python", img: pythonLogo },
      { name: "FastAPI", img: fastApiLogo },
      { name: "Jira", img: jiraLogo },
    ],
    image: babel,
    video: babelVid,
    source_code_link: "https://github.com/mayacou/Babel-Backend",
  },
  {
    name: "Shawarma Brothers",
    description:
      "A restaurant website built for a client with a focus on UI/UX, tailored for a local business.",
    tags: [
      { name: "React", img: reactLogo },
      { name: "JavaScript", img: jsLogo },
      { name: "Vercel", img: vercelLogo },
    ],
    image: shawarmaBros,
    video: broVid,
    source_code_link: "https://github.com/paulvinueza30/shawarma-brothers/",
  },
  {
    name: "Atama",
    description:
      "Worked on a team as project manager to build An Anki-inspired flashcard website with gamification. Users gain XP, level up, and earn badges for reviewing cards.",
    tags: [
      { name: "MERN", img: mernLogo },
      { name: "MVC", img: mvcLogo },
      { name: "AWS", img: awsLogo },
    ],
    image: atama,

    source_code_link: "https://github.com/paulvinueza30/group-20-large-project",
  },
  {
    name: "Library Reservation Bot",
    description:
      "Developed a Selenium-based bot to automate the process of reserving library hours for my senior design team, hosted on an EC2 instance. The bot streamlines the booking process, saving time and ensuring efficient collaboration for the team.",
    tags: [
      { name: "Selenium", img: seleniumLogo },
      { name: "EC2", img: awsLogo },
      { name: "Python", img: pythonLogo },
    ],
    image: libBot,
    source_code_link:
      "https://github.com/paulvinueza30/library-reservation-bot",
  },
];
