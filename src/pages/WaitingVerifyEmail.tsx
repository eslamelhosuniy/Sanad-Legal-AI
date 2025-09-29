import { useTranslation } from "react-i18next";
import { Scale, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";

export default function WaitingVerifyEmail() {
  const { t } = useTranslation();
  return (
    <div>
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Scale className="w-5 h-5 text-white" />
            <span className="font-semibold text-4xl text-neutral-dark dark:text-white">
              {t("brand")}
            </span>
          </div>
          <ChangeLanguageButton />
        </div>
      </header>

      {/* Main Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-blue-600 mb-2">
            {t("waitingVerifyEmail.title")}
          </h3>
          <h5 className="text-lg font-medium mb-4">
            {t("waitingVerifyEmail.subtitle")}
          </h5>
          <p className="text-gray-700 mb-6">
            {t("waitingVerifyEmail.description")}
          </p>

          <Link
            to="/login"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition inline-block"
          >
            {t("waitingVerifyEmail.goToLogin")}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 bg-neutral-darker text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-accent-purple" />
            <span>{t("landingPage.appName")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>{t("landingPage.footer.location")}</span>
          </div>
        </div>
        <p className="text-sm">{t("landingPage.footer.copyright")}</p>
        <div className="flex gap-4 mt-2 text-sm">
          <Link to="/privacy">{t("landingPage.footer.privacyPolicy")}</Link>
          <Link to="/terms">{t("landingPage.footer.terms")}</Link>
        </div>
      </footer>
    </div>
  );
}
