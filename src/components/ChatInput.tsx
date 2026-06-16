"use client";

import { FormEvent, useState } from "react";
import { Mic, Plus, SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  variant?: "landing" | "chat";
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Search here",
  variant = "landing",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setMessage("");
  };

  const isLanding = variant === "landing";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full items-center gap-3 rounded-2xl border border-card-border bg-white px-4 py-3 shadow-sm ${
        isLanding ? "max-w-2xl" : "max-w-3xl"
      }`}
    >
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-slate-100 hover:text-primary"
        aria-label="Add attachment"
      >
        <Plus className="h-5 w-5" />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted disabled:opacity-50"
      />

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Voice input"
        >
          <Mic className="h-5 w-5" />
        </button>
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
