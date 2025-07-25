import { champPortrait } from "@/assets/self-pics";
import { beachDay, rengar, vexed, elo, goNext } from "@/assets/art";

export interface Skin {
  skinName: string;
  skinImg: string;
}

export const defaultSkin: Skin = { skinName: "Paul", skinImg: champPortrait };

export const skins: Skin[] = [
  { skinName: "goGopher", skinImg: goNext },
  { skinName: "Sel", skinImg: rengar },
  { skinName: "ts", skinImg: vexed },
  { skinName: "Paul", skinImg: champPortrait },
  { skinName: "java", skinImg: elo },
  { skinName: "JavaScript", skinImg: beachDay },
];
