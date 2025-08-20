"use client";

type Props = {
  cpu?: number;
  lastSaved?: string | null;
};

export default function StatusBar(_props: Props) {
  return (
    <footer className="statusbar text-sm text-zinc-600 dark:text-zinc-400 py-3">
      <span className="font-medium">Tips:</span> Press 1–9 to toggle tracks
    </footer>
  );
}
