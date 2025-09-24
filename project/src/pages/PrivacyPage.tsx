import React from 'react';
import { Shield, Lock, Eye, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Button from '../components/UI/Button';

const PrivacyPage: React.FC = () => {
  const privacyFeatures = [
    {
      icon: Lock,
      title: 'تشفير البيانات',
      description: 'جميع بياناتك محمية بتشفير AES-256 من الطراز العسكري',
      status: 'active'
    },
    {
      icon: Eye,
      title: 'عدم المشاركة',
      description: 'لا نشارك بياناتك الشخصية مع أطراف ثالثة أبداً',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'حماية متقدمة',
      description: 'أنظمة حماية متطورة ضد الاختراقات والهجمات السيبرانية',
      status: 'active'
    },
    {
      icon: Trash2,
      title: 'حذف البيانات',
      description: 'يمكنك حذف جميع بياناتك نهائياً في أي وقت',
      status: 'available'
    }
  ];

  const dataTypes = [
    {
      type: 'المعلومات الشخصية',
      description: 'الاسم، البريد الإلكتروني، رقم الهاتف',
      retention: '5 سنوات',
      canDelete: true
    },
    {
      type: 'الاستشارات القانونية',
      description: 'الأسئلة والإجابات والمحادثات',
      retention: '7 سنوات',
      canDelete: true
    },
    {
      type: 'المستندات المرفوعة',
      description: 'العقود والملفات التي تم تحليلها',
      retention: '3 سنوات',
      canDelete: true
    },
    {
      type: 'بيانات الاستخدام',
      description: 'إحصائيات الاستخدام وسجل الأنشطة',
      retention: 'سنة واحدة',
      canDelete: false
    }
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
                الخصوصية والأمان
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                نحن ملتزمون بحماية خصوصيتك وأمان بياناتك بأعلى معايير الحماية
              </p>
            </div>

            {/* Privacy Overview */}
            <div className="bg-gradient-to-br from-accent-purple to-purple-600 rounded-card p-8 text-white mb-8">
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <Shield className="w-12 h-12 opacity-80" />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    حماية شاملة لبياناتك
                  </h2>
                  <p className="text-white/90">
                    نطبق أحدث تقنيات الأمان والتشفير لضمان سرية معلوماتك القانونية
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold mb-1">256-bit</div>
                  <div className="text-white/80 text-sm">تشفير AES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold mb-1">99.9%</div>
                  <div className="text-white/80 text-sm">وقت التشغيل</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold mb-1">24/7</div>
                  <div className="text-white/80 text-sm">مراقبة أمنية</div>
                </div>
              </div>
            </div>

            {/* Privacy Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-6">
                ميزات الخصوصية والأمان
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
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          feature.status === 'active' 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            feature.status === 'active' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-neutral-dark dark:text-white">
                              {feature.title}
                            </h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feature.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {feature.status === 'active' ? 'نشط' : 'متاح'}
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
                إدارة البيانات
              </h2>
              
              <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium">
                <div className="p-6 border-b border-gray-200 dark:border-neutral-medium">
                  <h3 className="font-semibold text-neutral-dark dark:text-white mb-2">
                    أنواع البيانات المحفوظة
                  </h3>
                  <p className="text-neutral-medium dark:text-neutral-light text-sm">
                    فيما يلي تفصيل للبيانات التي نحتفظ بها ومدة الاحتفاظ بها
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
                            مدة الاحتفاظ: {data.retention}
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
                          حذف هذه البيانات
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
                    تحميل بياناتك
                  </h3>
                </div>
                <p className="text-neutral-medium dark:text-neutral-light text-sm mb-4 leading-relaxed">
                  احصل على نسخة من جميع البيانات المحفوظة في حسابك
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  طلب تحميل البيانات
                </Button>
              </div>

              <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-dark dark:text-white">
                    إعدادات الخصوصية
                  </h3>
                </div>
                <p className="text-neutral-medium dark:text-neutral-light text-sm mb-4 leading-relaxed">
                  تحكم في كيفية استخدام بياناتك ومشاركتها
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  إدارة الإعدادات
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-card p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold text-red-800 dark:text-red-300">
                  منطقة الخطر
                </h3>
              </div>
              
              <p className="text-red-700 dark:text-red-400 text-sm mb-6 leading-relaxed">
                احذف جميع بياناتك نهائياً من النظام. هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى:
              </p>
              
              <ul className="text-red-700 dark:text-red-400 text-sm space-y-1 mb-6">
                <li>• حذف جميع الاستشارات والمحادثات</li>
                <li>• حذف جميع المستندات المرفوعة</li>
                <li>• حذف الملف الشخصي والإعدادات</li>
                <li>• إغلاق الحساب نهائياً</li>
              </ul>
              
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                احذف بياناتي نهائياً
              </Button>
            </div>

            {/* Contact */}
            <div className="mt-8 text-center">
              <p className="text-neutral-medium dark:text-neutral-light text-sm mb-4">
                هل لديك أسئلة حول سياسة الخصوصية أو أمان البيانات؟
              </p>
              <Button variant="outline" size="sm">
                تواصل مع فريق الأمان
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPage;