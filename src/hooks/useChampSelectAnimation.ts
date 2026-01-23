import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { useSetAtom } from "jotai";
import { gsapAtom } from "@/atoms/gsapAtom";

gsap.registerPlugin(useGSAP);

export function useChampSelectAnimation(skipAnimationsAndQueue: boolean) {
  const setAnimationComplete = useSetAtom(gsapAtom);

  useGSAP(() => {
    if (skipAnimationsAndQueue) {
      gsap.set(".bg-picture", { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
      gsap.set(".match-intro-item", { y: 0, opacity: 1 });
      gsap.set(".player-section", { x: "0vw", opacity: 1 });
      gsap.set(".bottom-row-item", { y: 0, opacity: 1 });
      gsap.set(".hero-section", { opacity: 1 });
      gsap.set(".hextech-circle", { rotation: 0, opacity: 1 });
      setAnimationComplete(true);
      return;
    }

    // Skip animations on small screens (mobile)
    const isMobile = window.innerWidth < 768; // md breakpoint

    if (isMobile) {
      // Skip animations, just set complete immediately
      setAnimationComplete(true);
      return;
    }

    const tl = gsap.timeline({
      duration: 0.8,
      onComplete: () => {
        setAnimationComplete(true);
      },
    });
    tl.from(".bg-picture", {
      opacity: 0.9,
      scale: 1.1,
      y: -50,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "sine.inOut",
    })
      .from(
        ".match-intro-item",
        {
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power1.inOut",
        },
        ">"
      )
      .from(
        ".player-section",
        {
          x: "-25vw",
          opacity: 0.5,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      )
      .from(
        ".bottom-row-item",
        {
          y: "-2vh",
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
          stagger: 0.4,
        },
        "<"
      )
      .from(
        ".hero-section",
        {
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
        },
        ">"
      )
      .from(
        ".hextech-circle",
        {
          rotation: 480,
          opacity: 0,
          duration: 0.8,
          transformOrigin: "center 50%",
          ease: "expo.in",
        },
        "<"
      );
  }, [skipAnimationsAndQueue]);
}
