import {
  champPortrait,
  thinker,
  punch,
  leon,
  headshot,
  withBro,
  alpaca,
} from "@/assets/self-pics";
import { beachDay, rengar, vexed, elo, goNext } from "@/assets/art";

export interface Skin {
  skinName: string;
  skinImg: string;
}

export const defaultSkin: Skin = { skinName: "Paul", skinImg: champPortrait };

export const artSkins: Skin[] = [
  { skinName: "Go Next", skinImg: goNext },
  { skinName: "Delete Yuumi", skinImg: rengar },
  { skinName: "Vexed", skinImg: vexed },
  {
    skinName: "Thank you Jude @blastrider for this amazing portrait",
    skinImg: champPortrait,
  },
  { skinName: "The Cycle of League", skinImg: elo },
  { skinName: "Beach Party", skinImg: beachDay },
];
export const portraitSkins: Skin[] = [
  { skinName: "In a Japanese Cafe", skinImg: thinker },
  { skinName: "Holding an alpaca", skinImg: alpaca },
  { skinName: "High Score", skinImg: punch },
  { skinName: "Met my GOAT", skinImg: leon },
  { skinName: "Headshot", skinImg: headshot },
  { skinName: "With my brother", skinImg: withBro },
];
