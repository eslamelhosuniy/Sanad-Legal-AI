import { t } from "i18next";
import { Scale, Globe } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId = searchParams.get("userId") || "";
  const token = searchParams.get("token") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://sanad-backend-production-cbbc.up.railway.app/api/Auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId:userId, token:token, newPassword: form.password }),
        }
      );

      const result = await response.text();
      if (response.ok) {
        setMessage(result || "Password reset successfully!");
        setForm({ password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(result || "Reset failed.");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-white">
      {/* ===== Header ===== */}
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

      {/* ===== Main Content ===== */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-neutral-darker shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-center text-primary mb-2">
            Sanad
          </h3>
          <h5 className="text-lg font-medium text-center mb-6">
            Reset Your Password
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none dark:bg-neutral-dark dark:border-gray-600"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none dark:bg-neutral-dark dark:border-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
              )}
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>

          {message && (
            <div className="mt-3 text-center text-sm text-gray-700 dark:text-gray-300">
              {message}
            </div>
          )}
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className="px-6 py-8 bg-neutral-darker text-white mt-8">
        <div className="max-w-7xl mx-auto">
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
            <Link to="/privacy" className="hover:underline">
              {t("landingPage.footer.privacyPolicy")}
            </Link>
            <Link to="/terms" className="hover:underline">
              {t("landingPage.footer.terms")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
