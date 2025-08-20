// src/components/focusflow/shared/types.ts

export type TrackMeta = {
	id: string;
	name: string;
	fileName: string;
	icon: string;
	defaultVolume: number;
	key: string;
};

export type TrackState = {
	id: string;
	enabled: boolean;
	volume: number;
};

export type Preset = {
	name: string;
	masterVolume: number;
	crossfadeSec: number;
	tracks: TrackState[];
};
