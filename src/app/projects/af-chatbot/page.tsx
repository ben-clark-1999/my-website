import ChatBox from "@/components/ui/ChatBox";

export default function AFChatbotPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">AF Chatbot</h1>
      <p className="mb-6 text-gray-600">
        A conversational assistant designed for Anytime Fitness clubs, helping members get fast, friendly, accurate answers to location-specific questions — including billing, hours, memberships, and more.
      </p>

      <ChatBox />
    </main>
  );
}
