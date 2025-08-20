// src/app/api/chat/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Assistants API requires Node (not Edge)

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ reply: "Please enter a message." }, { status: 400 });
    }

    const assistantId = process.env.ASSISTANT_ID;
    if (!assistantId) {
      return NextResponse.json({ reply: "ASSISTANT_ID not set." }, { status: 500 });
    }

    const thread = await client.beta.threads.create();

    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    let run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // simple polling loop
    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((r) => setTimeout(r, 500));
      run = await client.beta.threads.runs.retrieve(run.id, { thread_id: thread.id });
    }

    const messages = await client.beta.threads.messages.list(thread.id, { order: "asc" });
    const lastAssistant = messages.data.filter((m: any) => m.role === "assistant").at(-1);
    let reply = "No reply.";

    if (lastAssistant && lastAssistant.content?.[0]?.type === "text") {
      const c: any = lastAssistant.content[0];
      reply = (c.text?.value as string)?.replace(/【[^】]*】/g, "").trim() || reply;
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("❌ Chat route error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong processing your request." },
      { status: 500 }
    );
  }
}
