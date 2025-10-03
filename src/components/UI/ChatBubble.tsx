import React, { useState } from "react";
import { ExternalLink, UserCheck } from "lucide-react";

import { useTranslation } from "react-i18next";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  showActions?: boolean;
  sources?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  showActions = true,
  sources,
}) => {
  const [pop, setPop] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const navigate = useNavigate();

  const { t } = useTranslation();
  // console.log(sources);

  function togglePop() {
    setPop(!pop);
  }
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`max-w-3xl ${isUser ? "ml-0" : "mr-0"}`}>
        <div
          className={`px-6 py-2 rounded-chat ${
            isUser
              ? "bg-primary-pink text-neutral-dark"
              : "bg-accent-purple text-white"
          } shadow-lg`}
        >
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
          {timestamp && (
            <p
              className={`text-xs mt-2 ${
                isUser ? "text-neutral-medium" : "text-white/70"
              }`}
            >
              {timestamp}
            </p>
          )}
        </div>
        {showActions && !isUser && (
          <div className="mt-4 flex space-x-3 space-x-reverse">
            <button
              onClick={togglePop}
              className="flex relative items-center mx-2 space-x-2 space-x-reverse bg-white dark:bg-neutral-dark text-accent-purple px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-medium transition-colors shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t("chat.check_resource")}</span>
            </button>
            <button
              onClick={() => navigate("/lawyers")}
              className="flex relative items-center mx-3 space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t("chat.contact_lawyer")}</span>
            </button>
          </div>
        )}

        {pop && sources && (
          <PopUp onClose={togglePop}>
            <div className="max-h-[600px] overflow-y-auto space-y-6 p-4 leading-relaxed">
              {sources
                ?.split(/(?=مادة\s*\([^)]+\))/)
                .map((item: string, i: number) => {
                  const match = item.match(/^(مادة\s*\([^)]+\)\s*:?)/);
                  const title = match ? match[0] : `مادة ${i + 1}`;
                  const content = item
                    .replace(/^(مادة\s*\([^)]+\)\s*:?)/, "")
                    .trim();

                  const parts = content
                    .split(/\s*(\d+|[٠-٩]+)[-–.]\s+/)
                    .filter(
                      (p) => p && !/^\d+$/.test(p) && !/^[٠-٩]+$/.test(p)
                    );

                  const intro = parts.length > 0 ? parts[0] : "";
                  const points = parts.slice(1);

                  const isOpen = openItems[i] || false;

                  return (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-medium text-gray-900 dark:text-gray-200 shadow-sm"
                    >
                      {/* عنوان المادة */}
                      <h3 className="font-bold text-accent-purple mb-3 text-lg">
                        {title}
                      </h3>

                      {/* المقدمة */}
                      {intro && (
                        <p className="mb-3 font-medium text-gray-700 dark:text-gray-300">
                          {intro}
                        </p>
                      )}

                      {/* باقي النقط (مخفية في البداية) */}
                      {isOpen && points.length > 0 && (
                        <ul className="space-y-2 pl-4">
                          {points.map((p, idx) => (
                            <li key={idx} className="flex">
                              <span className="ml-2 font-bold">{idx + 1}-</span>
                              <span>{p.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* زرار اقرأ المزيد */}
                      {points.length > 0 && (
                        <button
                          onClick={() =>
                            setOpenItems((prev) => ({
                              ...prev,
                              [i]: !isOpen,
                            }))
                          }
                          className="mt-2 text-sm text-accent-purple font-semibold hover:underline"
                        >
                          {isOpen ? "إخفاء التفاصيل" : "اقرأ المزيد"}
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </PopUp>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
