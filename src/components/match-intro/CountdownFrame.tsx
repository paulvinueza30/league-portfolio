import { chevLeft, chevRight } from "@/assets/intro-banner";
import { gsapAtom } from "@/atoms/gsapAtom";
import { atom, useAtom } from "jotai";

import { useEffect, useRef } from "react";

export const countdownStart = 30;
export const countdownAtom = atom<number>(countdownStart);
import gsap from "gsap";

import { countdownSound } from "@/assets/sounds";
import { useAudio } from "@/context/AudioContext";

function Countdown() {
  const [timer, setTimer] = useAtom(countdownAtom);
  const [isAnimationComplete] = useAtom(gsapAtom);
  const countdownFx = new Audio(countdownSound);
  const { volume } = useAudio();
  countdownFx.volume = volume;

  useEffect(() => {
    setTimer(countdownStart);
  }, []);
  useEffect(() => {
    if (!isAnimationComplete) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 0) {
          clearInterval(intervalId);
          return prevTimer;
        }
        if (prevTimer < 12) {
          countdownFx.currentTime = 0;
          countdownFx.play();
        }
        if (prevTimer < 2) {
          countdownFx.pause();
        }
        return prevTimer - 1;
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
interface BlueGlowyProps {
  direction: string;
}
function BlueGlowy({ direction }: BlueGlowyProps) {
  const barRef = useRef<SVGLineElement>(null);
  const tracerRef = useRef<SVGLineElement>(null);
  const [isAnimationComplete] = useAtom(gsapAtom);
  useEffect(() => {
    if (!isAnimationComplete) return;
    const bar = barRef.current;
    const tracer = tracerRef.current;

    if (bar && tracer) {
      const length = bar.getTotalLength();

      gsap.to(bar, {
        "--glow": 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.in",
        onUpdate: () => {
          const val = gsap.getProperty(bar, "--glow");
          bar.style.filter = `drop-shadow(0 0 40px rgba(77, 246, 249, ${val}))`;
        },
      });

      const stop1 = document.getElementById("stop1");
      const stop2 = document.getElementById("stop2");
      const stop3 = document.getElementById("stop3");
      if (stop1 && stop2 && stop3) {
        gsap.to([stop1, stop2, stop3], {
          stopColor: "#2ACAD4",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      const tl = gsap.timeline();

      gsap.set(bar, { strokeDasharray: length, strokeDashoffset: 0 });
      gsap.set(tracer, {
        strokeDasharray: `10 ${length}`,
        strokeDashoffset: 0,
        strokeOpacity: 0,
      });

      tl.to(tracer, { strokeOpacity: 0.85, duration: 0.5 })
        .to(
          [tracer, bar],
          {
            strokeDashoffset: -length,
            duration: countdownStart,
            ease: "none",
          },
          "<"
        )
        .to(tracer, { strokeOpacity: 0, duration: 0.5, ease: "power2.inOut" });

      return () => {
        tl.kill();
      };
    }
  }, [isAnimationComplete]);
  return (
    <svg
      className="w-full h-[0.5em] mx-2.5 pointer-events-none will-change-transform"
      viewBox="0 0 500 25"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="gradientBar"
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop id="stop1" offset="0%" stopColor="#1D7A8F" />
          <stop id="stop2" offset="50%" stopColor="#2ACAD4" />
          <stop id="stop3" offset="100%" stopColor="#1D7A8F" />
        </linearGradient>
        <linearGradient
          id="tracerGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="100%" stopColor="#4DF6F9" />
        </linearGradient>
      </defs>

      <line
        ref={barRef}
        y1="12.5"
        y2="12.5"
        x1={direction === "right" ? "500" : "0"}
        x2={direction === "right" ? "0" : "500"}
        stroke="url(#gradientBar)"
        strokeWidth="20"
        strokeLinecap="butt"
        className="drop-shadow-[0_0_40px_#4DF6F9]"
        style={{
          filter:
            "blur(0.5px) drop-shadow(0 0 15px white) drop-shadow(0 0 30px rgba(77,246,249,0.7)) drop-shadow(0 0 50px rgba(77,246,249,0.3))",
        }}
      />

      <line
        ref={tracerRef}
        y1="12.5"
        y2="12.5"
        x1={direction === "right" ? "500" : "0"}
        x2={direction === "right" ? "0" : "500"}
        stroke="url(#tracerGradient)"
        strokeWidth="20"
        strokeLinecap="butt"
        strokeOpacity="0.85"
        style={{
          transform: "translateZ(0)",
          willChange: "stroke-dashoffset",
          filter: `
      drop-shadow(0 0 2px #ffffff)
      drop-shadow(0 0 8px #ffffff)
      drop-shadow(0 0 24px #4DF6F9)
      drop-shadow(0 0 36px #2ACAD4)
      blur(0.5px)
    `,
          mixBlendMode: "screen",
        }}
      />
    </svg>
  );
}

export default function CountdownFrame() {
  return (
    <div className="flex justify-between items-end match-intro-item relative">
      <img className="w-70 h-15" src={chevLeft} />
      <BlueGlowy direction="left" />
      <Countdown />
      <BlueGlowy direction="right" />
      <img className="w-70 h-15" src={chevRight} />
    </div>
  );
}
