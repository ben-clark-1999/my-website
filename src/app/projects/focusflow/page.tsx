import dynamic from "next/dynamic";

export const metadata = {
  title: "FocusFlow – Ambient Mixer",
  description: "An ambient sound mixer with rain, fire, wind, café, bird, thunder, river, ocean, and night sounds. Built in React.",
};

// Import FocusFlowApp only on the client (no SSR because it uses Audio API / window)
const FocusFlowApp = dynamic(() => import("@/components/focusflow/App"), {
  ssr: false,
});

export default function FocusFlowPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">FocusFlow</h1>
      <p className="mb-8 text-gray-600 text-lg">
        FocusFlow is an ambient sound mixer built with React. Layer rain, fire, wind, café, bird,
        thunder, river, ocean, and night sounds with per-track volume control, crossfade, and presets.
      </p>

      {/* Live demo */}
      <div className="mb-10 rounded-xl border shadow">
        <FocusFlowApp />
      </div>

      {/* Optional demo video */}
      <div className="mb-10 rounded-xl overflow-hidden shadow">
        <video
          src="/projects/focusflow/demo.mp4"
          controls
          playsInline
          className="w-full"
        />
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
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
    </main>
  );
}
