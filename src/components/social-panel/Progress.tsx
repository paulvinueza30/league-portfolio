// components/social/ProgressDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { progressButton } from "@/assets";

export default function ProgressDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <img
          src={progressButton}
          alt="progress icon"
          draggable={false}
          className="w-14 h-12"
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
        <DialogHeader>
          <DialogTitle className="text-[#CDBE91]">Progress</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-black">
          <p>This is where progress info will go.</p>
        </div>
        <DialogClose
          className="absolute top-1 right-0.5 rounded-4xl bg-[#1E272C] text-[#BBAE86] border-4 border-[#614B23] p-0.5"
          asChild
        >
          <X className="w-8 h-8 " />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function RiotProgressCard() {}
