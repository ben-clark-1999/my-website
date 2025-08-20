export default function FocusFlowPage() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">FocusFlow</h1>
        <p className="mb-6 text-gray-600">
          An ambient sound mixer built with Electron + React. Layer rain, fire, wind, café, bird,
          thunder, river, ocean and night sounds with per-track volume control, crossfade, and presets.
        </p>
  
        {/* Demo video (put demo.mp4 into /public/projects/focusflow/demo.mp4) */}
        <div className="mb-6 rounded-xl overflow-hidden shadow">
          <video src="/projects/focusflow/demo.mp4" controls playsInline />
        </div>
  
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/<your-username>/focusflow/releases/latest"
            target="_blank"
            className="px-4 py-2 rounded bg-purple-600 text-white font-semibold"
          >
            Download App
          </a>
          <a
            href="https://github.com/<your-username>/focusflow"
            target="_blank"
            className="px-4 py-2 rounded border border-purple-600 text-purple-600 font-semibold"
          >
            Source Code
          </a>
        </div>
      </main>
    );
  }
  