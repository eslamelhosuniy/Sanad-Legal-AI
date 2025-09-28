// UserProfile.tsx
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
} from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Button from "../components/UI/Button";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  profession: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const { t } = useTranslation();

  const initialUserData: UserData = {
    id: user?.id ?? "",
    name: (user as any)?.name ?? "",
    email: (user as any)?.email ?? "",
    phone: (user as any)?.phone ?? "",
    location: (user as any)?.location ?? "",
    birthDate: (user as any)?.birthDate ?? "",
    profession: (user as any)?.profession ?? "",
    bio: (user as any)?.bio ?? "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  console.log(user);

  const [editData, setEditData] = useState<UserData>(initialUserData);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = async () => {
    if (!user?.id) {
      alert(t("profile.noUserId", "لا يوجد معرف مستخدم."));
      return;
    }

    setLoading(true);
    try {
      
      await updateUser(editData);

      
      setUserData(editData);
      setEditData(editData);
      setIsEditing(false);

      console.log("Profile updated successfully");
    } catch (err: any) {
      console.error("Error updating user:", err);
     
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const consultationStats = [
    {
      label: t("profile.stats.consultations.label"),
      value: "24",
      trend: t("profile.stats.consultations.trend"),
    },
    {
      label: t("profile.stats.documents.label"),
      value: "12",
      trend: t("profile.stats.documents.trend"),
    },
    {
      label: t("profile.stats.research.label"),
      value: "38",
      trend: t("profile.stats.research.trend"),
    },
    {
      label: t("profile.stats.memberSince.label"),
      value: "يناير 2023",
      trend: t("profile.stats.memberSince.trend"),
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
                {t("profile.title")}
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                {t("profile.subtitle")}
              </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium mb-8">
              <div className="p-8">
                <div className="flex items-start space-x-6 space-x-reverse">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-neutral-dark dark:text-white mb-1">
                          {userData.name}
                        </h2>
                        <p className="text-neutral-medium dark:text-neutral-light">
                          {userData.profession}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        {!isEditing ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEdit}
                            className="flex items-center space-x-2 space-x-reverse"
                          >
                            <Edit className="w-4 h-4" />
                            <span>{t("profile.edit")}</span>
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={loading}
                              className="flex items-center space-x-2 space-x-reverse"
                            >
                              {loading ? (
                                <span>
                                  {t("profile.saving", "جاري الحفظ...")}
                                </span>
                              ) : (
                                <>
                                  <Save className="w-4 h-4" />
                                  <span>{t("profile.save")}</span>
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancel}
                              disabled={loading}
                              className="flex items-center space-x-2 space-x-reverse"
                            >
                              <X className="w-4 h-4" />
                              <span>{t("profile.cancel")}</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-neutral-dark dark:text-white leading-relaxed">
                      {userData.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-6">
                    {t("profile.info")}
                  </h3>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.name")}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <User className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            {userData.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.email")}
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Mail className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            {userData.email}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.phone")}
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Phone className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            01234567890
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.location")}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) =>
                            handleChange("location", e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <MapPin className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            مصر القاهرة
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Birth Date */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.birthDate")}
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.birthDate}
                          onChange={(e) =>
                            handleChange("birthDate", e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Calendar className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            1999-01-01
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Profession */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.profession")}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.profession}
                          onChange={(e) =>
                            handleChange("profession", e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <User className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            محامى
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        {t("profile.fields.bio")}
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={4}
                          value={editData.bio}
                          onChange={(e) => handleChange("bio", e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none"
                        />
                      ) : (
                        <p className="text-neutral-dark dark:text-white leading-relaxed">
                          محامى بالنقض
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-6">
                    {t("profile.statsTitle")}
                  </h3>

                  <div className="space-y-4">
                    {consultationStats.map((stat, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 dark:border-neutral-medium last:border-0 pb-3 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-neutral-medium dark:text-neutral-light">
                            {stat.label}
                          </span>
                          <span className="font-semibold text-neutral-dark dark:text-white">
                            {stat.value}
                          </span>
                        </div>
                        <div className="text-xs text-accent-purple">
                          {stat.trend}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-card p-6 text-white">
                  <h3 className="font-semibold mb-2">
                    {t("profile.premium.title")}
                  </h3>
                  <p className="text-green-100 text-sm mb-4">
                    {t("profile.premium.desc")}
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    {t("profile.premium.upgrade")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
