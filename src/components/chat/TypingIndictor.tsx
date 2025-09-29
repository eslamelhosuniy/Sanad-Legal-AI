import { useTranslation } from "react-i18next";

export default function TypingIndicator() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start mb-6">
      <div className="bg-accent-purple px-4 py-2 rounded-full text-white flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
        <span className="text-sm">{t("chat.typing")}</span>
      </div>
    </div>
  );
}
