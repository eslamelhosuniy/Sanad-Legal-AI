import React from "react";
import {
  Shield,
  Lock,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Button from "../components/UI/Button";
import { useTranslation } from "react-i18next";

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  const privacyFeatures = [
    {
      icon: Lock,
      title: t("privacy.features.encryption.title"),
      description: t("privacy.features.encryption.description"),
      status: "active",
    },
    {
      icon: Eye,
      title: t("privacy.features.noSharing.title"),
      description: t("privacy.features.noSharing.description"),
      status: "active",
    },
    {
      icon: Shield,
      title: t("privacy.features.advancedProtection.title"),
      description: t("privacy.features.advancedProtection.description"),
      status: "active",
    },
    {
      icon: Trash2,
      title: t("privacy.features.deleteData.title"),
      description: t("privacy.features.deleteData.description"),
      status: "available",
    },
  ];

  const dataTypes = [
    {
      type: t("privacy.dataManagement.types.personal.type"),
      description: t("privacy.dataManagement.types.personal.description"),
      retention: t("privacy.dataManagement.types.personal.retention"),
      canDelete: true,
    },
    {
      type: t("privacy.dataManagement.types.consultations.type"),
      description: t("privacy.dataManagement.types.consultations.description"),
      retention: t("privacy.dataManagement.types.consultations.retention"),
      canDelete: true,
    },
    {
      type: t("privacy.dataManagement.types.documents.type"),
      description: t("privacy.dataManagement.types.documents.description"),
      retention: t("privacy.dataManagement.types.documents.retention"),
      canDelete: true,
    },
    {
      type: t("privacy.dataManagement.types.usage.type"),
      description: t("privacy.dataManagement.types.usage.description"),
      retention: t("privacy.dataManagement.types.usage.retention"),
      canDelete: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-darker">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-neutral-dark dark:text-white mb-2">
                {t("privacy.title")}
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                {t("privacy.subtitle")}
              </p>
            </div>

            {/* Privacy Overview */}
            <div className="bg-gradient-to-br from-accent-purple to-purple-600 rounded-card p-8 text-white mb-8">
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <Shield className="w-12 h-12 opacity-80" />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {t("privacy.overview.title")}
                  </h2>
                  <p className="text-white/90">
                    {t("privacy.overview.description")}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold mb-1">256-bit</div>
                  <div className="text-white/80 text-sm">
                    {t("privacy.overview.aes")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold mb-1">99.9%</div>
                  <div className="text-white/80 text-sm">
                    {t("privacy.overview.uptime")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold mb-1">24/7</div>
                  <div className="text-white/80 text-sm">
                    {t("privacy.overview.monitoring")}
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-6">
                {t("privacy.featuresTitle")}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {privacyFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6"
                    >
                      <div className="flex items-start space-x-4 space-x-reverse">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            feature.status === "active"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              feature.status === "active"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-neutral-dark dark:text-white">
                              {feature.title}
                            </h3>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                feature.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              }`}
                            >
                              {feature.status === "active"
                                ? t("privacy.statuses.active")
                                : t("privacy.statuses.available")}
                            </div>
                          </div>
                          <p className="text-neutral-medium dark:text-neutral-light text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Data Management */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-6">
                {t("privacy.dataManagement.title")}
              </h2>

              <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium">
                <div className="p-6 border-b border-gray-200 dark:border-neutral-medium">
                  <h3 className="font-semibold text-neutral-dark dark:text-white mb-2">
                    {t("privacy.dataManagement.title")}
                  </h3>
                  <p className="text-neutral-medium dark:text-neutral-light text-sm">
                    {t("privacy.dataManagement.subtitle")}
                  </p>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-neutral-medium">
                  {dataTypes.map((data, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-neutral-dark dark:text-white">
                          {data.type}
                        </h4>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm text-neutral-medium dark:text-neutral-light">
                            {t("privacy.dataManagement.subtitle")}:{" "}
                            {data.retention}
                          </span>
                          {data.canDelete ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-neutral-medium dark:text-neutral-light text-sm mb-3">
                        {data.description}
                      </p>
                      {data.canDelete && (
                        <Button variant="outline" size="sm">
                          {t("privacy.dataManagement.deleteBtn")}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Control Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-dark dark:text-white">
                    {t("privacy.actions.download.title")}
                  </h3>
                </div>
                <p className="text-neutral-medium dark:text-neutral-light text-sm mb-4 leading-relaxed">
                  {t("privacy.actions.download.description")}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {t("privacy.actions.download.btn")}
                </Button>
              </div>

              <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-dark dark:text-white">
                    {t("privacy.actions.settings.title")}
                  </h3>
                </div>
                <p className="text-neutral-medium dark:text-neutral-light text-sm mb-4 leading-relaxed">
                  {t("privacy.actions.settings.description")}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {t("privacy.actions.settings.btn")}
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-card p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold text-red-800 dark:text-red-300">
                  {t("privacy.dangerZone.title")}
                </h3>
              </div>

              <p className="text-red-700 dark:text-red-400 text-sm mb-6 leading-relaxed">
                {t("privacy.dangerZone.warning")}
              </p>

              <ul className="text-red-700 dark:text-red-400 text-sm space-y-1 mb-6">
                {t("privacy.dangerZone.list", { returnObjects: true }).map(
                  (item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  )
                )}
              </ul>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                {t("privacy.dangerZone.btn")}
              </Button>
            </div>

            {/* Contact */}
            <div className="mt-8 text-center">
              <p className="text-neutral-medium dark:text-neutral-light text-sm mb-4">
                {t("privacy.contact.question")}
              </p>
              <Button variant="outline" size="sm">
                {t("privacy.contact.btn")}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPage;
