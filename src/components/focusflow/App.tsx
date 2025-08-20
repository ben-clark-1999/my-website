"use client";
import "./ui/styles.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SoundCard from "./ui/SoundCard";
import MasterControls from "./ui/MasterControls";
import PresetsBar from "./ui/PresetsBar";
import StatusBar from "./ui/StatusBar";
import AmbientDecor from "./ui/AmbientDecor";
import Hero from "./ui/Hero";
import { TRACKS } from "./audio/tracks";

/* ---------- local types (simplified) ---------- */
type TrackState = { id: string; enabled: boolean; volume: number };
type Preset = {
  name: string;
  masterVolume: number;
  crossfadeSec: number;
  tracks: TrackState[];
};
type AppState = {
  masterVolume: number;
  crossfadeSec: number;
  lastSaved: string | null;
  tracks: TrackState[];
  presets: Preset[];
};

/* ---------- helpers ---------- */
function remapId(id: string) {
  if (id === "brown" || id === "birds") return "bird";
  return id;
}

/** Make a preset from a { id: volume } map; anything missing is off at default volume */
function makePreset(
  name: string,
  vols: Record<string, number>,
  master: number = 0.8,
  crossfade: number = 0.8
): Preset {
  const tracks: TrackState[] = TRACKS.map(t => {
    const want = vols[remapId(t.id)];
    return {
      id: t.id,
      enabled: typeof want === "number",
      volume: typeof want === "number" ? want : t.defaultVolume,
    };
  });
  return { name, masterVolume: master, crossfadeSec: crossfade, tracks };
}

/* ---------- built-in presets (shown when none saved) ---------- */
const BUILTIN_PRESETS: Preset[] = [
  makePreset("Rainy Focus", { rain: 0.7, wind: 0.25 }),
  makePreset("Café Study", { cafe: 0.65, rain: 0.25 }),
  makePreset("Forest Birds", { bird: 0.6, wind: 0.25 }),
  makePreset("Campfire Night", { fire: 0.6, night: 0.35, wind: 0.2 }),
  makePreset("Ocean Breeze", { ocean: 0.6, wind: 0.3 }),
];

/* ---------- defaults ---------- */
const DEFAULT_STATE: AppState = {
  masterVolume: 0.8,
  crossfadeSec: 0.8,
  lastSaved: null,
  tracks: TRACKS.map((t) => ({
    id: t.id,
    enabled: false,
    volume: t.defaultVolume,
  })),
  presets: BUILTIN_PRESETS,
};

/* ---------- electron bridge (web: do-nothing stubs) ---------- */
declare global {
  interface Window {
    FocusFlowAPI?: {
      loadState?: () => Promise<AppState> | AppState;
      saveState?: (s: AppState) => Promise<void> | void;
      listLoopFiles?: () => Promise<string[]> | string[];
    };
  }
}

/* Serve from /public (your .wav are in the root of /public) */
const loopUrl = (fileName: string) => `/${fileName}`;

/* ---------- app ---------- */
export default function App() {
  // web-only mode; HTMLAudio
  const htmlAudioRef = useRef<Record<string, HTMLAudioElement>>({});
  const initializedRef = useRef(false);
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  type ThemeKey = "dark" | "neon-dark" | "light" | "light-warm";
  const [theme, setTheme] = useState<ThemeKey>("dark");
  const [cpu, setCpu] = useState(0);
  const didBindResume = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Prepare HTMLAudio
    const fallbackEls: Record<string, HTMLAudioElement> = {};
    for (const t of TRACKS) {
      const el = new Audio(loopUrl(t.fileName));
      el.loop = true;
      el.preload = "auto";
      el.volume = clamp01(DEFAULT_STATE.masterVolume * t.defaultVolume);
      fallbackEls[t.id] = el;
    }
    htmlAudioRef.current = fallbackEls;

    let cancelled = false;
    (async () => {
      const loaded = (await window.FocusFlowAPI?.loadState?.()) ?? DEFAULT_STATE;
      if (cancelled) return;

      const loadedTheme = (loaded as any).theme as ThemeKey;
      setTheme(
        loadedTheme === "dark" ||
          loadedTheme === "neon-dark" ||
          loadedTheme === "light" ||
          loadedTheme === "light-warm"
          ? loadedTheme
          : "dark"
      );

      // Normalize tracks & presets; if none saved, use built-ins
      const normalizedPresets =
        Array.isArray(loaded.presets) && loaded.presets.length
          ? loaded.presets.map((p) => ({
              ...p,
              tracks: p.tracks.map((tr) => ({ ...tr, id: remapId(tr.id) })),
            }))
          : BUILTIN_PRESETS;

      const cleared: AppState = {
        ...loaded,
        tracks: TRACKS.map((t) => {
          const prev = loaded.tracks?.find((x) => remapId(x.id) === t.id);
          return {
            id: t.id,
            enabled: false,
            volume: prev ? prev.volume : t.defaultVolume,
          };
        }),
        presets: normalizedPresets,
      };

      setState(cleared);

      // ensure all OFF
      Object.values(htmlAudioRef.current).forEach((a) => {
        try {
          a.pause();
          a.currentTime = 0;
        } catch {}
      });
    })();

    const iv = window.setInterval(() => setCpu((c) => (c + 7) % 100), 1000);
    return () => {
      window.clearInterval(iv);
      Object.values(htmlAudioRef.current).forEach((a) => {
        try {
          a.pause();
        } catch {}
      });
    };
  }, []);

  useEffect(() => {
    if (didBindResume.current) return;
    didBindResume.current = true;
    const resumeAll = () => {
      window.removeEventListener("pointerdown", resumeAll);
      window.removeEventListener("keydown", resumeAll);
    };
    window.addEventListener("pointerdown", resumeAll, { once: true });
    window.addEventListener("keydown", resumeAll, { once: true });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function commitTrackToAudio(id: string, enabled: boolean, volume: number) {
    const a = htmlAudioRef.current[id];
    if (!a) return;
    a.volume = clamp01(volume * state.masterVolume);
    if (enabled) a.play().catch(() => {});
    else {
      try {
        a.pause();
        a.currentTime = 0;
      } catch {}
    }
  }

  function setTrackState(id: string, enabled: boolean, volume: number) {
    setState((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t) =>
        t.id === id ? { ...t, enabled, volume } : t
      ),
    }));
    queueMicrotask(() => commitTrackToAudio(id, enabled, volume));
  }

  function toggleTrack(id: string) {
    let nextEnabled = false,
      vol = 0;
    setState((prev) => {
      const idx = prev.tracks.findIndex((t) => t.id === id);
      if (idx === -1) return prev;
      const cur = prev.tracks[idx];
      nextEnabled = !cur.enabled;
      vol = cur.volume;
      const copy = prev.tracks.slice();
      copy[idx] = { ...cur, enabled: nextEnabled };
      return { ...prev, tracks: copy };
    });
    queueMicrotask(() => commitTrackToAudio(id, nextEnabled, vol));
  }

  function setMasterVolume(v: number) {
    setState((prev) => ({ ...prev, masterVolume: v }));
    queueMicrotask(() => {
      for (const t of state.tracks) {
        const a = htmlAudioRef.current[t.id];
        if (a) a.volume = clamp01(t.volume * v);
      }
    });
  }

  function setCrossfade(v: number) {
    setState((prev) => ({ ...prev, crossfadeSec: v }));
  }

  function applyPreset(p: Preset) {
    const nextTracks: TrackState[] = TRACKS.map((t) => {
      const match = p.tracks.find((x) => remapId(x.id) === t.id);
      return {
        id: t.id,
        enabled: !!match?.enabled,
        volume:
          typeof match?.volume === "number" ? match.volume : t.defaultVolume,
      };
    });

    const next: AppState = {
      ...state,
      masterVolume: p.masterVolume,
      crossfadeSec: p.crossfadeSec,
      tracks: nextTracks,
    };

    setState(next);
    queueMicrotask(() => {
      for (const t of nextTracks) {
        const a = htmlAudioRef.current[t.id];
        if (a) a.volume = clamp01(t.volume * next.masterVolume);
      }
      for (const t of nextTracks)
        commitTrackToAudio(t.id, t.enabled, t.volume);
    });
  }

  function savePreset(name: string, overwrite: boolean) {
    setState((prev) => {
      const i = prev.presets.findIndex((p) => p.name === name);
      const snapshot: Preset = {
        name,
        masterVolume: prev.masterVolume,
        crossfadeSec: prev.crossfadeSec,
        tracks: prev.tracks.map((t) => ({ ...t })),
      };
      let arr = prev.presets.slice();
      if (i >= 0 && overwrite) arr[i] = snapshot;
      else if (i === -1) arr.push(snapshot);
      const next = {
        ...prev,
        presets: arr,
        lastSaved: new Date().toISOString(),
      };
      queueMicrotask(() => window.FocusFlowAPI?.saveState?.(next));
      return next;
    });
  }
  function loadPreset(name: string) {
    const p = state.presets.find((x) => x.name === name);
    if (p) applyPreset(p);
  }
  function deletePreset(name: string) {
    setState((prev) => ({
      ...prev,
      presets: prev.presets.filter((p) => p.name !== name),
    }));
  }
  function onPlayPauseAll() {
    const anyPlaying = Object.values(htmlAudioRef.current).some((a) => !a.paused);
    if (anyPlaying)
      Object.values(htmlAudioRef.current).forEach((a) => {
        try {
          a.pause();
        } catch {}
      });
    else
      state.tracks.forEach((t) => {
        if (t.enabled) htmlAudioRef.current[t.id]?.play().catch(() => {});
      });
  }
  function onStopAll() {
    Object.values(htmlAudioRef.current).forEach((a) => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch {}
    });
  }
  function onSaveSession() {
    const snap = { ...state, lastSaved: new Date().toISOString() };
    setState(snap);
    window.FocusFlowAPI?.saveState?.(snap);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const n = Number(e.key);
      if (n >= 1 && n <= TRACKS.length) toggleTrack(TRACKS[n - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const withState = useMemo(() => {
    const map = new Map(state.tracks.map<[string, TrackState]>((t) => [t.id, t]));
    return TRACKS.map((meta) => {
      const ts =
        map.get(meta.id) ?? { id: meta.id, enabled: false, volume: meta.defaultVolume };
      return { meta, ts };
    });
  }, [state.tracks]);

  const scrollToMixer = () => {
    const el = document.getElementById("mixer");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app">
      <AmbientDecor /> {/* decorative background mesh; low-cost, theme-aware :contentReference[oaicite:1]{index=1} */}
      <Hero onStart={scrollToMixer} /> {/* hero layout with brain on the right :contentReference[oaicite:2]{index=2} */}

      {/* Theme select (top-right) */}
      <div className="theme-select">
        <label htmlFor="theme" className="visually-hidden">Theme</label>
        <select
          id="theme"
          className="ff-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeKey)}
          aria-label="Theme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="neon-dark">Neon Dark</option>
          <option value="light-warm">Light – Warm</option>
        </select>
      </div>

      {/* MIXER */}
      <section id="mixer" className="mixer">
        <MasterControls
          masterVolume={state.masterVolume}
          crossfade={state.crossfadeSec}
          onMaster={setMasterVolume}
          onCrossfade={setCrossfade}
          onPlayPauseAll={onPlayPauseAll}
          onStopAll={onStopAll}
          onSave={onSaveSession}
        /> {/* :contentReference[oaicite:3]{index=3} */}

        <PresetsBar
          presets={state.presets}
          onSave={savePreset}
          onLoad={loadPreset}
          onDelete={deletePreset}
        /> {/* renders options from props.presets :contentReference[oaicite:4]{index=4} */}

        <main className="grid">
          {withState.map(({ meta, ts }) => (
            <SoundCard
              key={meta.id}
              meta={meta}
              state={ts}
              getRemaining={() => null}
              onToggle={(on) => setTrackState(ts.id, on, ts.volume)}
              onVolume={(v) => setTrackState(ts.id, ts.enabled, v)}
            />
          ))}
        </main>
      </section>

      <StatusBar cpu={cpu} lastSaved={state.lastSaved} /> {/* :contentReference[oaicite:5]{index=5} */}
    </div>
  );
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
