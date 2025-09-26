import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const savedLang = localStorage.getItem("lang")
i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        brand: "سَنَد",
        soon: "قريباً",
        nav: {
          home: "الرئيسية",
          consultation: "استشارة سريعة",
          documents: "رفع مستند",
          research: "بحث قانوني",
          lawyers: "تواصل مع محامي",
          profile: "حسابي",
        },
        sidebar: {
          profile: "الملف الشخصي",
          my_data: "بياناتي الشخصية",
          consultations_documents: "الاستشارات والمستندات",
          consultation_history: "الاستشارات السابقة",
          uploaded_documents: "المستندات المرفوعة",
          settings: "الإعدادات",
          general_settings: "إعدادات عامة",
          privacy: "الخصوصية والأمان",
          "user-role": "مستخدم عادى",
          "edit-profile": "تحرير الملف الشخصي",
          "delete-section": {
            "delete-data": "حذف البيانات",
            "delete-par": "احذف جميع بياناتك نهائياً من النظام",
            "delete-immediatly": "احذف بياناتي نهائياً",
          },
        },
        welcome: "مرحباً بك، {{name}}",
        subtitle: "كيف يمكننا مساعدتك قانونياً اليوم؟",

        stats: {
          consultations: "الاستشارات المكتملة",
          documents: "المستندات المحللة",
          research: "البحوث القانونية",
          responseTime: "وقت الاستجابة",
        },

        quickActions: {
          title: "إجراءات سريعة",
          consultation: {
            title: "استشارة سريعة",
            description: "اسأل أي سؤال قانوني واحصل على إجابة فورية",
          },
          document: {
            title: "تحليل مستند",
            description: "ارفع عقد أو مستند واحصل على تحليل قانوني",
          },
          research: {
            title: "بحث قانوني",
            description: "ابحث في القوانين والأحكام المصرية",
          },
          lawyer: {
            title: "تواصل مع محامي",
            description: "احجز استشارة مع محامي متخصص",
          },
        },

        recentActivity: {
          title: "النشاط الأخير",
          viewAll: "عرض الكل",
          items: {
            consultation: "استشارة حول قانون العمل",
            document: "تحليل عقد إيجار",
            research: "بحث في قانون الأسرة",
            status: "مكتملة",
            time1: "منذ ساعتين",
            time2: "منذ 5 ساعات",
            time3: "أمس",
          },
        },

        tips: {
          title: "نصيحة اليوم",
          content:
            "احرص دائماً على قراءة العقود بعناية قبل التوقيع. يمكن للمراجعة القانونية أن توفر عليك مشاكل مستقبلية.",
        },

        updates: {
          title: "أحدث التحديثات القانونية",
          taxLaw: {
            title: "تعديلات قانون الضرائب 2024",
            desc: "دخلت حيز التنفيذ الأسبوع الماضي",
          },
          dataLaw: {
            title: "قانون حماية البيانات الجديد",
            desc: "سيصدر قريباً - ابقى على اطلاع",
          },
          showAll: "عرض جميع التحديثات",
        },
        chat: {
          headerTitle: "استشارة قانونية فورية",
          headerSubtitle:
            "اسأل أي سؤال قانوني واحصل على إجابة مفصلة مع المراجع",
          placeholder: "اكتب سؤالك القانوني هنا...",
          send: "إرسال",
          record: "تسجيل صوتي",
          typing: "الوكيل يكتب...",
          firstMessage:
            "مرحباً! أنا الوكيل القانوني الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك السؤال عن أي موضوع قانوني متعلق بالقوانين المصرية.",
          check_resource: "تحقق من المصدر",
          contact_lawyer: "تواصل مع محامى",
        },
        landingPage: {
          appName: "الوكيل القانوني الذكي",
          login: "تسجيل الدخول",
          logout:"تسجيل خروج",
          hero: {
            title:
              "الوصول السريع والدقيق للمعلومات القانوني في مصر",
            subtitle:
              "احصل على استشارات قانونية فورية، حلل مستنداتك، وابحث في القوانين المصرية بمساعدة الذكاء الاصطناعي المتقدم",
          },
          actions: {
            startConsultation: "ابدأ الاستشارة",
            lawyerLogin: "تسجيل دخول المحامي",
          },
          featuresSection: {
            title: "لماذا تختار منصتنا؟",
            subtitle:
              "نقدم حلول قانونية متطورة تجمع بين التكنولوجيا والخبرة البشرية",
            features: {
              fast: {
                title: "استشارة سريعة",
                description:
                  "احصل على إجابات قانونية فورية ودقيقة من الذكاء الاصطناعي",
              },
              secure: {
                title: "حماية البيانات",
                description:
                  "جميع استشاراتك ومستنداتك محمية بأعلى معايير الأمان",
              },
              lawyers: {
                title: "شبكة محامين",
                description: "تواصل مع محامين متخصصين للحصول على استشارة شخصية",
              },
              sources: {
                title: "مصادر موثقة",
                description:
                  "جميع الإجابات مستندة إلى القوانين والأحكام المصرية الرسمية",
              },
            },
          },
          cta: {
            title: "جاهز للبدء؟",
            subtitle:
              "انضم إلى آلاف المستخدمين الذين يعتمدون على منصتنا للحصول على المساعدة القانونية",
            button: "ابدأ مجاناً الآن",
            privacy: "اعرف المزيد عن الخصوصية",
          },
          footer: {
            location: "مصر - القاهرة",
            copyright: "© 2024 الوكيل القانوني الذكي. جميع الحقوق محفوظة.",
            privacyPolicy: "سياسة الخصوصية",
            terms: "شروط الاستخدام",
          },
        },
      },
    },
    en: {
      translation: {
        brand: "Sanad",
        soon: "Soon",
        nav: {
          home: "Home",
          consultation: "Quick Consultation",
          documents: "Upload Document",
          research: "Legal Research",
          lawyers: "Contact Lawyer",
          profile: "Profile",
        },
        sidebar: {
          profile: "Profile",
          my_data: "My Information",
          consultations_documents: "Consultations & Documents",
          consultation_history: "Consultation History",
          uploaded_documents: "Uploaded Documents",
          settings: "Settings",
          general_settings: "General Settings",
          privacy: "Privacy & Security",
          "user-role": "Regular User",
          "edit-profile": "Edit Profile",
          "delete-section": {
            "delete-data": "Delete Data",
            "delete-par": "Permanently delete all your data from the system",
            "delete-immediatly": "Delete My Data Permanently",
          },
        },

        welcome: "Welcome, {{name}}",
        subtitle: "How can we assist you legally today?",

        stats: {
          consultations: "Completed Consultations",
          documents: "Analyzed Documents",
          research: "Legal Research",
          responseTime: "Response Time",
        },

        quickActions: {
          title: "Quick Actions",
          consultation: {
            title: "Quick Consultation",
            description: "Ask any legal question and get an instant answer",
          },
          document: {
            title: "Document Analysis",
            description:
              "Upload a contract or document and get a legal analysis",
          },
          research: {
            title: "Legal Research",
            description: "Search Egyptian laws and rulings",
          },
          lawyer: {
            title: "Connect with Lawyer",
            description: "Book a consultation with a specialized lawyer",
          },
        },

        recentActivity: {
          title: "Recent Activity",
          viewAll: "View All",
          items: {
            consultation: "Consultation on Labor Law",
            document: "Lease Agreement Analysis",
            research: "Research on Family Law",
            status: "Completed",
            time1: "2 hours ago",
            time2: "5 hours ago",
            time3: "Yesterday",
          },
        },

        tips: {
          title: "Tip of the Day",
          content:
            "Always read contracts carefully before signing. Legal review can save you future problems.",
        },

        updates: {
          title: "Latest Legal Updates",
          taxLaw: {
            title: "Tax Law Amendments 2024",
            desc: "Came into effect last week",
          },
          dataLaw: {
            title: "New Data Protection Law",
            desc: "Coming soon - stay tuned",
          },
          showAll: "Show All Updates",
        },
        chat: {
          headerTitle: "Instant Legal Consultation",
          headerSubtitle:
            "Ask any legal question and get a detailed answer with references",
          placeholder: "Type your legal question here...",
          send: "Send",
          record: "Voice recording",
          typing: "Agent is Typing...",
          firstMessage:
            "Hello! I'm the smart legal agent. How can I help you today? You can ask any legal question related to Egyptian laws.",
          check_resource: "Check source",
          contact_lawyer: "Contact Lawyer",
        },
        landingPage: {
          appName: "Smart Legal Agent",
          login: "Login",
          logout:"Logout",
          hero: {
            title:
              "Fast and Accurate Access to Legal Information in Egypt",
            subtitle:
              "Get instant legal consultations, analyze your documents, and search Egyptian laws with the help of advanced AI",
          },
          actions: {
            startConsultation: "Start Consultation",
            lawyerLogin: "Lawyer Login",
          },
          featuresSection: {
            title: "Why Choose Our Platform?",
            subtitle:
              "We provide advanced legal solutions that combine technology and human expertise",
            features: {
              fast: {
                title: "Fast Consultation",
                description:
                  "Get instant and accurate legal answers powered by AI",
              },
              secure: {
                title: "Data Protection",
                description:
                  "All your consultations and documents are secured with top-level standards",
              },
              lawyers: {
                title: "Lawyer Network",
                description:
                  "Connect with specialized lawyers for personal consultation",
              },
              sources: {
                title: "Verified Sources",
                description:
                  "All answers are based on official Egyptian laws and rulings",
              },
            },
          },
          cta: {
            title: "Ready to Start?",
            subtitle:
              "Join thousands of users who rely on our platform for legal assistance",
            button: "Start Free Now",
            privacy: "Learn more about privacy",
          },
          footer: {
            location: "Egypt - Cairo",
            copyright: "© 2024 Smart Legal Agent. All rights reserved.",
            privacyPolicy: "Privacy Policy",
            terms: "Terms of Use",
          },
        },
      },
    },
  },
  lng: savedLang, // اللغة الافتراضية
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
