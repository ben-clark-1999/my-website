// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    const SYSTEM_PROMPT = fs.readFileSync(
      path.resolve("data/af_prompt.txt"),
      "utf-8"
    );
    const ASSISTANT_ID = fs.readFileSync(
      path.resolve("ids/af_assistant_id.txt"),
      "utf-8"
    ).trim();

    const thread = await client.beta.threads.create();

    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    let run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((res) => setTimeout(res, 400));
      run = await client.beta.threads.runs.retrieve(run.id, {
        thread_id: thread.id,
        });


    }

    const messages = await client.beta.threads.messages.list(thread.id, {
      order: "asc",
    });

    const reply =
      messages.data
        .filter((msg) => msg.role === "assistant")
        .at(-1)
        ?.content?.[0]?.type === "text"
        ? (messages.data
            .filter((msg) => msg.role === "assistant")
            .at(-1)
            ?.content?.[0] as any).text.value.replace(/【[^】]*】/g, "")
        : "No reply.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("❌ Chat route error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong processing your request." },
      { status: 500 }
    );
  }
}
