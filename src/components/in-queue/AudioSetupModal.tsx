import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/context/AudioContext";

import { audioModalAtom } from "@/atoms/queueAtom";
import { useAtom } from "jotai";

export function AudioSetupModal() {
  const [configured, setConfigured] = useAtom(audioModalAtom);
  const { volume, setVolume } = useAudio();
  const sliderValue = [Math.round(volume * 100)];

  return (
    <Dialog open={!configured}>
      <DialogTitle className="sr-only">Audio Setup</DialogTitle>
      <DialogDescription className="sr-only">
        Calibrate your audio settings before entering the Rift
      </DialogDescription>
      <DialogContent className="max-w-[calc(100%-1rem)] sm:max-w-md select-none bg-[#0A0E13] border-2 border-[#C8AA6E] rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-[#1A1F24] to-[#0A0E13] rounded-lg">
          <div className="text-center space-y-2 sm:space-y-4 w-full">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#C8AA6E] tracking-wider uppercase break-words">
                Audio Configuration
              </h3>
              <p className="text-xs sm:text-sm text-[#A09B8C] leading-relaxed px-2">
                Calibrate your audio settings before entering the Rift
              </p>
            </div>
          </div>

          <div className="w-full space-y-3 sm:space-y-4 bg-[#1A1F24] p-4 sm:p-6 rounded border border-[#2C2F34]">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-[#C8AA6E] uppercase tracking-wide flex-shrink-0">
                Master Volume
              </span>
              <span className="text-base sm:text-lg font-bold text-[#F0E6D2] bg-[#0A0E13] px-2 sm:px-3 py-1 rounded border border-[#C8AA6E] flex-shrink-0">
                {sliderValue}%
              </span>
            </div>

            <Slider
              value={sliderValue}
              onValueChange={(val) => setVolume(val[0] / 100)}
              max={100}
              min={0}
              step={1}
              className="w-full 
                [&>span:first-child]:bg-[#2C2F34] 
                [&>span:first-child]:border 
                [&>span:first-child]:border-[#C8AA6E] 
                [&_[role=slider]]:bg-[#E0C674] 
                [&_[role=slider]]:border-2 
                [&_[role=slider]]:border-[#3B2F1E] 
                [&_[role=slider]]:shadow-lg"
            />
          </div>

          <Button
            onClick={() => setConfigured(true)}
            className="w-full bg-gradient-to-b from-[#D7BA7D] to-[#5E4B2D] hover:from-[#F0E6D2] hover:to-[#C8AA6E] text-[#0A0E13] font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded border-2 transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ⚔️ Ready for Battle ⚔️
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
