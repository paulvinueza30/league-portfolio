import { atom } from "jotai";

export const selectedChampAtom = atom<null | string>(null);
export const lockInAtom = atom<boolean>(false);
