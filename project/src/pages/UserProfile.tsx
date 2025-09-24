import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Button from '../components/UI/Button';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  profession: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'أحمد محمد علي',
    email: 'ahmed.mohamed@email.com',
    phone: '+20 123 456 7890',
    location: 'القاهرة، مصر',
    birthDate: '1985-05-15',
    profession: 'مهندس برمجيات',
    bio: 'مهندس برمجيات مهتم بالتكنولوجيا والقانون. أعمل في مجال تطوير التطبيقات منذ 10 سنوات.'
  });

  const [editData, setEditData] = useState<UserData>(userData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const consultationStats = [
    { label: 'إجمالي الاستشارات', value: '24', trend: '+3 هذا الشهر' },
    { label: 'المستندات المحللة', value: '12', trend: '+2 هذا الشهر' },
    { label: 'البحوث القانونية', value: '38', trend: '+8 هذا الشهر' },
    { label: 'عضو منذ', value: 'يناير 2023', trend: 'سنة واحدة' }
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
                الملف الشخصي
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                إدارة معلوماتك الشخصية وإعدادات حسابك
              </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium mb-8">
              <div className="p-8">
                <div className="flex items-start space-x-6 space-x-reverse">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-purple to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
                    {userData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  
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
                            <span>تعديل الملف</span>
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              className="flex items-center space-x-2 space-x-reverse"
                            >
                              <Save className="w-4 h-4" />
                              <span>حفظ</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancel}
                              className="flex items-center space-x-2 space-x-reverse"
                            >
                              <X className="w-4 h-4" />
                              <span>إلغاء</span>
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
                    المعلومات الشخصية
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        الاسم الكامل
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <User className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">{userData.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        البريد الإلكتروني
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Mail className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">{userData.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        رقم الهاتف
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Phone className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">{userData.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        الموقع
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <MapPin className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">{userData.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Birth Date */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        تاريخ الميلاد
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.birthDate}
                          onChange={(e) => handleChange('birthDate', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Calendar className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">
                            {new Date(userData.birthDate).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Profession */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        المهنة
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.profession}
                          onChange={(e) => handleChange('profession', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <User className="w-5 h-5 text-neutral-medium" />
                          <span className="text-neutral-dark dark:text-white">{userData.profession}</span>
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        نبذة شخصية
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={4}
                          value={editData.bio}
                          onChange={(e) => handleChange('bio', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none"
                        />
                      ) : (
                        <p className="text-neutral-dark dark:text-white leading-relaxed">
                          {userData.bio}
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
                    إحصائيات الاستخدام
                  </h3>
                  
                  <div className="space-y-4">
                    {consultationStats.map((stat, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-neutral-medium last:border-0 pb-3 last:pb-0">
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
                  <h3 className="font-semibold mb-2">عضوية مميزة</h3>
                  <p className="text-green-100 text-sm mb-4">
                    ترقى للعضوية المميزة للحصول على مزيد من المزايا
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    ترقية الحساب
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