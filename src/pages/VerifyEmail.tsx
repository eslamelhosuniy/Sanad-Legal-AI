import { useTranslation } from "react-i18next";

import { Scale, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      if (!userId || !token) {
        setMessage(t("verifyEmail.invalidLink"));
        setSuccess(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://sanad-backend-production-cbbc.up.railway.app/api/Auth/verify-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, token }),
          }
        );

        let data: any;
        try {
          data = await response.json();
        } catch {
          data = await response.text();
        }

        console.log("VERIFY EMAIL response:", data);

        if (response.ok) {
          setMessage(data?.message || t("verifyEmail.success"));
          setSuccess(true);
        } else {
          setMessage(data?.message || t("verifyEmail.failed"));
          setSuccess(false);
        }
      } catch (err) {
        setMessage(t("verifyEmail.error"));
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

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

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">
            {t("verifyEmail.title")}
          </h3>

          {loading ? (
            <div className="flex justify-center items-center py-6">
              <span className="animate-spin border-4 border-blue-600 border-t-transparent rounded-full w-10 h-10"></span>
            </div>
          ) : (
            <>
              <p
                className={`mb-3 text-sm ${
                  success ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
              {success && (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {t("verifyEmail.goToLogin")}
                </button>
              )}
            </>
          )}
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
