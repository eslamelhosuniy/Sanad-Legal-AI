import React, { useState } from 'react';
import { Search, Star, MapPin, Phone, Mail, Calendar, Clock, Award, Filter } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Button from '../components/UI/Button';

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewsCount: number;
  location: string;
  experience: string;
  hourlyRate: string;
  avatar: string;
  isOnline: boolean;
  languages: string[];
  achievements: string[];
}

const LawyersDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const specializations = [
    'القانون المدني',
    'قانون العمل',
    'قانون الأسرة',
    'القانون التجاري',
    'القانون الجنائي',
    'قانون العقارات',
    'قانون الشركات',
    'قانون الملكية الفكرية'
  ];

  const locations = [
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'شبرا الخيمة',
    'بورسعيد',
    'السويس',
    'الأقصر',
    'أسوان'
  ];

  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'د. أحمد محمود',
      specialization: 'القانون المدني والعقود',
      rating: 4.9,
      reviewsCount: 127,
      location: 'القاهرة - وسط البلد',
      experience: '15 سنة',
      hourlyRate: '500 ج.م/ساعة',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      languages: ['العربية', 'الإنجليزية'],
      achievements: ['محامي معتمد لدى نقابة المحامين', 'خبير في قانون العقود']
    },
    {
      id: '2',
      name: 'د. سارة إبراهيم',
      specialization: 'قانون الأسرة والأحوال الشخصية',
      rating: 4.8,
      reviewsCount: 89,
      location: 'الجيزة - المهندسين',
      experience: '12 سنة',
      hourlyRate: '450 ج.م/ساعة',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      languages: ['العربية', 'الفرنسية'],
      achievements: ['متخصصة في قضايا الأسرة', 'عضو في جمعية المحاميات']
    },
    {
      id: '3',
      name: 'د. محمد علي',
      specialization: 'القانون التجاري والشركات',
      rating: 4.7,
      reviewsCount: 203,
      location: 'القاهرة - النزهة الجديدة',
      experience: '18 سنة',
      hourlyRate: '600 ج.م/ساعة',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      languages: ['العربية', 'الإنجليزية', 'الألمانية'],
      achievements: ['خبير في قانون الشركات', 'مستشار قانوني للعديد من الشركات']
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-darker">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-neutral-dark dark:text-white mb-2">
                شبكة المحامين المتخصصين
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                تواصل مع محامين خبراء للحصول على استشارة قانونية شخصية
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6 mb-8">
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-medium w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو التخصص..."
                    className="w-full pr-12 pl-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium text-neutral-dark dark:text-white placeholder-neutral-medium focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Filter className="w-4 h-4" />
                  <span>فلترة</span>
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-medium">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                      التخصص
                    </label>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    >
                      <option value="">جميع التخصصات</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                      الموقع
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    >
                      <option value="">جميع المواقع</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                      نطاق السعر
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    >
                      <option value="">جميع الأسعار</option>
                      <option value="0-300">أقل من 300 ج.م</option>
                      <option value="300-500">300-500 ج.م</option>
                      <option value="500-800">500-800 ج.م</option>
                      <option value="800+">أكثر من 800 ج.م</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-card p-6 text-white">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">1,200+</div>
                    <div className="text-blue-100 text-sm">محامي متخصص</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-card p-6 text-white">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">24/7</div>
                    <div className="text-green-100 text-sm">متاح دائماً</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-card p-6 text-white">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">4.8</div>
                    <div className="text-purple-100 text-sm">متوسط التقييم</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lawyers List */}
            <div className="space-y-6">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-6 space-x-reverse">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={lawyer.avatar}
                        alt={lawyer.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      {lawyer.isOnline && (
                        <div className="absolute bottom-0 left-0 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-neutral-dark"></div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-dark dark:text-white mb-1">
                            {lawyer.name}
                          </h3>
                          <p className="text-accent-purple font-medium mb-2">
                            {lawyer.specialization}
                          </p>
                        </div>
                        
                        <div className="text-left">
                          <div className="text-lg font-semibold text-neutral-dark dark:text-white">
                            {lawyer.hourlyRate}
                          </div>
                          <div className="text-sm text-neutral-medium dark:text-neutral-light">
                            {lawyer.isOnline ? 'متاح الآن' : 'غير متاح'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 space-x-reverse mb-3">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {renderStars(lawyer.rating)}
                          <span className="text-sm font-medium text-neutral-dark dark:text-white mr-1">
                            {lawyer.rating}
                          </span>
                          <span className="text-sm text-neutral-medium dark:text-neutral-light">
                            ({lawyer.reviewsCount} تقييم)
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 space-x-reverse text-sm text-neutral-medium dark:text-neutral-light">
                          <MapPin className="w-4 h-4" />
                          <span>{lawyer.location}</span>
                        </div>

                        <div className="flex items-center space-x-1 space-x-reverse text-sm text-neutral-medium dark:text-neutral-light">
                          <Award className="w-4 h-4" />
                          <span>{lawyer.experience} خبرة</span>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex items-center space-x-2 space-x-reverse mb-3">
                        <span className="text-sm text-neutral-medium dark:text-neutral-light">اللغات:</span>
                        {lawyer.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-neutral-medium text-neutral-dark dark:text-white px-2 py-1 rounded-full text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        {lawyer.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center space-x-2 space-x-reverse text-sm text-neutral-medium dark:text-neutral-light mb-1">
                            <Award className="w-3 h-3 text-accent-purple" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Button size="sm" className="flex items-center space-x-2 space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>احجز استشارة</span>
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex items-center space-x-2 space-x-reverse"
                        >
                          <Mail className="w-4 h-4" />
                          <span>أرسل رسالة</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2 space-x-reverse"
                        >
                          <Phone className="w-4 h-4" />
                          <span>اتصال سريع</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                عرض المزيد من المحامين
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LawyersDashboard;