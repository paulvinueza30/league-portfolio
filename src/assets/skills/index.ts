import goGopher from "./dancing-gopher.gif";
import cLogo from "./C.png";
import dbeaverLogo from "./DBeaver.png";
import fastApiLogo from "./FastAPI.png";
import ginLogo from "./gin.png";
import awsLogo from "./aws.png";
import dockerLogo from "./icons8-docker-50.png";
import expressLogo from "./icons8-express-js-50.png";
import figmaLogo from "./icons8-figma-50.png";
import githubLogo from "./icons8-github-50.png";
import javaLogo from "./icons8-java-50.png";
import jsLogo from "./icons8-javascript-50.png";
import jiraLogo from "./icons8-jira-50.png";
import mongoLogo from "./icons8-mongo-db-50.png";
import nodeJSLogo from "./icons8-node-js-50.png";
import postgresLogo from "./icons8-postgre-sql-a-free-and-open-source-relational-database-management-system-50.png";
import pythonLogo from "./icons8-python-64.png";
import reactLogo from "./icons8-react-a-javascript-library-for-building-user-interfaces-50.png";
import redisLogo from "./icons8-redis-50.png";
import jupyterLogo from "./Jupyter.png";
import npmLogo from "./NPM.png";
import postmanLogo from "./Postman.png";
import rabbitmqLogo from "./RabbitMQ.png";
import seleniumLogo from "./Selenium.png";
import viteLogo from "./Vite.js.png";
import yarnLogo from "./Yarn.png";
import typescriptLogo from "./icons8-typescript-50.png";
import tailwindLogo from "./icons8-tailwindcss-50.png";
// TODO: CLASSIFY THESE
import vercelLogo from "./vercel.png";
import mernLogo from "./mern.png";
import mvcLogo from "./mvc.jpg";
import goText from "./go-text.svg"
export interface Skill {
  name: string;
  img: string;
}

export const languageSkills: Skill[] = [
  { name: "Go", img: goGopher },
  { name: "C", img: cLogo },
  { name: "Java", img: javaLogo },
  { name: "JavaScript", img: jsLogo },
  { name: "Python", img: pythonLogo },
  { name: "TypeScript", img: typescriptLogo },
];
export const frameworkSkills: Skill[] = [
  { name: "FastAPI", img: fastApiLogo },
  { name: "Gin", img: ginLogo },
  { name: "NodeJS", img: nodeJSLogo },
  { name: "Express", img: expressLogo },
  { name: "React", img: reactLogo },
  { name: "Tailwind", img: tailwindLogo },
];
export const toolSkills: Skill[] = [
  { name: "AWS", img: awsLogo },
  { name: "Docker", img: dockerLogo },
  { name: "GitHub", img: githubLogo },
  { name: "Postman", img: postmanLogo },
  { name: "RabbitMQ", img: rabbitmqLogo },
  { name: "Selenium", img: seleniumLogo },
  { name: "Jira", img: jiraLogo },
  { name: "npm", img: npmLogo },
  { name: "Yarn", img: yarnLogo },
  { name: "DBeaver", img: dbeaverLogo },
];
export const databaseSkills: Skill[] = [
  { name: "MongoDB", img: mongoLogo },
  { name: "PostgreSQL", img: postgresLogo },
  { name: "Redis", img: redisLogo },
];
export const utilitySkills: Skill[] = [
  { name: "Figma", img: figmaLogo },
  { name: "Jupyter", img: jupyterLogo },
  { name: "Vite", img: viteLogo },
];

export const allSkills: Skill[] = [
  ...languageSkills,
  ...frameworkSkills,
  ...toolSkills,
  ...databaseSkills,
  ...utilitySkills,
];

export const defaultSkill = goGopher;

export {
  goGopher,
  goText,
  cLogo,
  dbeaverLogo,
  fastApiLogo,
  ginLogo,
  awsLogo,
  dockerLogo,
  expressLogo,
  figmaLogo,
  githubLogo,
  javaLogo,
  jsLogo,
  jiraLogo,
  mongoLogo,
  nodeJSLogo,
  postgresLogo,
  pythonLogo,
  reactLogo,
  redisLogo,
  jupyterLogo,
  npmLogo,
  postmanLogo,
  rabbitmqLogo,
  seleniumLogo,
  viteLogo,
  yarnLogo,
  typescriptLogo,
  tailwindLogo,
  vercelLogo,
  mernLogo,
  mvcLogo,
};
