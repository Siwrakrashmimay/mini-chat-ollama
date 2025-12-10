import { config } from "../config/env";
import type { Role } from "../models/Message";

type ConversationItem = {
  role: Role;
  content: string;
};

type OllamaMessage = {
  role: "user" | "assistant";
  content: string;
};

declare const fetch: (input: any, init?: any) => Promise<any>;

export async function chatWithOllama(
  history: ConversationItem[]
): Promise<string> {
  const messages: OllamaMessage[] = history.map((m) => ({
    role: m.role === "ai" ? "assistant" : "user",
    content: m.content,
  }));

  try {
    const response = await fetch(`${config.ollamaBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.ollamaModel,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      let text = "";
      try {
        text = await response.text();
      } catch {
        // ignore
      }
      console.error("Ollama error:", text);
      throw new Error("LLM backend error");
    }

    const data = await response.json();
    const content: string =
      data?.message?.content || "Sorry, I couldn't generate a response.";
    return content;
  } catch (err) {
    console.error("Error calling Ollama:", err);
    throw new Error("Failed to reach Ollama. Is it running?");
  }
}
