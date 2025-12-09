"use client";

import { MessageList } from "./components/chat/MessageList";
import { ChatInput } from "./components/chat/ChatInput";
import { useChat } from "./hook/useChat";

export default function HomePage() {
  const {
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
  } = useChat();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f5",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "600px",
          maxWidth: "100%",
          maxHeight: "100%",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <header
          style={{
            padding: "0.75rem 1.25rem",
            borderBottom: "1px solid #e4e4e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Mini Chat App with Ollama
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "#71717a",
              }}
            >
              Simple AI chat • Next.js + Express + MongoDB + Ollama
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading || messages.length === 0}
            style={{
              fontSize: "0.8rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              border: "1px solid #e4e4e7",
              background: "#fafafa",
              cursor:
                isLoading || messages.length === 0
                  ? "not-allowed"
                  : "pointer",
              opacity: isLoading || messages.length === 0 ? 0.5 : 1,
            }}
          >
            Clear chat
          </button>
        </header>

        <MessageList messages={messages} bottomRef={bottomRef} />

        <ChatInput
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          isLoading={isLoading}
          status={status}
          error={error}
        />
      </div>
    </main>
  );
}
