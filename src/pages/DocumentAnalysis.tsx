import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Button from "../components/UI/Button";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  legalObservations: {
    type: string;
    title: string;
    description: string;
  }[];
  suggestions: string[];
}

const DocumentAnalysis: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    

    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const analyzeDocument = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const mockResult: AnalysisResult = {
        summary:
          "هذا عقد إيجار سكني لمدة سنة واحدة بين المالك أحمد محمد والمستأجر سارة أحمد. العقد يتضمن شقة بمساحة 100 متر مربع في منطقة المعادي بقيمة إيجار شهري 3000 جنيه مصري.",
        keyPoints: [
          "مدة العقد: سنة واحدة قابلة للتجديد",
          "قيمة الإيجار: 3,000 جنيه شهرياً",
          "التأمين: شهرين مقدماً",
          "المرافق: على حساب المستأجر",
          "الصيانة: الأساسية على المالك، التجميلية على المستأجر",
        ],
        legalObservations: [
          {
            type: "warning",
            title: "بند قد يحتاج مراجعة",
            description:
              "لا يوجد نص واضح حول آلية زيادة الإيجار عند التجديد. ننصح بإضافة بند ينظم هذا الأمر.",
          },
          {
            type: "info",
            title: "ملاحظة قانونية",
            description:
              "العقد يحتوي على جميع البنود الأساسية المطلوبة قانونياً وفقاً للقانون المدني المصري.",
          },
          {
            type: "success",
            title: "بند مطابق للقانون",
            description:
              "بند إخلاء الوحدة مطابق لأحكام قانون الإيجارات الجديد رقم 4 لسنة 1996.",
          },
        ],
        suggestions: [
          "إضافة بند واضح حول آلية زيادة الإيجار عند التجديد",
          "تحديد المسؤول عن رسوم الكهرباء والمياه بوضوح أكبر",
          "إضافة بند حول التأمين ضد الحريق والسرقة",
          "تحديد إجراءات الإخطار في حالة الرغبة في إنهاء العقد",
        ],
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getObservationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-darker">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-neutral-dark dark:text-white mb-2">
                {t("uploadDocuments.title")}
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                {t("uploadDocuments.subtitle")}
              </p>
            </div>

            {/* Upload Section */}
            <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-8 mb-8">
              <div className="text-center">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-neutral-medium rounded-card p-12">
                    <Upload className="w-12 h-12 text-neutral-medium mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                      {t("uploadDocuments.uploadSection.heading")}
                    </h3>
                    <p className="text-neutral-medium dark:text-neutral-light mb-6">
                      {t("uploadDocuments.uploadSection.description")}
                    </p>

                    {/* Input file مخفي + زر رفع */}
                    <input
                      type="file"
                      id="file-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                    <Button
                      as="span"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                      className="cursor-pointer"
                    >
                      {t("uploadDocuments.uploadSection.button")}
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-neutral-medium rounded-card p-6">
                    <FileText className="w-12 h-12 text-accent-purple mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                      {selectedFile.name}
                    </h3>
                    <p className="text-neutral-medium dark:text-neutral-light mb-6">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <div className="flex items-center justify-center space-x-4 space-x-reverse">
                      <Button
                        disabled={isAnalyzing}
                        className="min-w-32"
                        onClick={analyzeDocument}
                      >
                        {isAnalyzing
                          ? t("uploadDocuments.uploadSection.analyzing")
                          : t("uploadDocuments.uploadSection.analyze")}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedFile(null)}
                      >
                        {t("uploadDocuments.uploadSection.cancel")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading */}
            {isAnalyzing && (
              <div className="bg-white dark:bg-neutral-dark rounded-card p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                  {t("uploadDocuments.loading.title")}
                </h3>
                <p className="text-neutral-medium dark:text-neutral-light">
                  {t("uploadDocuments.loading.desc")}
                </p>
              </div>
            )}

            {/* Results */}
            {analysisResult && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">الملخص</h2>
                <p>{analysisResult.summary}</p>

                <h2 className="text-xl font-bold">النقاط الرئيسية</h2>
                <ul className="list-disc pl-5">
                  {analysisResult.keyPoints.map((kp, idx) => (
                    <li key={idx}>{kp}</li>
                  ))}
                </ul>

                <h2 className="text-xl font-bold">الملاحظات القانونية</h2>
                <ul className="space-y-3">
                  {analysisResult.legalObservations.map((obs, idx) => (
                    <li
                      key={idx}
                      className={`p-4 rounded border ${
                        obs.type === "warning"
                          ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20"
                          : obs.type === "success"
                          ? "border-green-200 bg-green-50 dark:bg-green-900/20"
                          : "border-blue-200 bg-blue-50 dark:bg-blue-900/20"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {getObservationIcon(obs.type)}
                        <span className="font-semibold">{obs.title}</span>
                      </div>
                      <p>{obs.description}</p>
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-bold">الاقتراحات</h2>
                <ul className="list-disc pl-5">
                  {analysisResult.suggestions.map((sug, idx) => (
                    <li key={idx}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentAnalysis;
