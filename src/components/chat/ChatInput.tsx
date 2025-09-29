import { Send, Mic, MicOff } from "lucide-react";
import AutoResizeTextarea from "./AutoResizeTextArea";
import IconButton from "./IconButton";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // ✅ نتاكد إن الـ API متاحة
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-EG"; // ✅ لغة عربية (ممكن تغيرها لـ "en-US" لو عايز إنجليزي)
    recognition.interimResults = true; // ✅ يخليك تشوف النص أثناء الكلام
    recognition.continuous = true; // ✅ يستمر في التسجيل لحد ما توقفه

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      onChange(transcript); // ✅ يحط الكلام في AutoResizeTextarea
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [onChange]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

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
            onClick={toggleRecording}
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
