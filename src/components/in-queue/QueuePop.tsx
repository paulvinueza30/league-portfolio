import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { queueBackground } from "@/assets/client";

import { acceptedAtom } from "@/atoms/queueAtom";
import { useAtom } from "jotai";

import { matchFoundSound, acceptSound, hoverSound } from "@/assets/sounds";
import { useAudio } from "@/context/AudioContext";

const matchAudio = new Audio(matchFoundSound);
const acceptedSound = new Audio(acceptSound);
const hoveredSound = new Audio(hoverSound);

// TODO: Figure out what to do for decline
export default function QueuePop() {
  const ringRef = useRef<SVGCircleElement>(null);
  const tracerRef = useRef<SVGCircleElement>(null);

  const [accepted] = useAtom(acceptedAtom);
  const [locallyAccepted, setLocalAccepted] = useState<boolean>(false);
  const { volume } = useAudio();
  useEffect(() => {
    if (!accepted) {
      matchAudio.currentTime = 0;
      matchAudio.volume = volume;
      matchAudio.play().catch((e) => console.warn("Playback error:", e));
    }
  }, [accepted]);

  useEffect(() => {
    const circle = ringRef.current;
    const tracer = tracerRef.current;

    if (circle && tracer) {
      const length = circle.getTotalLength();

      gsap.to(circle, {
        "--glow": 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.in",
        onUpdate: () => {
          const val = gsap.getProperty(circle, "--glow");
          circle.style.filter = `drop-shadow(0 0 40px rgba(77, 246, 249, ${val}))`;
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

      gsap.set(circle, { strokeDasharray: length, strokeDashoffset: 0 });
      gsap.set(tracer, {
        strokeDasharray: `10 ${length}`,
        strokeDashoffset: 0,
        strokeOpacity: 0,
      });

      tl.to({}, { duration: 2 })
        .to(tracer, { strokeOpacity: 0.85, duration: 0.5 })
        .to(
          [tracer, circle],
          {
            strokeDashoffset: -length,
            duration: 13,
            ease: "none",
          },
          "<"
        )
        .to(tracer, { strokeOpacity: 0, duration: 0.5 });

      if (locallyAccepted) tl.kill();
      return () => {
        tl.kill();
      };
    }
  }, [accepted, locallyAccepted]);
  return (
    <div className="select-none fixed inset-0 flex items-center justify-center bg-none#9E916B bg-opacity-100 z-50 backdrop-blur-2xl bg-white/5">
      <div className="border-3 border-[#dec375] rounded-full p-6 flex justify-center justify-items-center relative">
        <div className="relative w-[30rem] h-[30rem] flex items-center justify-center ">
          <div className="absolute inset-[2em] rounded-full border-5 border-[#C7B27F] pointer-events-none " />
          <div className="absolute inset-[0.7em] rounded-full border-5 border-[#C7B27F] pointer-events-none bg-transparent" />
          <svg className="absolute w-full h-full rotate-[-245deg] pointer-events-none">
            <defs>
              <linearGradient
                id="customGradientRing"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
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
              >
                <stop offset="100%" stopColor="#4DF6F9" />
              </linearGradient>
            </defs>

            {/* Blue gradient ring*/}
            <circle
              ref={ringRef}
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="url(#customGradientRing)"
              strokeWidth="20"
              strokeLinecap="butt"
              className="drop-shadow-[0_0_40px_#4DF6F9]"
              style={{
                filter:
                  "blur(0.5px) drop-shadow(0 0 15px white) drop-shadow(0 0 30px rgba(77,246,249,0.7)) drop-shadow(0 0 50px rgba(77,246,249,0.3))",
              }}
            />

            {/* White tracer beam */}

            <circle
              ref={tracerRef}
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="url(#tracerGradient)"
              strokeWidth="20"
              strokeLinecap="butt"
              strokeOpacity="0.85"
              style={{
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

          <div className="relative w-[26rem] h-[26rem] rounded-full overflow-hidden border-5 border-[#C7B27F]">
            <div
              className="w-full h-full flex flex-col justify-center items-center text-center text-white"
              style={{
                backgroundImage: `url(${queueBackground})`,
                backgroundSize: "120% 120%",
              }}
            >
              <img
                src="/league-p.png"
                alt="logo"
                className="w-1/4 h-1/4 mb-2"
              />
              <h2 className="text-3xl uppercase font-bold">
                {locallyAccepted ? "Summoning Portfolio" : "Portfolio Found"}
              </h2>
              <p className="text-sm">Paul's Rift - Portfolio Review - 1v1</p>
            </div>
          </div>
          <div className="absolute bottom-2">
            <AcceptButton
              locallyAccepted={locallyAccepted}
              setLocalAccepted={setLocalAccepted}
            />
          </div>
        </div>
        <div className="absolute bottom-4 translate-y-full flex justify-center w-full  ">
          {" "}
          {!locallyAccepted && <DeclineButton />}
        </div>
      </div>
    </div>
  );
}
const hoverCooldown = 300;
interface AcceptButtonProps {
  locallyAccepted: boolean;
  setLocalAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}

function AcceptButton({
  locallyAccepted,
  setLocalAccepted,
}: AcceptButtonProps) {
  const [accepted, setAccepted] = useAtom(acceptedAtom);
  const lastHoverTimeRef = useRef(0);
  const { volume } = useAudio();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleHover() {
    if (accepted) return;
    const now = Date.now();
    if (now - lastHoverTimeRef.current < hoverCooldown) return;
    lastHoverTimeRef.current = now;
    hoveredSound.currentTime = 0;
    hoveredSound.volume = volume;
    hoveredSound.play();
  }

  function handleClick() {
    if (accepted) return;
    matchAudio.pause();
    acceptedSound.currentTime = 0.2;
    acceptedSound.volume = volume;
    acceptedSound.play();
    setLocalAccepted(true);
    timeoutRef.current = setTimeout(() => {
      setAccepted(true);
    }, 1600);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center select-none">
      <svg
        viewBox="-2 0 5.5 1.5"
        className={`transition-transform duration-150 w-[20em] h-[3.5em] ${
          !locallyAccepted && "hover:scale-105 active:scale-95"
        }`}
        style={{
          cursor: !locallyAccepted ? "pointer" : "not-allowed",
          background: "transparent",
        }}
        onClick={handleClick}
        onMouseEnter={handleHover}
      >
        <path
          d="M 0 0 L 2 0 L 2.5 1 Q 0.9 2 -1.5 1 L -1 0 Z"
          transform="scale(1.4, .95)"
          fill={!locallyAccepted ? "#1F252C" : "#666666"}
          stroke={!locallyAccepted ? "#43BFBC" : "none"}
          strokeWidth="0.1"
        />
        <text
          x="0.75"
          y="0.75"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={!locallyAccepted ? "#ffffff" : "#999999"}
          fontWeight="bold"
          fontSize="0.45"
          className="text-center uppercase"
        >
          Accept!
        </text>
      </svg>
    </div>
  );
}

function DeclineButton() {
  const lastHoverTimeRef = useRef(0);

  function handleHover() {
    const now = Date.now();
    if (now - lastHoverTimeRef.current < hoverCooldown) return;

    lastHoverTimeRef.current = now;
    hoveredSound.currentTime = 0;
    hoveredSound.play();
  }
  return (
    <button
      className="relative text-[#B9AC89] uppercase w-[7.5em] h-[2.1em] font-bold border-2 border-[#C0A76F] bg-[#192128] transition duration-150
    before:absolute before:inset-0 before:border-[1.5px] before:border-[#F1E2B8] before:opacity-0 before:scale-105 before:rounded-sm before:transition
    hover:before:opacity-100 hover:before:shadow-[0_0_15px_#F1E2B8] hover:text-[#fefae0] hover:border-[#F1E2B8] hover:bg-[#2B3139]"
      onMouseEnter={handleHover}
    >
      Decline
    </button>
  );
}
