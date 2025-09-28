import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, Loader2, Scale, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err: any) {
      setError(err.message || t("login.errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (error) setError(null);
  };

  return (
    <div>
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

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm p-6 bg-white/10 rounded-2xl bg-gradient-to-b from-purple-700 to-gray-900">
          <div className="flex flex-col items-center mb-6">
            <h1 className="mt-4 text-xl font-semibold text-white">
              {t("login.title")}
            </h1>
            <p className="text-gray-300 text-sm">{t("login.subtitle")}</p>
          </div>

          <form className="space-y-3" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/20 text-red-300 px-3 py-2 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder={t("login.form.emailPlaceholder")}
                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder={t("login.form.passwordPlaceholder")}
                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>

            <p className="text-center text-sm text-gray-300 mt-4">
              <Link
                to="/forget-password"
                className="text-purple-400 font-semibold"
              >
                {t("login.forgotPassword")}
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {t("login.buttons.connecting")}
                </>
              ) : (
                t("login.buttons.login")
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-4">
            {t("login.noAccount")}{" "}
            <Link to="/register" className="text-purple-400 font-semibold">
              {t("login.register")}
            </Link>
          </p>
        </div>
      </div>

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
