import { champPortrait } from "@/assets/self-pics";
import {
  goGopher,
  seleniumLogo,
  typescriptLogo,
  javaLogo,
  jsLogo,
  figmaLogo,
} from "@/assets/skills";

export interface Skin {
  skinName: string;
  skinImg: string;
}

export const defaultSkin: Skin = { skinName: "Paul", skinImg: champPortrait };

export const skins: Skin[] = [
  { skinName: "goGopher", skinImg: goGopher },
  { skinName: "Sel", skinImg: seleniumLogo },
  { skinName: "ts", skinImg: typescriptLogo },
  { skinName: "Paul", skinImg: champPortrait },
  { skinName: "java", skinImg: javaLogo },
  { skinName: "JavaScript", skinImg: jsLogo },
  { skinName: "Figma", skinImg: figmaLogo },
];
