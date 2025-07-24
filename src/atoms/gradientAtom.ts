import { atom } from "jotai";
import { type Gradient, buildGradientMap } from "@/utils/colors";

const gradientMapAtom = atom<Map<string, Gradient>>(new Map());

export const initGradientMapAtom = atom(null, async (_get, set) => {
  const map = await buildGradientMap();
  set(gradientMapAtom, map);
});

export { gradientMapAtom };
