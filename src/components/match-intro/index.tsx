import { chevLeft, chevRight } from "@/assets/intro-banner";
import { gsapAtom } from "@/atoms/gsapAtom";
import { useAtom } from "jotai";

import { useState, useEffect } from "react";

function Countdown() {
  const [timer, setTimer] = useState<number>(30);
  const [isAnimationComplete] = useAtom(gsapAtom);

  useEffect(() => {
    if (!isAnimationComplete) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        }
        clearInterval(intervalId);
        return prevTimer;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isAnimationComplete]);
  return (
    timer > 0 && (
      <h1 className="match-intro-item font-bold text-6xl -my-6 mx-2">
        {timer}
      </h1>
    )
  );
}
function BlueGlowy() {
  return (
    <div className="h-2 w-full animated-background bg-gradient-to-r from-[#5CC2CC] via-[#0B87A0] to-[#065A83] mx-2" />
  );
}

export default function MatchIntro() {
  return (
    <div className="flex flex-col justify-center text-[#ECE4D0] w-full">
      <h1 className="uppercase font-bold text-4xl text-center absolute top-5 left-1/2 -translate-x-1/2 z-10 match-intro-item">
        Ready to code and carry!
      </h1>

      <div className="flex justify-between items-end match-intro-item">
        <img className="w-70 h-15" src={chevLeft} />
        <BlueGlowy />
        <Countdown />
        <BlueGlowy />

        <img className="w-70 h-15" src={chevRight} />
      </div>
    </div>
  );
}
