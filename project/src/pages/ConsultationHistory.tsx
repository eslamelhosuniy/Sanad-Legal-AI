import { useState } from "react";
import MainNavbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import PopUp from "../components/UI/PopUp";
import { useTranslation } from "react-i18next";
import { useChat } from "../hooks/useChat";

function ConsultationHistory() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(user?.conversations || []);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const { t } = useTranslation();
  const { setConversationId } = useChat();

  const deleteConversation = async (id: string) => {
    try {
      const res = await fetch(
        `https://sanad-backend-production-cbbc.up.railway.app/api/Conversations/${id}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to delete: ${errText || res.statusText}`);
      }

      setConversations((prev) => prev.filter((c: any) => c.id !== id));
      setSelectedConversation(null);

      console.log("Conversation deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-darker">
      <MainNavbar />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />
        <main className="flex-1 flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-4">
            {t("consultationHistory.title")}
          </h1>
          <ul className="space-y-3">
            {conversations.map((conversation: any) => (
              <li
                key={conversation.id}
                className="flex items-center justify-between bg-white shadow rounded-lg px-4 py-2 cursor-pointer"
              >
                <span
                  onClick={() => setConversationId(conversation.id)}
                  className="text-lg font-medium"
                >
                  {conversation.title}
                </span>
                <button
                  onClick={() => setSelectedConversation(conversation.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  {t("consultationHistory.delete")}
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>

      {selectedConversation && (
        <PopUp onClose={() => setSelectedConversation(null)}>
          <p className="mb-4">هل تريد حذف هذه المحادثة؟</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => deleteConversation(selectedConversation)}
            >
              نعم
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              onClick={() => setSelectedConversation(null)}
            >
              لا
            </button>
          </div>
        </PopUp>
      )}
    </div>
  );
}

export default ConsultationHistory;
