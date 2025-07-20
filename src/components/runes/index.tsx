import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { runeButton } from "@/assets/buttons";

import { ChevronUp, ChevronDown, Check } from "lucide-react";

import { type ReactNode, useState } from "react";
export default function RuneSelection() {
  const [runeLabel, setRuneLabel] = useState<string>("Projects");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);
  console.log(activeModal);
  const runePages: Record<string, ReactNode> = {
    Projects: <h1>Projects</h1>,

    Experience: <h1>Experience</h1>,

    "About Me": <h1>About me</h1>,
  };
  const runes = Object.keys(runePages);
  return (
    <div className="flex justify-between items-center gap-3 ">
      <Button
        className="border-0 bg-transparent p-0 hover:bg-transparent outline-none select-none shadow-none transform active:scale-y-85 transition-transform"
        onClick={() => {
          setActiveModal(runePages[runeLabel]);
          setModalOpen(!modalOpen);
        }}
      >
        <img
          src={runeButton}
          alt="rune button"
          className="w-full h-full"
          draggable={false}
        />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-3 border-[#98A0A9] bg-[#2e373f] h-12 w-xs flex justify-between items-center px-3">
          <span className="text-lg text-[#BCAC88]">{runeLabel}</span>
          <div className="flex flex-col text-[#797B6F]">
            <ChevronUp className="w-2.5 h-2.5" />
            <ChevronDown className="w-2.5 h-2.5 -mt-0.5" />
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
