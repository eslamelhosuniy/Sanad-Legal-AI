import { Send, Mic, MicOff } from "lucide-react";
import AutoResizeTextarea from "./AutoResizeTextArea";
import IconButton from "./IconButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({ value, onChange, onSend, isLoading }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-neutral-dark border-t border-gray-200 dark:border-neutral-medium p-4">
      <div className="max-w-4xl mx-auto flex items-end relative">
        <AutoResizeTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("chat.placeholder")}
          disabled={isLoading}
        />

        <div className="absolute ltr:right-3 rtl:left-3 bottom-6 flex gap-2">
          <IconButton
            icon={isRecording ? MicOff : Mic}
            onClick={() => setIsRecording(!isRecording)}
            title={t("chat.record")}
            className={
              isRecording
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-100 dark:bg-neutral-medium hover:bg-gray-200 dark:hover:bg-neutral-dark text-neutral-dark dark:text-white"
            }
          />
          <IconButton
            icon={Send}
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            title={t("chat.send")}
            className="bg-accent-purple text-white hover:bg-purple-600 disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
