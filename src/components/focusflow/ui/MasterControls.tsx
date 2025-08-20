import React from 'react';

type Props = {
  masterVolume: number;
  crossfade: number;
  onMaster: (v: number) => void;
  onCrossfade: (v: number) => void;
  onPlayPauseAll: () => void;
  onStopAll: () => void;
  onSave: () => void;
};

export default function MasterControls({
  masterVolume,
  crossfade,
  onMaster,
  onCrossfade,
  onPlayPauseAll,
  onStopAll,   // still available if you want to render a button later
  onSave,      // still available if you want to render a button later
}: Props) {
  return (
    <section className="card controls-card">
      <header className="card__header">
        <h2 className="card__title">Controls</h2>
      </header>

      {/* Master volume */}
      <label className="ff-slider">
        <span className="slider__label">Master Volume</span>
        <input
          className="ff-range touch-manipulation"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={masterVolume}
          style={{ ['--val' as any]: masterVolume }}
          onInput={(e) => onMaster((e.target as HTMLInputElement).valueAsNumber)}
          onChange={(e) => onMaster((e.target as HTMLInputElement).valueAsNumber)}
          aria-label="Master volume"
        />
      </label>

      {/* Crossfade */}
      <label className="ff-slider">
        <span className="slider__label">Crossfade (seconds)</span>
        <input
          className="ff-range touch-manipulation"
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={crossfade}
          style={{ ['--val' as any]: crossfade / 2 }}
          onInput={(e) => onCrossfade((e.target as HTMLInputElement).valueAsNumber)}
          onChange={(e) => onCrossfade((e.target as HTMLInputElement).valueAsNumber)}
          aria-label="Crossfade duration"
        />
      </label>

      <div className="btn-row">
        <button className="btn" onClick={onPlayPauseAll}>
          Play / Pause All
        </button>
      </div>
    </section>
  );
}
