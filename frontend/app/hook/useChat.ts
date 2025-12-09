"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Message } from "../types/chat";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const DEFAULT_SESSION_ID =
  process.env.NEXT_PUBLIC_DEFAULT_SESSION_ID || "default";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>("Ready");
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setStatus("Loading history...");
        const res = await fetch(
          `${API_BASE}/api/messages?sessionId=${encodeURIComponent(
            DEFAULT_SESSION_ID
          )}`
        );
        if (!res.ok) {
          throw new Error("Failed to load messages");
        }

        const data: Message[] = await res.json();
        setMessages(data);
        setStatus("Ready");
      } catch (err) {
        console.error(err);
        setError("Failed to load messages");
        setStatus("Error loading history");
      }
    };

    void loadMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (isLoading) return;

    setError(null);

    const trimmed = input.trim();
    if (!trimmed) return;

    if (trimmed.length > 500) {
      setError("Maximum message length is 500 characters.");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStatus("AI is thinking...");

    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: trimmed,
          sessionId: DEFAULT_SESSION_ID,
        }),
      });

      if (!res.ok) {
        let msg = "Failed to send message";
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      const data: { aiMessage: Message } = await res.json();

      setMessages((prev) => [...prev, data.aiMessage]);
      setStatus("Ready");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong");
      setStatus("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        void sendMessage();
      }
    }
  };

  const handleClear = async () => {
    setError(null);
    setIsLoading(true);
    setStatus("Clearing chat...");

    try {
      const res = await fetch(
        `${API_BASE}/api/messages?sessionId=${encodeURIComponent(
          DEFAULT_SESSION_ID
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok && res.status !== 204) {
        throw new Error("Failed to clear chat");
      }

      setMessages([]);
      setStatus("Ready");
    } catch (err) {
      console.error(err);
      setError("Failed to clear chat");
      setStatus("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    status,
    error,
    bottomRef,
    handleSubmit,
    handleKeyDown,
    handleClear,
  };
}
