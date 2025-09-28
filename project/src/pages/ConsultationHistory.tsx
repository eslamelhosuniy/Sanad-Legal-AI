import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import PopUp from "../components/UI/PopUp";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

function ConsultationHistory() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(user?.conversations || []);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

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

  // 🟢 لما اضغط على محادثة يوديني على صفحة الشات
  const openConversation = (id: string) => {
    navigate(`/consultation/${id}`);
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
            {conversations
              .slice()
              .reverse()
              .map((conversation: any) => (
                <div
                  key={conversation.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-neutral-medium rounded-xl shadow-md hover:shadow-lg transition"
                >
                  {/* Icon + Title */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-accent-purple/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-accent-purple" />
                    </div>
                    <h4
                      onClick={() => openConversation(conversation.id)}
                      className="font-medium text-neutral-dark dark:text-white truncate max-w-[180px] cursor-pointer"
                    >
                      {conversation.title}
                    </h4>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => setSelectedConversation(conversation.id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
                  >
                    {t("consultationHistory.delete")}
                  </button>
                </div>
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
