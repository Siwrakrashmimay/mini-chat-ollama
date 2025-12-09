"use client";

import type { RefObject } from "react";
import { Message } from "../../types/chat";

type MessageListProps = {
  messages: Message[];
  bottomRef: RefObject<HTMLDivElement>;
};

export function MessageList({ messages, bottomRef }: MessageListProps) {
  return (
    <section
      style={{
        flex: 1,
        padding: "1rem 1.25rem",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {messages.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#a1a1aa",
              fontSize: "0.9rem",
              margin: 0,
            }}
          >
            No messages yet. Say hi to the AI!
          </p>
        </div>
      ) : (
        <>
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={`${m._id ?? idx}-${m.createdAt ?? idx}`}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "12px",
                    background: isUser ? "#2563eb" : "#e4e4e7",
                    color: isUser ? "#ffffff" : "#18181b",
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      marginBottom: "0.1rem",
                      opacity: 0.9,
                    }}
                  >
                    {isUser ? "You" : "AI"}
                  </div>
                  <div>{m.content}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </>
      )}
    </section>
  );
}
