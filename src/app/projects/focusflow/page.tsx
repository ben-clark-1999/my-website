export const metadata = {
  title: "FocusFlow – Ambient Mixer",
  description:
    "An ambient sound mixer with rain, fire, wind, café, bird, thunder, river, ocean, and night sounds. Built in React.",
};

import ClientFocusFlow from "./ClientFocusFlow";

export default function FocusFlowPage() {
  return (
    // Lock the page to one viewport; no window scrolling
    <main className="h-dvh overflow-hidden">
      {/* If content ever exceeds the viewport, only this container scrolls */}
      <div className="h-full overflow-y-auto">
        <section className="max-w-5xl mx-auto w-full px-4 py-4">
          {/* Minimal spacing at the top */}
          <h1 className="text-4xl font-bold mb-2">FocusFlow</h1>
          <p className="mb-4 text-gray-600 text-lg">
            FocusFlow is an ambient sound mixer built with React. Layer rain, fire, wind, café,
            bird, thunder, river, ocean, and night sounds with per-track volume control,
            crossfade, and presets.
          </p>

          {/* Live demo (no outer extra margins) */}
          <div id="mixer" className="rounded-xl">
            <ClientFocusFlow />
          </div>

          {/* Links (small spacing) */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://github.com/<your-username>/focusflow/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Download App
            </a>
            <a
              href="https://github.com/<your-username>/focusflow"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 transition"
            >
              Source Code
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
