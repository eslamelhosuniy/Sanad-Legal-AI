import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Download, Eye } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Button from '../components/UI/Button';

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  legalObservations: Array<{
    type: 'warning' | 'info' | 'success';
    title: string;
    description: string;
  }>;
  suggestions: string[];
}

const DocumentAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const analyzeDocument = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        summary: 'هذا عقد إيجار سكني لمدة سنة واحدة بين المالك أحمد محمد والمستأجر سارة أحمد. العقد يتضمن شقة بمساحة 100 متر مربع في منطقة المعادي بقيمة إيجار شهري 3000 جنيه مصري.',
        keyPoints: [
          'مدة العقد: سنة واحدة قابلة للتجديد',
          'قيمة الإيجار: 3,000 جنيه شهرياً',
          'التأمين: شهرين مقدماً',
          'المرافق: على حساب المستأجر',
          'الصيانة: الأساسية على المالك، التجميلية على المستأجر'
        ],
        legalObservations: [
          {
            type: 'warning',
            title: 'بند قد يحتاج مراجعة',
            description: 'لا يوجد نص واضح حول آلية زيادة الإيجار عند التجديد. ننصح بإضافة بند ينظم هذا الأمر.'
          },
          {
            type: 'info',
            title: 'ملاحظة قانونية',
            description: 'العقد يحتوي على جميع البنود الأساسية المطلوبة قانونياً وفقاً للقانون المدني المصري.'
          },
          {
            type: 'success',
            title: 'بند مطابق للقانون',
            description: 'بند إخلاء الوحدة مطابق لأحكام قانون الإيجارات الجديد رقم 4 لسنة 1996.'
          }
        ],
        suggestions: [
          'إضافة بند واضح حول آلية زيادة الإيجار عند التجديد',
          'تحديد المسؤول عن رسوم الكهرباء والمياه بوضوح أكبر',
          'إضافة بند حول التأمين ضد الحريق والسرقة',
          'تحديد إجراءات الإخطار في حالة الرغبة في إنهاء العقد'
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getObservationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  const getObservationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      default:
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
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
                تحليل المستندات القانونية
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                ارفع عقد أو مستند قانوني واحصل على تحليل شامل مع الملاحظات والاقتراحات
              </p>
            </div>

            {/* Upload Section */}
            <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-8 mb-8">
              <div className="text-center">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-neutral-medium rounded-card p-12">
                    <Upload className="w-12 h-12 text-neutral-medium mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                      ارفع مستندك القانوني
                    </h3>
                    <p className="text-neutral-medium dark:text-neutral-light mb-6">
                      ندعم ملفات PDF, DOC, DOCX حتى 10 ميجابايت
                    </p>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button as="span" className="cursor-pointer">
                        اختر ملف
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-neutral-medium rounded-card p-6">
                    <FileText className="w-12 h-12 text-accent-purple mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                      {selectedFile.name}
                    </h3>
                    <p className="text-neutral-medium dark:text-neutral-light mb-6">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} ميجابايت
                    </p>
                    
                    <div className="flex items-center justify-center space-x-4 space-x-reverse">
                      <Button
                        onClick={analyzeDocument}
                        disabled={isAnalyzing}
                        className="min-w-32"
                      >
                        {isAnalyzing ? 'جاري التحليل...' : 'ابدأ التحليل'}
                      </Button>
                      
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectedFile(null);
                          setAnalysisResult(null);
                        }}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {isAnalyzing && (
              <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                  جاري تحليل المستند...
                </h3>
                <p className="text-neutral-medium dark:text-neutral-light">
                  قد يستغرق هذا بضع دقائق حسب حجم وتعقد المستند
                </p>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <FileText className="w-6 h-6 text-accent-purple" />
                    <h2 className="text-xl font-semibold text-neutral-dark dark:text-white">
                      ملخص المستند
                    </h2>
                  </div>
                  <p className="text-neutral-dark dark:text-white leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* Key Points */}
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-4">
                    النقاط الرئيسية
                  </h2>
                  <ul className="space-y-3">
                    {analysisResult.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-dark dark:text-white">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Observations */}
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-4">
                    الملاحظات القانونية
                  </h2>
                  <div className="space-y-4">
                    {analysisResult.legalObservations.map((observation, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-4 ${getObservationColor(observation.type)}`}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          {getObservationIcon(observation.type)}
                          <h3 className="font-semibold text-neutral-dark dark:text-white">
                            {observation.title}
                          </h3>
                        </div>
                        <p className="text-neutral-dark dark:text-white text-sm leading-relaxed">
                          {observation.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-4">
                    التوصيات والاقتراحات
                  </h2>
                  <ul className="space-y-3">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-6 h-6 bg-accent-purple rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span className="text-neutral-dark dark:text-white">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <Button className="flex items-center space-x-2 space-x-reverse">
                    <Download className="w-4 h-4" />
                    <span>تحميل التقرير</span>
                  </Button>
                  
                  <Button variant="secondary" className="flex items-center space-x-2 space-x-reverse">
                    <Eye className="w-4 h-4" />
                    <span>معاينة التقرير</span>
                  </Button>
                  
                  <Button variant="outline">
                    تحليل مستند آخر
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentAnalysis;