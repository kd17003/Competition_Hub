"use client";

import { OpuraIcon } from "./OpuraLogo";
import { ProductCarousel } from "./ProductCarousel";
import { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-lg rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="mt-1 shrink-0">
        <OpuraIcon className="h-8 w-8" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="max-w-3xl rounded-2xl rounded-bl-md border border-card-border bg-white px-4 py-3 text-sm text-foreground shadow-sm">
          {message.content}
        </div>
        {message.products && message.products.length > 0 && (
          <ProductCarousel products={message.products} />
        )}
      </div>
    </div>
  );
}
