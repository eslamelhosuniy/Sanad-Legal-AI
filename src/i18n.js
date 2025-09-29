import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const savedLang = localStorage.getItem("lang");
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
          logout: "تسجيل خروج",
          hero: {
            title: "الوصول السريع والدقيق للمعلومات القانوني في مصر",
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
        }, // جوه resources.ar.translation
        profile: {
          title: "الملف الشخصي",
          subtitle: "إدارة معلوماتك الشخصية وإعدادات حسابك",
          edit: "تعديل الملف",
          save: "حفظ",
          cancel: "إلغاء",
          info: "المعلومات الشخصية",
          fields: {
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            location: "الموقع",
            birthDate: "تاريخ الميلاد",
            profession: "المهنة",
            bio: "نبذة شخصية",
          },
          statsTitle: "إحصائيات الاستخدام",
          stats: {
            consultations: {
              label: "إجمالي الاستشارات",
              trend: "+3 هذا الشهر",
            },
            documents: {
              label: "المستندات المحللة",
              trend: "+2 هذا الشهر",
            },
            research: {
              label: "البحوث القانونية",
              trend: "+8 هذا الشهر",
            },
            memberSince: {
              label: "عضو منذ",
              trend: "سنة واحدة",
            },
          },
          premium: {
            title: "عضوية مميزة",
            desc: "ترقى للعضوية المميزة للحصول على مزيد من المزايا",
            upgrade: "ترقية الحساب",
          },
        },
        uploadDocuments: {
          title: "تحليل المستندات القانونية",
          subtitle:
            "ارفع عقد أو مستند قانوني واحصل على تحليل شامل مع الملاحظات والاقتراحات",

          uploadSection: {
            heading: "ارفع مستندك القانوني",
            description: "ندعم ملفات PDF, DOC, DOCX حتى 10 ميجابايت",
            button: "اختر ملف",
            analyze: "ابدأ التحليل",
            analyzing: "جاري التحليل...",
            cancel: "إلغاء",
          },

          loading: {
            title: "جاري تحليل المستند...",
            desc: "قد يستغرق هذا بضع دقائق حسب حجم وتعقد المستند",
          },

          results: {
            summary: "ملخص المستند",
            keyPoints: "النقاط الرئيسية",
            observations: "الملاحظات القانونية",
            suggestions: "التوصيات والاقتراحات",
          },

          actions: {
            download: "تحميل التقرير",
            preview: "معاينة التقرير",
            analyzeAnother: "تحليل مستند آخر",
          },
        },
        lawyers: {
          title: "شبكة المحامين المتخصصين",
          subtitle: "تواصل مع محامين خبراء للحصول على استشارة قانونية شخصية",
          searchPlaceholder: "ابحث بالاسم أو التخصص...",
          filters: {
            title: "فلترة",
            specialization: "التخصص",
            location: "الموقع",
            priceRange: "نطاق السعر",
            allSpecializations: "جميع التخصصات",
            allLocations: "جميع المواقع",
            allPrices: "جميع الأسعار",
            priceOptions: {
              "0-300": "أقل من 300 ج.م",
              "300-500": "300-500 ج.م",
              "500-800": "500-800 ج.م",
              "800+": "أكثر من 800 ج.م",
            },
          },
          stats: {
            lawyers: "محامي متخصص",
            availability: "متاح دائماً",
            rating: "متوسط التقييم",
          },
          lawyerCard: {
            experience: "خبرة",
            languages: "اللغات",
            reviews: "{{count}} تقييم",
            available: "متاح الآن",
            notAvailable: "غير متاح",
            actions: {
              book: "احجز استشارة",
              soon: "قريباً",
              message: "أرسل رسالة",
              call: "اتصال سريع",
            },
          },
          loadMore: "عرض المزيد من المحامين",
        },
        privacy: {
          title: "الخصوصية والأمان",
          subtitle:
            "نحن ملتزمون بحماية خصوصيتك وأمان بياناتك بأعلى معايير الحماية",
          overview: {
            title: "حماية شاملة لبياناتك",
            description:
              "نطبق أحدث تقنيات الأمان والتشفير لضمان سرية معلوماتك القانونية",
            aes: "تشفير AES",
            uptime: "وقت التشغيل",
            monitoring: "مراقبة أمنية",
          },
          featuresTitle: "ميزات الخصوصية والأمان",
          statuses: {
            active: "نشط",
            available: "متاح",
          },
          features: {
            encryption: {
              title: "تشفير البيانات",
              description:
                "جميع بياناتك محمية بتشفير AES-256 من الطراز العسكري",
            },
            noSharing: {
              title: "عدم المشاركة",
              description: "لا نشارك بياناتك الشخصية مع أطراف ثالثة أبداً",
            },
            advancedProtection: {
              title: "حماية متقدمة",
              description:
                "أنظمة حماية متطورة ضد الاختراقات والهجمات السيبرانية",
            },
            deleteData: {
              title: "حذف البيانات",
              description: "يمكنك حذف جميع بياناتك نهائياً في أي وقت",
            },
          },
          dataManagement: {
            title: "إدارة البيانات",
            subtitle:
              "فيما يلي تفصيل للبيانات التي نحتفظ بها ومدة الاحتفاظ بها",
            types: {
              personal: {
                type: "المعلومات الشخصية",
                description: "الاسم، البريد الإلكتروني، رقم الهاتف",
                retention: "5 سنوات",
              },
              consultations: {
                type: "الاستشارات القانونية",
                description: "الأسئلة والإجابات والمحادثات",
                retention: "7 سنوات",
              },
              documents: {
                type: "المستندات المرفوعة",
                description: "العقود والملفات التي تم تحليلها",
                retention: "3 سنوات",
              },
              usage: {
                type: "بيانات الاستخدام",
                description: "إحصائيات الاستخدام وسجل الأنشطة",
                retention: "سنة واحدة",
              },
            },
            deleteBtn: "حذف هذه البيانات",
          },
          actions: {
            download: {
              title: "تحميل بياناتك",
              description: "احصل على نسخة من جميع البيانات المحفوظة في حسابك",
              btn: "طلب تحميل البيانات",
            },
            settings: {
              title: "إعدادات الخصوصية",
              description: "تحكم في كيفية استخدام بياناتك ومشاركتها",
              btn: "إدارة الإعدادات",
            },
          },
          dangerZone: {
            title: "منطقة الخطر",
            warning:
              "احذف جميع بياناتك نهائياً من النظام. هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى:",
            list: [
              "حذف جميع الاستشارات والمحادثات",
              "حذف جميع المستندات المرفوعة",
              "حذف الملف الشخصي والإعدادات",
              "إغلاق الحساب نهائياً",
            ],
            btn: "احذف بياناتي نهائياً",
          },
          contact: {
            question: "هل لديك أسئلة حول سياسة الخصوصية أو أمان البيانات؟",
            btn: "تواصل مع فريق الأمان",
          },
        },
        consultationHistory: {
          title: "تاريخ الاستشارات السابقة",
          delete: "حذف",
        },
        register: {
          title: "إنشاء حسابك",
          subtitle:
            "انضم لآلاف المستخدمين الذين يتحدثون مع الذكاء الاصطناعي يومياً",
          form: {
            namePlaceholder: "أدخل اسمك",
            emailPlaceholder: "أدخل بريدك الإلكتروني",
            passwordPlaceholder: "إنشاء كلمة مرور",
            confirmPasswordPlaceholder: "تأكيد كلمة المرور",
            passwordNote: "يجب أن تكون أكثر من 6 أحرف",
          },
          errors: {
            passwordMismatch: "كلمات المرور غير متطابقة",
            registerFailed: "فشل التسجيل",
          },
          buttons: {
            signUp: "إنشاء حساب",
            connecting: "جارٍ الاتصال...",
          },
          alreadyHaveAccount: "هل لديك حساب بالفعل؟",
          login: "تسجيل الدخول",
        },
        login: {
          title: "مرحبًا بعودتك",
          subtitle: "قم بتسجيل الدخول لمواصلة الدردشة مع الذكاء الاصطناعي",
          form: {
            emailPlaceholder: "أدخل بريدك الإلكتروني",
            passwordPlaceholder: "كلمة المرور",
          },
          forgotPassword: "نسيت كلمة المرور؟",
          buttons: {
            login: "تسجيل الدخول",
            connecting: "جارٍ الاتصال...",
          },
          noAccount: "ليس لديك حساب؟",
          register: "اشتراك",
          errors: {
            loginFailed: "فشل تسجيل الدخول",
          },
        },
        verifyEmail: {
          title: "تأكيد البريد الإلكتروني",
          invalidLink: "رابط التحقق غير صالح.",
          success: "تم التحقق من البريد الإلكتروني بنجاح!",
          failed: "فشل التحقق. يرجى المحاولة مرة أخرى.",
          error: "حدث خطأ. يرجى المحاولة لاحقاً.",
          goToLogin: "اذهب إلى تسجيل الدخول",
        },
        waitingVerifyEmail: {
          title: "تحقق من بريدك الإلكتروني",
          subtitle: "لقد اقتربنا من النهاية!",
          description:
            "لقد أرسلنا رابط التحقق إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد والنقر على الرابط لتفعيل حسابك.",
          goToLogin: "اذهب إلى تسجيل الدخول",
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
          logout: "Logout",
          hero: {
            title: "Fast and Accurate Access to Legal Information in Egypt",
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
        profile: {
          title: "Profile",
          subtitle: "Manage your personal information and account settings",
          edit: "Edit Profile",
          save: "Save",
          cancel: "Cancel",
          info: "Personal Information",
          fields: {
            name: "Full Name",
            email: "Email",
            phone: "Phone",
            location: "Location",
            birthDate: "Birth Date",
            profession: "Profession",
            bio: "Bio",
          },
          statsTitle: "Usage Statistics",
          stats: {
            consultations: {
              label: "Total Consultations",
              trend: "+3 this month",
            },
            documents: {
              label: "Analyzed Documents",
              trend: "+2 this month",
            },
            research: {
              label: "Legal Research",
              trend: "+8 this month",
            },
            memberSince: {
              label: "Member Since",
              trend: "1 year",
            },
          },
          premium: {
            title: "Premium Membership",
            desc: "Upgrade to premium membership for more features",
            upgrade: "Upgrade Account",
          },
        },
        uploadDocuments: {
          title: "Legal Document Analysis",
          subtitle:
            "Upload a contract or legal document and get a full analysis with notes and suggestions",

          uploadSection: {
            heading: "Upload your document",
            description: "We support PDF, DOC, DOCX files up to 10 MB",
            button: "Choose File",
            analyze: "Start Analysis",
            analyzing: "Analyzing...",
            cancel: "Cancel",
          },

          loading: {
            title: "Analyzing document...",
            desc: "This may take a few minutes depending on the size and complexity",
          },

          results: {
            summary: "Document Summary",
            keyPoints: "Key Points",
            observations: "Legal Observations",
            suggestions: "Recommendations & Suggestions",
          },

          actions: {
            download: "Download Report",
            preview: "Preview Report",
            analyzeAnother: "Analyze Another Document",
          },
        },
        lawyers: {
          title: "Specialized Lawyers Network",
          subtitle:
            "Connect with expert lawyers for personalized legal consultation",
          searchPlaceholder: "Search by name or specialization...",
          filters: {
            title: "Filter",
            specialization: "Specialization",
            location: "Location",
            priceRange: "Price Range",
            allSpecializations: "All specializations",
            allLocations: "All locations",
            allPrices: "All prices",
            priceOptions: {
              "0-300": "Less than 300 EGP",
              "300-500": "300-500 EGP",
              "500-800": "500-800 EGP",
              "800+": "More than 800 EGP",
            },
          },
          stats: {
            lawyers: "Specialized Lawyers",
            availability: "Always available",
            rating: "Average Rating",
          },
          lawyerCard: {
            experience: "Experience",
            languages: "Languages",
            reviews: "{{count}} reviews",
            available: "Available now",
            notAvailable: "Not available",
            actions: {
              book: "Book Consultation",
              soon: "Coming Soon",
              message: "Send Message",
              call: "Quick Call",
            },
          },
          loadMore: "Load more lawyers",
        },
        privacy: {
          title: "Privacy & Security",
          subtitle:
            "We are committed to protecting your privacy and the security of your data with the highest standards",
          overview: {
            title: "Comprehensive Data Protection",
            description:
              "We apply the latest security and encryption technologies to ensure the confidentiality of your legal information",
            aes: "AES Encryption",
            uptime: "Uptime",
            monitoring: "Security Monitoring",
          },
          featuresTitle: "Privacy & Security Features",
          statuses: {
            active: "Active",
            available: "Available",
          },
          features: {
            encryption: {
              title: "Data Encryption",
              description:
                "All your data is protected with military-grade AES-256 encryption",
            },
            noSharing: {
              title: "No Sharing",
              description:
                "We never share your personal data with third parties",
            },
            advancedProtection: {
              title: "Advanced Protection",
              description:
                "Advanced security systems against breaches and cyberattacks",
            },
            deleteData: {
              title: "Data Deletion",
              description:
                "You can permanently delete all your data at any time",
            },
          },
          dataManagement: {
            title: "Data Management",
            subtitle:
              "Below is a breakdown of the data we retain and the retention periods",
            types: {
              personal: {
                type: "Personal Information",
                description: "Name, email, phone number",
                retention: "5 years",
              },
              consultations: {
                type: "Legal Consultations",
                description: "Questions, answers, and conversations",
                retention: "7 years",
              },
              documents: {
                type: "Uploaded Documents",
                description: "Contracts and files that have been analyzed",
                retention: "3 years",
              },
              usage: {
                type: "Usage Data",
                description: "Usage statistics and activity logs",
                retention: "1 year",
              },
            },
            deleteBtn: "Delete this data",
          },
          actions: {
            download: {
              title: "Download Your Data",
              description: "Get a copy of all the data stored in your account",
              btn: "Request Data Download",
            },
            settings: {
              title: "Privacy Settings",
              description: "Control how your data is used and shared",
              btn: "Manage Settings",
            },
          },
          dangerZone: {
            title: "Danger Zone",
            warning:
              "Permanently delete all your data from the system. This action cannot be undone and will result in:",
            list: [
              "Delete all consultations and conversations",
              "Delete all uploaded documents",
              "Delete profile and settings",
              "Close the account permanently",
            ],
            btn: "Delete My Data Permanently",
          },
          contact: {
            question:
              "Do you have questions about the privacy policy or data security?",
            btn: "Contact Security Team",
          },
        },
        consultationHistory: {
          title: "Convesations History",
          delete: "Delete",
        },
        register: {
          title: "Create Your Account",
          subtitle: "Join thousands who chat with AI daily",
          form: {
            namePlaceholder: "Enter your name",
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Create password",
            confirmPasswordPlaceholder: "Confirm password",
            passwordNote: "Must be 6+ characters",
          },
          errors: {
            passwordMismatch: "Passwords do not match",
            registerFailed: "Register failed",
          },
          buttons: {
            signUp: "SIGN UP",
            connecting: "Connecting...",
          },
          alreadyHaveAccount: "Already have an account?",
          login: "Login",
        },
        login: {
          title: "Welcome Back",
          subtitle: "Log in to continue chatting with AI",
          form: {
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Password",
          },
          forgotPassword: "Forgot password?",
          buttons: {
            login: "LOG IN",
            connecting: "Connecting...",
          },
          noAccount: "Don't have an account?",
          register: "Sign Up",
          errors: {
            loginFailed: "Login failed",
          },
        },
        verifyEmail: {
          title: "Email Verification",
          invalidLink: "Invalid verification link.",
          success: "Email verified successfully!",
          failed: "Verification failed. Please try again.",
          error: "An error occurred. Please try again later.",
          goToLogin: "Go to Login",
        },
        waitingVerifyEmail: {
          title: "Verify Your Email",
          subtitle: "Almost done!",
          description:
            "We’ve sent a verification link to your email. Please check your inbox and click the link to activate your account.",
          goToLogin: "Go to Login",
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
