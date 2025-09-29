import { useTranslation } from "react-i18next";

export default function ChatHeader() {
  const { t } = useTranslation();

  return (
    <div className="dark:bg-neutral-dark border-gray-200 dark:border-neutral-medium p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-neutral-dark dark:text-white">
          {t("chat.headerTitle")}
        </h1>
        <p className="text-sm text-neutral-medium dark:text-neutral-light mt-1">
          {t("chat.headerSubtitle")}
        </p>
      </div>
    </div>
  );
}
