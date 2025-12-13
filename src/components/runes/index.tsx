import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

import { runeButton } from "@/assets/buttons";

import { ChevronUp, ChevronDown, Check, X } from "lucide-react";

import { type ReactNode, useState } from "react";

import { ProjectsModal } from "./ProjectsModal";
import { LoreModal } from "./LoreModal";

export default function RuneSelection() {
  const [runeLabel, setRuneLabel] = useState<string>("Projects");
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);

  const runePages: Record<string, ReactNode> = {
    Projects: ProjectsModal(),

    Lore: LoreModal(),
  };
  const runes = Object.keys(runePages);
  return (
    <div className="flex justify-between items-end gap-2 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 flex-shrink-0">
      <Dialog>
        <DialogTrigger
          className="joy-rune-page-opener"
          onClick={() => setActiveModal(runePages[runeLabel])}
        >
          <img
            src={runeButton}
            alt="rune button"
            className="w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14"
            draggable={false}
          />
        </DialogTrigger>
        <DialogContent
          className="
  !max-w-none w-6xl h-[45em] [&>button]:hidden rounded-none
  select-none
  bg-[#010A13] 
  border border-[#463714]
  shadow-[0_0_50px_rgba(70,55,20,0.4)]
  backdrop-blur-sm
"
        >
          <div className="relative h-full">{activeModal}</div>
          <DialogClose
            className="absolute top-1 right-0.5 rounded-4xl bg-[#1E272C] text-[#BBAE86] border-4 border-[#614B23] p-0.5"
            asChild
          >
            <X className="w-8 h-8 " />
          </DialogClose>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger className="border-3 border-[#98A0A9] bg-[#2e373f] h-8 w-16 sm:h-8 sm:w-20 md:h-12 md:w-24 lg:h-12 lg:w-28 xl:h-12 xl:w-32 2xl:h-12 2xl:w-2xs flex justify-between items-center px-1.5 sm:px-2 md:px-2.5 lg:px-3 joy-rune-dropdown">
          <span className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-lg text-[#BCAC88]">
            {runeLabel}
          </span>
          <div className="flex flex-col text-[#797B6F]">
            <ChevronUp className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5" />
            <ChevronDown className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 -mt-0.5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={-2}
          side="top"
          className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none bg-[#111417] text-[#BCAC88]"
        >
          {runes.map((name, idx) => (
            <div
              key={name}
              className="flex justify-between items-center w-full"
            >
              <DropdownMenuItem
                className="w-full flex justify-between bg-[#1E2328] data-[highlighted]:bg-[#5a5f63] data-[highlighted]:text-[#BCAC88]"
                onClick={() => {
                  setRuneLabel(name);
                }}
              >
                {name}
                {name == runeLabel && (
                  <Check className="w-2 h-2 text-[#C7C0B1]" />
                )}
              </DropdownMenuItem>
              {idx < runes.length - 1 && (
                <DropdownMenuSeparator className="bg-[#BCAC88] h-0.5" />
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
