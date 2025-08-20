"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import meditatingBrain from "@/assets/icons/MeditatingBrain.json";

type Props = { onStart: () => void };

export default function Hero({ onStart }: Props) {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setShouldAnimate(!prefersReduced);
    }
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="hero w-full mt-0 mb-0 py-0"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Title, tagline, buttons */}
        <div className="flex-1">
          <h1 id="hero-title" className="m-0 text-5xl md:text-6xl font-extrabold leading-tight">
            FocusFlow
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Create immersive soundscapes for study, sleep, and deep focus.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onStart}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Start mixing
            </button>
            
          </div>
        </div>

        {/* Right: Brain */}
        <div className="shrink-0 md:ml-8" aria-hidden="true" style={{ width: 120, height: 120 }}>
          <Lottie
            animationData={meditatingBrain}
            autoplay={shouldAnimate}
            loop={shouldAnimate}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
