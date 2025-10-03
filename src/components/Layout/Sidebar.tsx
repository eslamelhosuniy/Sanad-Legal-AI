import { useState } from "react";
import {
  User,
  MessageSquare,
  FileText,
  Settings,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import PopUp from "../UI/PopUp";

function Sidebar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const { deleteUser, user } = useAuth();
  function togglePop() {
    setPop(!pop);
  }

  // const deleteUser = async (id?: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://sanad-backend-production-cbbc.up.railway.app/api/User/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // لو عندك JWT Token لازم تضيفه هنا 👇
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to delete user");
  //     }

  //     console.log("User deleted successfully");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const sidebarItems = [
    {
      section: t("sidebar.profile"),
      items: [{ path: "/profile", icon: User, label: t("sidebar.my_data") }],
    },
    {
      section: t("sidebar.consultations_documents"),
      items: [
        {
          path: "/consultation-history",
          icon: MessageSquare,
          label: t("sidebar.consultation_history"),
        },
        {
          path: "/documents",
          icon: FileText,
          label: t("sidebar.uploaded_documents"),
        },
      ],
    },
    {
      section: t("sidebar.settings"),
      items: [{ path: "/privacy", icon: Shield, label: t("sidebar.privacy") }],
    },
  ];
  // console.log(user?.id);

  return (
    <>
      {/* زرار فتح الـ Sidebar في الشاشات الصغيرة */}
      <button
        className={`md:hidden fixed top-12 w-10 h-10  z-100 bg-accent-purple text-white p-2 ${
          i18n.language === "ar" ? "rounded-l-2xl" : "rounded-r-2xl"
        } shadow-lg`}
        onClick={() => setIsOpen(true)}
      >
        <User className="w-6 h-6" />
      </button>

      {/* Overlay لما الـ Sidebar مفتوح */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 h-full w-64 bg-white dark:bg-neutral-darker 
  border-gray-200 dark:border-neutral-dark overflow-y-auto transform transition-transform z-40
  ${
    isOpen
      ? "translate-x-0"
      : i18n.language === "ar"
      ? "translate-x-full right-0 border-l"
      : "-translate-x-full left-0 border-r"
  } md:translate-x-0`}
      >
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-dark dark:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-accent-purple to-purple-600 rounded-card p-4 mb-6">
            <div className="flex items-center  mb-3">
              <div className="w-12 mx-2 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6  h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{user?.name}</h3>
                <p className="text-white/80 text-sm">{user?.role}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-6">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h4 className="font-medium text-neutral-dark dark:text-white mb-3 text-sm">
                  {section.section}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-accent-purple text-white"
                              : "text-neutral-medium hover:bg-secondary-lavender dark:hover:bg-neutral-dark hover:text-neutral-dark dark:hover:text-white"
                          }`}
                          onClick={() => setIsOpen(false)} // يقفل الـ Sidebar بعد الضغط
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-card border border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h4 className="font-medium text-red-800 dark:text-red-300 text-sm">
                {t("sidebar.delete-section.delete-data")}
              </h4>
            </div>
            <p className="text-red-600 dark:text-red-400 text-xs mb-3">
              {t("sidebar.delete-section.delete-par")}
            </p>
            <button
              onClick={togglePop}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {t("sidebar.delete-section.delete-immediatly")}
            </button>
          </div>
        </div>
      </aside>
      {pop && (
        <PopUp onClose={togglePop}>
          <p className="text-red-600 dark:text-red-400 text-lg mb-3">
            {t("sidebar.delete-section.delete-par")}
          </p>
          <button
            onClick={() => deleteUser(user?.id)}
            className=" bg-red-600 p-2 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            {t("sidebar.delete-section.delete-immediatly")}
          </button>
        </PopUp>
      )}
    </>
  );
}

export default Sidebar;
