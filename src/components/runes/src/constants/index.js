import { li, source } from "framer-motion/client";
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  github,
  figma,
  starbucks,
  carrent,
  python,
  aws,
  golang,
  java,
  express,
  shawarmaBros,
  atama,
  libBot,
  postgresql,
  tinyAutomator,
  babel,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "works",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Fullstack Developer",
    icon: web,
  },
  {
    title: "CS Senior Year Student",
    icon: mobile,
  },
  {
    title: "Golang Enthusiast",
    icon: backend,
  },
  {
    title: "Japanese Learner",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Golang",
    icon: golang,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Express",
    icon: express,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Github",
    icon: github,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
];

const experiences = [
  {
    title: "Nothing Yet",
    // company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "August 2000 - Now",
    points: [],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "TinyAutomator",
    description:
      "Designed and co-developed a lightweight no-code automation platform with a React Flow–based drag-and-drop interface for building trigger-action workflows. Built a modular workflow engine with Google API integration, step-by-step debugging, and a UX accessible to both technical and non-technical users.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Golang",
        color: "green-text-gradient",
      },
      {
        name: "Google API",
        color: "pink-text-gradient",
      },
    ],
    image: tinyAutomator,
    source_code_link: "https://github.com/tinyautomator/tinyautomator-core",
  },
  {
    name: "Babel",
    description:
      "Capstone project developing a multilingual translation tool for NATO use cases. Built backend with FastAPI and MVC to handle async translation using Hugging Face models, with selective fine-tuning. Benchmarked output with BLEU and COMET scores. Proposed task queue and SSE integration to improve latency. Wrote technical documentation and collaborated using Jira for structured development.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Translation",
        color: "green-text-gradient",
      },
      {
        name: "Jira",
        color: "pink-text-gradient",
      },
    ],
    image: babel,
    source_code_link: "https://github.com/paulvinueza30/babel",
  },
  {
    name: "Shawarma Brothers",
    description:
      "A restaurant website built for a client with a focus on UI/UX, tailored for a local business.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Vercel",
        color: "green-text-gradient",
      },
    ],
    image: shawarmaBros,
    source_code_link: "https://github.com/paulvinueza30/shawarma-brothers/",
  },
  {
    name: "Atama",
    description:
      "Worked on a team as project manager to build An Anki-inspired flashcard website with gamification. Users gain XP, level up, and earn badges for reviewing cards.",

    tags: [
      {
        name: "MERN stack",
        color: "blue-text-gradient",
      },
      {
        name: "Model View Controller",
        color: "green-text-gradient",
      },
      {
        name: "AWS",
        color: "pink-text-gradient",
      },
    ],
    image: atama,
    source_code_link: "https://github.com/paulvinueza30/group-20-large-project",
  },
  {
    name: "Library Reservation Bot",
    description:
      "Developed a Selenium-based bot to automate the process of reserving library hours for my senior design team, hosted on an EC2 instance. The bot streamlines the booking process, saving time and ensuring efficient collaboration for the team.",
    tags: [
      {
        name: "Selenium",
        color: "blue-text-gradient",
      },
      {
        name: "EC2",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "pink-text-gradient",
      },
    ],
    image: libBot,
    source_code_link:
      "https://github.com/paulvinueza30/library-reservation-bot",
  },
  {
    name: "EventIo",
    description:
      "A simple starter project to help university students find and enroll into events",
    tags: [
      {
        name: "Express JS",
        color: "blue-text-gradient",
      },
      {
        name: "sql lite",
        color: "green-text-gradient",
      },
      {
        name: "HTML , CSS , JS",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
