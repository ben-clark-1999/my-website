"use client";

import Lottie from "lottie-react";
import defaultAnimation from "@/assets/animations/voice-assistant.json";

type VoiceAnimationProps = {
  /** Optional override animation JSON (e.g. MeditatingBrain.json) */
  animationData?: object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
};

export default function VoiceAnimation({
  animationData = defaultAnimation,
  className = "",
  loop = true,
  autoplay = true,
}: VoiceAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}
