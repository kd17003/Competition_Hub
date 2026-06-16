"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GitCompare } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessageBubble } from "@/components/ChatMessage";
import { Sidebar } from "@/components/Sidebar";
import { UserAvatar } from "@/components/UserAvatar";
import { useCompare } from "@/context/CompareContext";
import { generateId } from "@/lib/utils";
import { ChatMessage, ChatResponse } from "@/types";

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { compareList } = useCompare();

  const hasConversation = messages.length > 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = (await response.json()) as ChatResponse;

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.reply,
        products: data.products,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end border-b border-card-border bg-white px-8 py-4">
          {compareList.length > 0 && (
            <Link
              href="/compare"
              className="mr-4 flex items-center gap-2 rounded-xl bg-primary-light px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <GitCompare className="h-3.5 w-3.5" />
              Compare ({compareList.length})
            </Link>
          )}
          <UserAvatar />
        </header>

        {!hasConversation ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 pb-24">
            <h1 className="text-4xl font-bold text-primary md:text-5xl">Hello Opura,</h1>
            <p className="mt-3 text-lg text-muted">How can I help you today?</p>
            <div className="mt-10 w-full max-w-2xl">
              <ChatInput
                onSend={handleSend}
                disabled={loading}
                placeholder="Search here"
                variant="landing"
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "Show me sneakers",
                "Best rated shoes",
                "Budget options under 4000",
                "Running shoes",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  disabled={loading}
                  className="rounded-full border border-card-border bg-white px-4 py-2 text-xs text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="mx-auto flex max-w-4xl flex-col gap-6">
                {messages.map((message) => (
                  <ChatMessageBubble key={message.id} message={message} />
                ))}
                {loading && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-primary-light" />
                    <div className="rounded-2xl border border-card-border bg-white px-4 py-3 text-sm text-muted shadow-sm">
                      Opura is thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            <div className="border-t border-card-border bg-white px-8 py-4">
              <div className="mx-auto max-w-3xl">
                <ChatInput
                  onSend={handleSend}
                  disabled={loading}
                  placeholder="Ask about products..."
                  variant="chat"
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
