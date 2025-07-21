import { chevLeft, chevRight } from "@/assets/intro-banner";

import { useState, useEffect } from "react";

function Countdown() {
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
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
  }, []);
  return timer > 0 && <h1 className="font-bold text-6xl -my-5">{timer}</h1>;
}
function BlueGlowy() {
  return (
    <div className="h-3 w-full animated-background bg-gradient-to-r from-[#5CC2CC] via-[#0B87A0] to-[#065A83] mx-2" />
  );
}

export default function MatchIntro() {
  return (
    <div className="flex flex-col justify-center text-[#ECE4D0] w-full">
      <h1 className="uppercase font-bold text-4xl">Ready to code and carry!</h1>
      <div className="flex justify-between items-end">
        <img className="w-50 h-30" src={chevLeft} />
        <BlueGlowy />
        <Countdown />
        <BlueGlowy />

        <img className="w-50 h-30" src={chevRight} />
      </div>
    </div>
  );
}
