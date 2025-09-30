import { useState, useRef, useEffect } from "react";
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

export const useChat = (initialConversationId?: number) => {
  const { t } = useTranslation();
  const { user, addConversation } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      content: t("chat.firstMessage"),
      isUser: false,
      timestamp: new Date().toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      role: "assistant",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(
    initialConversationId || null
  );

  // 🟢 Ref علشان ما يحملش نفس المحادثة مرتين
  const loadedConvRef = useRef<Set<number>>(new Set());

  const createConversation = async (
    userId: string,
    title: string
  ): Promise<number> => {
    const url = `https://sanad-backend-production-cbbc.up.railway.app/api/Conversations?UserId=${encodeURIComponent(
      userId
    )}&Title=${encodeURIComponent(title)}`;

    const res = await fetch(url, { method: "POST" });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Failed to create conversation:", res.status, text);
      throw new Error("Failed to create conversation");
    }

    const data = await res.json();
    return data.id;
  };

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

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Failed to send message:", res.status, text);
      throw new Error("Failed to send message");
    }

    console.log("Message sent successfully");

    return res.json();
  };

  const loadConversation = async (convId: number) => {
    if (!convId || loadedConvRef.current.has(convId)) return;
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://sanad-backend-production-cbbc.up.railway.app/api/Messages/conversation/${convId}`
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Failed to load conversation:", res.status, text);
        throw new Error("Failed to load conversation");
      }

      const data = await res.json();
      console.log("🔹 Loaded conversation:", data);

      const msgs = Array.isArray(data) ? data : data?.messages || [];

      const loadedMessages: Message[] = msgs.map((msg: any) => ({
        id: msg.id?.toString() || crypto.randomUUID(),
        content: msg.content || "",
        isUser: msg.role === "user",
        timestamp: msg.createdAt
          ? new Date(msg.createdAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date().toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            }),
        sources: msg.sources || [],
        role: msg.role || "assistant",
      }));

      setMessages(loadedMessages);
      setConversationId(convId);
      loadedConvRef.current.add(convId); // ✅ متتعملش تاني
    } catch (err) {
      console.error("Error loading conversation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      let convId = conversationId;

      if (!convId) {
        // 🟢 أول رسالة كعنوان
        const title =
          userMessage.content.length > 30
            ? userMessage.content.slice(0, 30) + "..."
            : userMessage.content;

        convId = await createConversation(user.id, title);
        setConversationId(convId);

        // ✅ أضف المحادثة للـ history فوراً
        addConversation({
          id: convId,
          title,
          createdAt: new Date().toISOString(),
        });
      }

      const response = await sendMessageApi(userMessage.content, convId);
      console.log("🔹 Response:", response);
      console.log(response.aiMessage.content);

      const aiMessage: Message = {
        id: response.aiMessage.id?.toString() || crypto.randomUUID(),
        content: response.aiMessage.content || "",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sources: response.aiMessage.sources || [],
        role: response.aiMessage.role || "AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 لو فيه convId من الأول → نحمل مرة واحدة بس
  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId]);

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
    loadConversation,
  };
};
