import { useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ نستخدم البارامز من الرواتر
import Sidebar from "../components/Layout/Sidebar";
import MainNavbar from "../components/Layout/Navbar";
import ChatHeader from "../components/chat/ChatHeader";
import MessagesList from "../components/chat/MessageList";
import QuickReplies from "../components/chat/QuickReplies";
import ChatInput from "../components/chat/ChatInput";
import { useChat } from "../hooks/useChat";

export default function ConsultationPage() {
  const { id } = useParams(); // ✅ id بتاع المحادثة من اللينك
  console.log("id", id);
  
  const { 
    messages, 
    inputMessage, 
    setInputMessage, 
    isLoading, 
    sendMessage,
    loadConversation // ✅ الفنكشن الجديدة اللي ضفناها في useChat
  } = useChat();

  // ✅ أول ما الصفحة تتفتح يجيب المحادثة لو فيه id
  useEffect(() => {
    if (id) {
      loadConversation(Number(id));
    }
  }, [id, loadConversation]);

  // ✅ هندل الإنتر والشفت+إنتر
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }

    function newLine(e: KeyboardEvent) {
      if (e.code === "Enter" && e.shiftKey) {
        e.preventDefault();
        setInputMessage(inputMessage + "\n");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", newLine);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", newLine);
    };
  }, [sendMessage, inputMessage, setInputMessage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-darker">
      <MainNavbar />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <ChatHeader />
          <MessagesList messages={messages} isLoading={isLoading} />
          {messages.length === 1 && <QuickReplies onSelect={setInputMessage} />}
          <ChatInput
            value={inputMessage}
            onChange={setInputMessage}
            onSend={sendMessage}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}
