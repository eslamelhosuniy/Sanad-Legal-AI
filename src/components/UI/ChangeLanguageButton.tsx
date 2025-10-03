import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ChangeLanguageButtonProps {
  color?: string;
}

function ChangeLanguageButton({
  color = "bg-purple-600 text-white",
}: ChangeLanguageButtonProps) {
  const { i18n } = useTranslation();

  function changeLanguage() {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);

    document.documentElement.setAttribute(
      "dir",
      newLang === "ar" ? "rtl" : "ltr"
    );
  }

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "ar";
    i18n.changeLanguage(savedLang);
    document.documentElement.setAttribute(
      "dir",
      savedLang === "ar" ? "rtl" : "ltr"
    );
  }, [i18n]);

  return (
    <button
      className={`mx-3 px-3 py-1 rounded border ${color}`}
      onClick={changeLanguage}
    >
      {i18n.language === "ar" ? "English" : "العربية"}
    </button>
  );
}

export default ChangeLanguageButton;
