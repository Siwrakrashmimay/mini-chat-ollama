import { Request, Response } from "express";
import {
  getMessagesBySession,
  clearMessagesBySession,
  createUserMessage,
  createAIMessage,
} from "../services/message.service";
import { chatWithOllama } from "../lib/ollamaClient";

const DEFAULT_SESSION_ID = "default";

export async function getMessagesHandler(req: Request, res: Response) {
  try {
    const sessionId =
      (req.query.sessionId as string | undefined) || DEFAULT_SESSION_ID;

    const messages = await getMessagesBySession(sessionId);
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

export async function clearMessagesHandler(req: Request, res: Response) {
  try {
    const sessionId =
      (req.query.sessionId as string | undefined) || DEFAULT_SESSION_ID;

    await clearMessagesBySession(sessionId);
    res.status(204).send();
  } catch (err) {
    console.error("Error clearing messages:", err);
    res.status(500).json({ error: "Failed to clear messages" });
  }
}

export async function postMessageHandler(req: Request, res: Response) {
  try {
    const { content, sessionId: rawSessionId } = req.body as {
      content?: string;
      sessionId?: string;
    };

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Content is required" });
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ error: "Max content length is 500 characters" });
    }

    const sessionId = rawSessionId || DEFAULT_SESSION_ID;

    const userMessage = await createUserMessage(content, sessionId);

    const history = await getMessagesBySession(sessionId);

    let aiContent: string;

    try {
      aiContent = await chatWithOllama(
        history.map((m) => ({
          role: m.role,
          content: m.content,
        }))
      );
    } catch (err: any) {
      if (err instanceof Error && err.message === "LLM backend error") {
        return res.status(502).json({ error: "LLM backend error" });
      }
      return res
        .status(502)
        .json({ error: "Failed to reach Ollama. Is it running?" });
    }

    const aiMessage = await createAIMessage(aiContent, sessionId);

    return res.status(201).json({
      userMessage,
      aiMessage,
    });
  } catch (err) {
    console.error("Error in POST /api/messages:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
