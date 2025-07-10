import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Benjamin Clark</h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        Welcome to my portfolio. I'm a software developer passionate about AI, automation, and real-world problem solving.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <ul className="space-y-3">
        <li>
          <Link
            href="/projects/af-chatbot"
            className="text-blue-600 hover:underline text-lg"
          >
            👉 AF Chatbot – Anytime Fitness Assistant
          </Link>
        </li>
        {/* Add more projects here later */}
      </ul>
    </main>
  );
}
