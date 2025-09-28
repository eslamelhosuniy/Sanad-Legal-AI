import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  sources?: string[];
  role?: string;
}

export const useChat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("chat.firstMessage"),
      isUser: false,
      timestamp: "10:00",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);

  // API لفتح محادثة جديدة
  const { user } = useAuth();
  console.log(user.id);

  const createConversation = async (
    userId: string,
    title: string
  ): Promise<number> => {
    const url = `https://sanad-backend-production-cbbc.up.railway.app/api/Conversations?UserId=${encodeURIComponent(
      userId
    )}&Title=${encodeURIComponent(title)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const text = await res.text(); // علشان تشوف الرد الخام
    console.log("🔹 Conversation response:", res.status, text);

    if (!res.ok) throw new Error("Failed to create conversation");

    const data = JSON.parse(text);
    return data.id;
  };

  // API لإرسال رسالة
  const sendMessageApi = async (content: string, convId: number) => {
    const res = await fetch(
      "https://sanad-backend-production-cbbc.up.railway.app/api/Messages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content,
          conversationId: convId,
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to send message");

    const data = await res.json(); // قراءة واحدة فقط
    console.log(data); // طباعة النتيجة
    return data; // إعادة النتيجة
  };

  // الفنكشن الأساسية
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
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
      let convId = conversationId;

      if (!convId) {
        convId = await createConversation(user.id, "test");
        setConversationId(convId);
      }

      const response = await sendMessageApi(userMessage.content, convId);

      const aiMessage: Message = {
        id: response.id.toString(),
        content: response.content,
        isUser: false,
        timestamp: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sources: response.sources || [],
        role: response.role || "assistant", // هنا تحدد الدور مباشرة
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
  };
};
