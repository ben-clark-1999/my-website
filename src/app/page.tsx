"use client";
import { motion } from "framer-motion";
import VoiceAnimation from "@/components/ui/VoiceAnimation";
import Link from "next/link";

const projects = [
  {
    title: "AF Chatbot – Anytime Fitness Assistant",
    href: "https://af-chatbot-vcnigogbwyle6antnmcnxr.streamlit.app/",
    description: "Conversational AI assistant built with OpenAI, Streamlit & Next.js.",
    emoji: "🤖",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-[#0c0c10] dark:via-[#0c0c10] dark:to-black px-4 py-24 sm:px-6 lg:px-8">

      {/* 🟣 Purple blob drifting diagonally */}
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[10%] top-[-120px] h-96 w-96 rounded-full bg-purple-400 blur-3xl dark:bg-purple-700 opacity-40"
      />

      {/* 🔵 Blue blob drifting diagonally */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 0.3 }}
        className="pointer-events-none absolute right-[-120px] top-[20%] h-96 w-96 rounded-full bg-blue-400 blur-3xl dark:bg-blue-600 opacity-40"
      />

      {/* Hero Section */}
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
          . I enjoy turning complex problems into elegant, user‑centric solutions.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-gradient-to-br from-purple-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition"
          >
            📄 View Resume
          </a>
          <a
            href="https://www.linkedin.com/in/benjamin-michael-clark/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-purple-600 px-5 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition"
          >
            🔗 LinkedIn
          </a>
        </div>
      </motion.header>

      {/* Projects */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="z-10 grid w-full max-w-4xl auto-rows-fr gap-8 sm:grid-cols-2 md:grid-cols-3"
      >
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.title}
            variants={{
              hidden: { opacity: 0, y: 100 },
              show: { opacity: 1, y: 0, rotateX: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
            className="rounded-2xl transition-all duration-500 hover:scale-[1.015] hover:rotate-[-1deg] border border-zinc-200 bg-white/60 p-6 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md"
            >
              <div className="relative h-24 w-24 flex items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-purple-500 opacity-20" />
                <VoiceAnimation className="relative z-10 h-20 w-20" />
              </div>
            </motion.div>

            <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              {proj.title}
            </h3>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{proj.description}</p>
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
      </motion.section>

      {/* Footer */}
      <footer className="z-10 mt-24 text-sm text-zinc-500 dark:text-zinc-600">
        © {new Date().getFullYear()} Benjamin Clark • Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
