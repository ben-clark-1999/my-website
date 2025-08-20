// src/components/focusflow/ui/SoundCard.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { TrackMeta, TrackState } from "../shared/types";
import { ICONS } from "./icons";

type Props = {
  meta: TrackMeta;
  state: TrackState;
  onToggle: (on: boolean) => void;
  onVolume: (v: number) => void;
  getRemaining: () => number | null;
};

export default function SoundCard({ meta, state, onToggle, onVolume, getRemaining }: Props) {
  const [, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const iv = setInterval(() => setRemaining(getRemaining()), 600);
    return () => clearInterval(iv);
  }, [getRemaining]);

  const img = ICONS[meta.id as keyof typeof ICONS];

  const supportsMask = useMemo(() => {
    try {
      return (
        CSS.supports("mask-image", 'url("")') ||
        CSS.supports("-webkit-mask-image", 'url("")')
      );
    } catch {
      return false;
    }
  }, []);

  return (
    <section
      className={`card track-card ${state.enabled ? "is-on" : ""}`}
      tabIndex={0}
      role="switch"
      aria-checked={state.enabled}
      aria-label={`${meta.name} sound`}
      onClick={(e) => {
        // don’t toggle if clicking the slider
        if ((e.target as HTMLElement).closest('input[type="range"]')) return;
        onToggle(!state.enabled);
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle(!state.enabled);
        }
      }}
    >
      <header className="card__header track-hero">
        {supportsMask ? (
          // Preferred: paint the PNG silhouette with currentColor
          <span
            className="track-icon-img"
            style={{
              WebkitMaskImage: `url(${img})`,
              maskImage: `url(${img})`,
              // optional: set an explicit size if your CSS doesn’t
              width: 28,
              height: 28,
            }}
            aria-hidden="true"
          />
        ) : (
          // Fallback: show the PNG and tint it
          <img
            src={img}
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            style={{
              objectFit: "contain",
              filter: "brightness(0) invert(1)", // nice on dark; adjust in light theme if needed
            }}
          />
        )}

        <h2 className="card__title">{meta.name}</h2>
      </header>

      <label className="ff-slider">
        <span className="slider__label">Volume</span>
        <input
          className="ff-range"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={state.volume}
          style={{ ["--val" as any]: state.volume }}
          onInput={(e) => onVolume(Number((e.target as HTMLInputElement).value))}
          onChange={(e) => onVolume(Number((e.target as HTMLInputElement).value))}
          aria-label={`${meta.name} volume`}
        />
      </label>

      <footer className="card__footer">
        <span className="kbd">Key {meta.key}</span>
        <span />
      </footer>
    </section>
  );
}
