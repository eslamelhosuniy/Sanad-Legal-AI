import { useEffect, useRef } from "react";
import ChatBubble from "../UI/ChatBubble";
import TypingIndicator from "./TypingIndictor";
import { Message } from "../../hooks/useChat";

interface Props {
  messages: Message[];
  isLoading: boolean;
}

export default function MessagesList({ messages, isLoading }: Props) {
  // console.log(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div id="messages" className="max-w-4xl mx-auto">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.content}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            sources={msg.sources}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
