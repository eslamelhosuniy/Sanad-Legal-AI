import { useState } from "react";
import { Mail, Loader2, Scale, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { t } from "i18next";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(
                "https://sanad-backend-production-cbbc.up.railway.app/api/Auth/forget-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                const message =
                    data?.errors?.Email?.[0] ||
                    data?.error ||
                    data?.message ||
                    "فشل الطلب، حاول مرة أخرى";
                throw new Error(message);
            }

            setSuccess("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
        } catch (err: any) {
            setError(err.message || "حدث خطأ ما");
        } finally {
            setLoading(false);
        }
    };

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
                    <div>
                        <ChangeLanguageButton />
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-sm p-6 bg-white/10 rounded-2xl bg-gradient-to-b from-purple-700 to-gray-900">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="mt-4 text-xl font-semibold text-white">
                            نسيت كلمة المرور؟
                        </h1>
                        <p className="text-gray-300 text-sm text-center">
                            أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور
                        </p>
                    </div>

                    <form className="space-y-3" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/20 text-red-300 px-3 py-2 rounded-md text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/20 text-green-300 px-3 py-2 rounded-md text-sm">
                                {success}
                            </div>
                        )}

                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="أدخل بريدك الإلكتروني"
                                className="ml-2 flex-1 bg-transparent outline-none text-gray-800"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    جاري الإرسال...
                                </>
                            ) : (
                                "إرسال الرابط"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-300 mt-4">
                        تذكرت كلمة المرور؟{" "}
                        <Link to="/login" className="text-purple-400 font-semibold">
                            تسجيل الدخول
                        </Link>
                    </p>
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
