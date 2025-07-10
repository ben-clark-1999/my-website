"use client";
import { motion } from "framer-motion";
import Link from "next/link";
// import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AF Chatbot – Anytime Fitness Assistant",
    href: "https://af-chatbot-vcnigogbwyle6antnmcnxr.streamlit.app/",
    description:
      "Conversational AI assistant built with OpenAI, Streamlit & Next.js.",
    emoji: "🤖",
  },
  // 👉 Add more projects here as you build them!
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-[#0c0c10] dark:via-[#0c0c10] dark:to-black px-4 py-24 sm:px-6 lg:px-8">
      {/* --- Decorative blurred blobs --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="pointer-events-none absolute left-[10%] top-[-120px] h-96 w-96 rounded-full bg-purple-400 blur-3xl dark:bg-purple-700"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        className="pointer-events-none absolute right-[-120px] top-[20%] h-96 w-96 rounded-full bg-blue-400 blur-3xl dark:bg-blue-600"
      />

      {/* --- Hero Section --- */}
      <motion.header
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 mx-auto mb-16 max-w-3xl text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Benjamin Clark
          </span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Software developer specialising in&nbsp;
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
            AI, automation & meaningful digital products
          </span>
          . I enjoy turning complex problems into elegant, user‑centric
          solutions.
        </p>
      </motion.header>

      {/* --- Projects Grid --- */}
      <section className="z-10 grid w-full max-w-4xl auto-rows-fr gap-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-lg backdrop-blur-md hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-2xl">
              {proj.emoji}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              {proj.title}
            </h3>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              {proj.description}
            </p>
            <a
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded bg-gradient-to-br from-purple-600 to-indigo-600 px-4 py-2 text-center font-semibold text-white hover:opacity-90 transition"
            >
              View Project
            </a>

          </motion.div>
        ))}
      </section>

      {/* --- Footer --- */}
      <footer className="z-10 mt-24 text-sm text-zinc-500 dark:text-zinc-600">
        © {new Date().getFullYear()} Benjamin Clark • Built with Next.js &
        Tailwind CSS
      </footer>
    </main>
  );
}