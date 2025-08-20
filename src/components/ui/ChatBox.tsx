"use client";

export default function ChatBox() {
  return (
    <div className="w-full h-[800px]">
      <iframe
        src="https://af-chatbot-vcnigogbwyle6antnmcnxr.streamlit.app/?embed=true"
        width="100%"
        height="100%"
        style={{
          border: "none",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        allow="clipboard-write"
        // Helps avoid issues when Streamlit opens links inside the iframe
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
      />
    </div>
  );
}
