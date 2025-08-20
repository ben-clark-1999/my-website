// app/projects/af-chatbot/page.tsx
"use client";

import { useEffect } from "react";

export default function AFChatbotPage() {
  useEffect(() => {
    // Redirect straight to your Streamlit app
    window.location.replace(
      "https://af-chatbot-vcnigogbwyle6antnmcnxr.streamlit.app/"
    );
  }, []);

  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <p className="text-zinc-500">Opening the AF Chatbot…</p>
    </main>
  );
}
