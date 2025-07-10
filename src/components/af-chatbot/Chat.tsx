"use client";
import { useState, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm FitMate 👋\n\nAsk me anything about Anytime Fitness — locations, billing, gym hours — or general fitness guidance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      const assistantMsg = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded">
            <strong>{msg.role === "user" ? "You" : "FitMate"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Ask FitMate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
