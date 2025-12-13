import { lockInAtom } from "@/atoms/champAtom";
import CountdownFrame from "./CountdownFrame";
import { useAtom } from "jotai";

function Banner({ isLockedIn }: { isLockedIn: boolean }) {
  return (
    <h1 className="uppercase font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center w-full px-2 sm:px-4 md:px-6 z-10 match-intro-item break-words mx-auto">
      {isLockedIn ? "Check out my art/pictures!" : "Ready to code and carry!"}
    </h1>
  );
}

export default function MatchIntro() {
  const [isLockedIn] = useAtom(lockInAtom);
  return (
    <div className="flex flex-col mi justify-center items-center text-[#ECE4D0] w-full">
      <Banner isLockedIn={isLockedIn}></Banner>

      <CountdownFrame key={isLockedIn ? "locked" : "unlocked"} />
    </div>
  );
}
