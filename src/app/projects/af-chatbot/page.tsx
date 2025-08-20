import ChatBox from "@/components/ui/ChatBox";

export default function AFChatbotPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-3">AF Chatbot</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        A conversational assistant designed for Anytime Fitness clubs…
      </p>

      <a
        href="https://share.streamlit.io/<your-user>/<your-app>" // your working Streamlit URL
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md bg-gradient-to-br from-purple-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow hover:opacity-90"
      >
        🚀 Open the AF Chatbot
      </a>

      <p className="mt-4 text-sm text-zinc-500">
        (Embedding is blocked by the host’s security policy, so it opens in a new tab.)
      </p>
    </main>
  );
}

