import { lockInAtom } from "@/atoms/champAtom";
import CountdownFrame from "./CountdownFrame";
import { useAtom } from "jotai";

function IntroBanner() {
  return (
    <h1 className="uppercase font-bold text-4xl text-center absolute top-5 left-1/2 -translate-x-1/2 z-10 match-intro-item">
      Ready to code and carry!
    </h1>
  );
}

export default function MatchIntro() {
  const [isLockedIn] = useAtom(lockInAtom);
  return (
    <div className="flex flex-col mi justify-center text-[#ECE4D0] w-full">
      {!isLockedIn && <IntroBanner />}

      <CountdownFrame key={isLockedIn ? "locked" : "unlocked"} />
    </div>
  );
}
