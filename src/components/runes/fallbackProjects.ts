import { Project } from "./projects";
import { localProjectAssets } from "./localAssets";

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "TinyAutomator",
    description:
      "Designed and co-developed a lightweight no-code automation platform with a React Flow–based drag-and-drop interface for building trigger-action workflows. Built a modular workflow engine with Google API integration, step-by-step debugging, and a UX accessible to both technical and non-technical users.",
    image_url: localProjectAssets.tinyAutomator,
    demo_url: localProjectAssets.tinyVid,
    source_url: "https://github.com/tinyautomator/tinyautomator-core",
  },
  {
    id: 2,
    title: "HyprTask",
    description:
      "Developed a terminal-based task manager for the Hyprland window manager. Built with Go and the Bubble Tea framework to create a responsive TUI with real-time workspace monitoring, dynamic window padding, and keyboard-driven navigation.",
    image_url: localProjectAssets.hyprtask,
    demo_url: localProjectAssets.hyprtaskVid,
    source_url: "https://github.com/paulvinueza30/hyprtask",
  },
  {
    id: 3,
    title: "Babel",
    description:
      "Capstone project developing a multilingual translation tool for NATO use cases. Built backend with FastAPI and MVC to handle async translation using Hugging Face models, with selective fine-tuning. Benchmarked output with BLEU and COMET scores. Proposed task queue and SSE integration to improve latency. Wrote technical documentation and collaborated using Jira for structured development.",
    image_url: localProjectAssets.babel,
    demo_url: localProjectAssets.babelVid,
    source_url: "https://github.com/mayacou/Babel-Backend",
  },
  {
    id: 4,
    title: "Shawarma Brothers",
    description:
      "A restaurant website built for a client with a focus on UI/UX, tailored for a local business.",
    image_url: localProjectAssets.shawarmaBros,
    demo_url: localProjectAssets.broVid,
    source_url: "https://github.com/paulvinueza30/shawarma-brothers/",
  },
  {
    id: 5,
    title: "Atama",
    description:
      "Worked on a team as project manager to build An Anki-inspired flashcard website with gamification. Users gain XP, level up, and earn badges for reviewing cards.",
    image_url: localProjectAssets.atama,
    source_url: "https://github.com/paulvinueza30/group-20-large-project",
  },
  {
    id: 6,
    description:
      "Developed a Selenium-based bot to automate the process of reserving library hours for my senior design team, hosted on an EC2 instance. The bot streamlines the booking process, saving time and ensuring efficient collaboration for the team.",
    image_url: localProjectAssets.libBot,
    source_url: "https://github.com/paulvinueza30/library-reservation-bot",
    title: "Library Reservation Bot"
  }
];
