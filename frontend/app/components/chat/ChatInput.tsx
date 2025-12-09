"use client";

import type {
  FormEvent,
  KeyboardEvent,
} from "react";

type ChatInputProps = {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  status: string;
  error: string | null;
};

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
  isLoading,
  status,
  error,
}: ChatInputProps) {
  const canSend = !isLoading && input.trim().length > 0;

  const statusColor =
    status.startsWith("Error") || error
      ? "#ef4444"
      : status.includes("thinking")
      ? "#f97316"
      : "#16a34a";

  return (
    <form
      onSubmit={onSubmit}
      style={{
        borderTop: "1px solid #e4e4e7",
        padding: "0.75rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          maxLength={500}
          placeholder="Type your message (max 500 characters)..."
          rows={2}
          style={{
            flex: 1,
            resize: "none",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid #d4d4d8",
            fontSize: "0.9rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={!canSend}
          style={{
            padding: "0.6rem 1.1rem",
            borderRadius: "999px",
            border: "none",
            background: canSend ? "#2563eb" : "#a1a1aa",
            color: "#ffffff",
            fontWeight: 500,
            fontSize: "0.9rem",
            cursor: canSend ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      <div
        style={{
          fontSize: "0.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#71717a",
        }}
      >
        <span>
          Status:{" "}
          <span
            style={{
              fontWeight: 500,
              color: statusColor,
            }}
          >
            {error ? "Error" : status}
          </span>
        </span>
        <span>{input.length}/500</span>
      </div>

      {error && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "#b91c1c",
            marginTop: "-0.25rem",
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
}
