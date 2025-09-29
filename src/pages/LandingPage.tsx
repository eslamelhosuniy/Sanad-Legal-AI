import React from "react";
import { Scale, Shield, Users, ArrowLeft, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Button from "../components/UI/Button";
import ChangeLanguageButton from "../components/UI/ChangeLanguageButton";
import { useAuth } from "../contexts/AuthContext";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const features = [
    {
      icon: Zap,
      title: t("landingPage.featuresSection.features.fast.title"),
      description: t("landingPage.featuresSection.features.fast.description"),
    },
    {
      icon: Shield,
      title: t("landingPage.featuresSection.features.secure.title"),
      description: t("landingPage.featuresSection.features.secure.description"),
    },
    {
      icon: Users,
      title: t("landingPage.featuresSection.features.lawyers.title"),
      description: t(
        "landingPage.featuresSection.features.lawyers.description"
      ),
    },
    {
      icon: Scale,
      title: t("landingPage.featuresSection.features.sources.title"),
      description: t(
        "landingPage.featuresSection.features.sources.description"
      ),
    },
  ];

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
            {!user && (
              <Link
                to="/login"
                className="text-accent-purple mx-3 hover:text-purple-600 font-medium transition-colors"
              >
                {t("landingPage.login")}
              </Link>
            )}
            <ChangeLanguageButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-dark dark:text-white mb-6 leading-tight">
          <Trans i18nKey="landingPage.hero.title">
            الوصول السريع والدقيق <br />{" "}
            <span className="text-accent-purple">للمعلومات القانونية</span>
            <br /> في مصر
          </Trans>
        </h1>
        <p className="text-xl text-neutral-medium dark:text-neutral-light mb-12">
          {t("landingPage.hero.subtitle")}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          <Link to="/consultation">
            <Button size="lg" className="flex">
              {t("landingPage.actions.startConsultation")}{" "}
              <ArrowLeft className="w-5 h-5 ltr:rotate-180 mx-2" />
            </Button>
          </Link>
          <Link to="/lawyers">
            <Button variant="secondary" size="lg" className="flex">
              {t("landingPage.actions.lawyerLogin")}{" "}
              <Users className="w-5 h-5 mx-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-semibold text-neutral-dark dark:text-white text-center mb-4">
          {t("landingPage.featuresSection.title")}
        </h2>
        <p className="text-xl text-neutral-medium dark:text-neutral-light text-center mb-12">
          {t("landingPage.featuresSection.subtitle")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-lg shadow bg-white dark:bg-neutral-dark"
              >
                <Icon className="w-6 h-6 text-accent-purple mb-3" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-neutral-medium dark:text-neutral-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center bg-accent-purple text-white">
        <h2 className="text-3xl font-semibold mb-4">
          {t("landingPage.cta.title")}
        </h2>
        <p className="text-xl mb-8">{t("landingPage.cta.subtitle")}</p>
        <Link to="/consultation">
          <Button variant="secondary" size="lg">
            {t("landingPage.cta.button")}
          </Button>
        </Link>
        <Link to="/privacy" className="block mt-4 text-white/80 underline">
          {t("landingPage.cta.privacy")}
        </Link>
      </section>

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
};

export default LandingPage;
