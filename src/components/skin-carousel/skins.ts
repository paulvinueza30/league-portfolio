import { champPortrait, thinker } from "@/assets/self-pics";
import { beachDay, rengar, vexed, elo, goNext } from "@/assets/art";
import { goGopher, javaLogo, pythonLogo } from "@/assets/skills";

export interface Skin {
  skinName: string;
  skinImg: string;
}

export const defaultSkin: Skin = { skinName: "Paul", skinImg: champPortrait };

export const artSkins: Skin[] = [
  { skinName: "Go Next", skinImg: goNext },
  { skinName: "Delete Yuumi", skinImg: rengar },
  { skinName: "Vexed", skinImg: vexed },
  { skinName: "Paul", skinImg: champPortrait },
  { skinName: "The Cycle of League", skinImg: elo },
  { skinName: "Beach Party", skinImg: beachDay },
];
export const portraitSkins: Skin[] = [
  { skinName: "In a Japanese Cafe", skinImg: thinker },
  { skinName: "In a cafe", skinImg: goGopher },
  { skinName: "In a ca", skinImg: pythonLogo },
  { skinName: "In a cae", skinImg: javaLogo },
];
