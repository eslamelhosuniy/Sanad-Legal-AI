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
      const token =searchParams.get("token");

      if (!userId || !token) {
        setMessage(t("verifyEmail.invalidLink"));
        setSuccess(false);
        setLoading(false);
        return;
      }

      try {

        console.log("Sending:", { userId:userId, token:token });
        const response = await fetch(
          "https://sanad-backend-production-cbbc.up.railway.app/api/Auth/verify-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId:userId, token:token }),
          }
        );

        let data: any = { message: "" };
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          data.message = text;
        }

        if (response.ok) {
          setMessage(data.message || t("verifyEmail.success"));
          setSuccess(true);
        } else {
          setMessage(data.message || t("verifyEmail.failed"));
          setSuccess(false);
        }
      } catch (err: any) {
        setMessage(err?.message || t("verifyEmail.error"));
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, t]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-white">
      {/* Header */}
      <header className="px-6 py-4 shadow-sm bg-white dark:bg-neutral-darker">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-semibold text-2xl text-neutral-dark dark:text-white">
              {t("brand")}
            </span>
          </div>
          <ChangeLanguageButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-neutral-darker shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            {t("verifyEmail.title")}
          </h3>

          {loading ? (
            <div className="flex justify-center items-center py-6">
              <span className="animate-spin border-4 border-blue-600 border-t-transparent rounded-full w-10 h-10"></span>
            </div>
          ) : (
            <>
              <div
                className={`mb-3 text-sm ${
                  success
                    ? "text-green-600"
                    : "bg-red-500/20 text-red-300 px-3 py-2 rounded-md text-center"
                }`}
              >
                {message}
              </div>

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
      </main>

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
