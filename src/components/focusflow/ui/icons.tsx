// src/components/focusflow/ui/icons.tsx
import bird    from "@/assets/icons/bird.png";
import cafe    from "@/assets/icons/cafe.png";
import fire    from "@/assets/icons/fire.png";
import night   from "@/assets/icons/night.png";
import ocean   from "@/assets/icons/ocean.png";
import rain    from "@/assets/icons/rain.png";
import river   from "@/assets/icons/river.png";
import thunder from "@/assets/icons/thunder.png";
import wind    from "@/assets/icons/wind.png";

export type IconId =
  | "rain" | "fire" | "wind" | "cafe" | "bird"
  | "thunder" | "river" | "ocean" | "night";

export const ICONS: Record<IconId, string> = {
  rain:    rain.src,
  fire:    fire.src,
  wind:    wind.src,
  cafe:    cafe.src,
  bird:    bird.src,
  thunder: thunder.src,
  river:   river.src,
  ocean:   ocean.src,
  night:   night.src,
};