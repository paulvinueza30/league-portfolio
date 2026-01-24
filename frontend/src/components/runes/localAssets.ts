// Removed all original imports for assets

export const localProjectAssets = {
  tinyAutomator: "/assets/projects/tinyauto.png",
  babel: "/assets/projects/babel.png",
  shawarmaBros: "/assets/projects/shawarma-bros.png",
  atama: "/assets/projects/atama.png",
  libBot: "/assets/projects/lib-bot.png",
  tinyVid: "/assets/projects/tiny-auto.mp4",
  babelVid: "/assets/projects/babel_demo.mp4",
  broVid: "/assets/projects/shwarma-bros.mp4",
  hyprtask: "/assets/projects/hyprtask.png",
  hyprtaskVid: "/assets/projects/hypr-demo.mp4",
};

// Assuming skill assets will remain in src/assets/skills and be bundled
// or if they are also moved to public, their paths would need to be updated similarly.
// For now, I'm assuming these remain as is or are handled by another part of the app.
// If skill assets also need to be public, their paths would need to be changed to:
// reactLogo: "/assets/skills/react.png", etc.
import {
  reactLogo,
  goGopher,
  postgresLogo,
  pythonLogo,
  jiraLogo,
  fastApiLogo,
  seleniumLogo,
  awsLogo,
  mernLogo,
  mvcLogo,
  jsLogo,
} from "@/assets/skills";

export const localSkillAssets = {
  reactLogo,
  goGopher,
  postgresLogo,
  pythonLogo,
  jiraLogo,
  fastApiLogo,
  seleniumLogo,
  awsLogo,
  mernLogo,
  jsLogo,
};
