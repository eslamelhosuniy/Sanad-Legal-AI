import { useState } from "react";
import { Loader2, Mail, Lock, User, Scale, Globe } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError(t("register.errors.passwordMismatch"));
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await register(form.name, form.email, form.password);
      navigate("/waiting_verify_email");
    } catch (err: any) {
      console.log(err);
      setError(err.message || t("register.errors.registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-800 via-indigo-900 to-gray-950">
      <header className="px-6 py-4 bg-gradient-to-r from-purple-800 via-indigo-900 to-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            
            <span className="font-semibold text-4xl text-white">
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
              {t("register.title")}
            </h1>
            <p className="text-gray-300 text-sm">{t("register.subtitle")}</p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 text-red-300 px-3 py-2 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("register.form.namePlaceholder")}
                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (error) setError(null);
                }}
                required
              />
            </div>

            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder={t("register.form.emailPlaceholder")}
                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (error) setError(null);
                }}
                required
              />
            </div>

            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder={t("register.form.passwordPlaceholder")}
                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (error) setError(null);
                }}
                required
              />
            </div>

            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder={t("register.form.confirmPasswordPlaceholder")}
                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                value={form.confirm}
                onChange={(e) => {
                  setForm({ ...form, confirm: e.target.value });
                  if (error) setError(null);
                }}
                required
              />
            </div>

            <p className="text-xs text-gray-400">
              {t("register.form.passwordNote")}
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {t("register.buttons.connecting")}
                </>
              ) : (
                t("register.buttons.signUp")
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-4">
            {t("register.alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-purple-400 font-semibold">
              {t("register.login")}
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
