"use client";

import Lottie from "lottie-react";
import animationData from "@/assets/animations/voice-assistant.json";

export default function VoiceAnimation({ className = "" }: { className?: string }) {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className={className}
    />
  );
}
