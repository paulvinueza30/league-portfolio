import { atom } from "jotai";
import { type Skin } from "@/components/skin-carousel/skins";

export const selectedChampAtom = atom<null | string>(null);
export const lockInAtom = atom<boolean>(false);
export const skinAtom = atom<null | Skin>(null);
