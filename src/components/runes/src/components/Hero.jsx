"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [backgroundSize, setBackgroundSize] = useState("70%");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1240) {
        setBackgroundSize("cover");
      } else {
        setBackgroundSize("73%");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`relative w-full h-screen mx-auto`}
      style={{
        background: "linear-gradient(to right, #1a1a1a, #2d2d2d)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundSize: "30px 30px",
        }}
      />
      {/* Japanese-inspired gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle 50%, #1D1D1D, #f7d1d1)", // Ivory to soft sakura pink
          backgroundSize: backgroundSize,
          backgroundPosition: "center",
        }}
      />

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#D13E3E" }}
          />
          <div
            className="w-1 sm:h-80 h-40"
            style={{
              background: `linear-gradient(to bottom, #D13E3E 85%, #F1A7B6)`,
            }}
          />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-[#EAEAEA]`}>
            Hi, I'm <span style={{ color: "#D13E3E" }}>Paul!</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-[#EAEAEA]`}>
            Glad you're here!
            <br className="sm:block hidden" />
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div
            className="w-[35px] h-[64px] rounded-3xl border-4 flex justify-center items-start p-2"
            style={{ borderColor: "white" }}
          >
            <motion.div
              animate={{
                y: [0, 26, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full mb-1"
              style={{ backgroundColor: "#D13E3E" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
