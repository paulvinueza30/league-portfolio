import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Scene from "@/components/rift-section";

import { difficulty, noBgDevRole } from "@/assets/role/";
import { meh } from "@/assets/role/";

function InfoBox(img: string, primary: string, secondary: string) {
  return (
    <div className="border-2 border-[#C8AA6E] flex justify-center basis-1/2 p-2">
      <div className="w-full h-full bg-[#0A0E1E] flex flex-col justify-around items-center text-white text-[10px] uppercase ">
        <img className="w-12 h-12" src={img} alt={"pic of " + primary} />
        <span>{primary}</span>
        <span className="text-[#AE9563]">{secondary}</span>
      </div>
    </div>
  );
}

// TODO: Make Champ portrait

export function LoreModal() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-none md:min-w-[450px] bg-black"
    >
      <ResizablePanel
        defaultSize={70}
        style={{
          backgroundImage: `url('${meh}')`,
          backgroundSize: "130% 100%",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex h-full flex-col items-start justify-center gap-4 mx-4">
          <h4 className="text-[#C8AA6E] text-2xl">The Self-Taught Architect</h4>
          <h3 className="text-4xl text-white">ポール</h3>
          <p className="text-white leading-relaxed">
            Forged in the labs of UCF and sharpened in late-night sprints, Paul
            is a full-stack engineer who sees systems like blueprints. He taught
            himself Go to build a no-code automation engine from scratch, led
            teams through React-heavy frontends, and wrangled translation models
            for NATO projects. From academia to production, he brings that rare
            mix of technical range and grounded curiosity. Whether he’s
            debugging at 2AM, rolling in jiu-jitsu class, dancing bachata, or
            laughing at the latest Fireship video, Paul builds like the future
            depends on it—because for him, it does. Also: ask him about learning
            Japanese.
          </p>
          <div className="flex flex-row gap-4 w-1/2 h-1/5 mt-4">
            {InfoBox(noBgDevRole, "Role", "Developer")}
            {InfoBox(difficulty, "Difficulty", "Hard")}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle disabled={true} />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <Scene />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
