import { useState } from "react";

import { useTranslation } from "react-i18next";


export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  sources?: string[];
}

export const useChat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        t("chat.firstMessage"),
      isUser: false,
      timestamp: "10:00",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const simulateAIResponse = (
    userMessage: string
  ): Promise<{ content: string; sources: string[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let response = "";
        let sources: string[] = [];

        if (userMessage.includes("عقد")) {
          response =
            "بخصوص العقود، فإن القانون المدني المصري ينص على أن العقد شريعة المتعاقدين...";
          sources = ["القانون المدني - المادة 89"];
        } else {
          response = "من فضلك وضّح سؤالك أكثر...";
          sources = ["الدستور المصري"];
        }

        resolve({ content: response, sources });
      }, 1500);
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { content, sources } = await simulateAIResponse(userMessage.content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content,
        isUser: false,
        timestamp: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, inputMessage, setInputMessage, isLoading, sendMessage };
};
