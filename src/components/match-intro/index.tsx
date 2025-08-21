import { lockInAtom } from "@/atoms/champAtom";
import CountdownFrame from "./CountdownFrame";
import { useAtom } from "jotai";

function Banner({isLockedIn}: {isLockedIn:boolean}){
  return (
    <h1 className="uppercase font-bold text-4xl text-center absolute top-5 left-1/2 -translate-x-1/2 z-10 match-intro-item">
      {isLockedIn ? "Check out my art/pictures!" : "Ready to code and carry!"}
    </h1>
  );
}


export default function MatchIntro() {
  const [isLockedIn] = useAtom(lockInAtom);
  return (
    <div className="flex flex-col mi justify-center text-[#ECE4D0] w-full">
      <Banner isLockedIn={isLockedIn}></Banner>

      <CountdownFrame key={isLockedIn ? "locked" : "unlocked"} />
    </div>
  );
}
