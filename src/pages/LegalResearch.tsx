import React, { useState } from 'react';
import { Search, Filter, Calendar, Building, FileText, ExternalLink } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Button from '../components/UI/Button';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  court: string;
  year: string;
  summary: string;
  lawNumber?: string;
}

const LegalResearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLaw, setSelectedLaw] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const laws = [
    'القانون المدني',
    'قانون العمل',
    'قانون الأحوال الشخصية',
    'القانون التجاري',
    'القانون الجنائي',
    'قانون الإجراءات المدنية والتجارية'
  ];

  const rulingTypes = [
    'حكم نقض',
    'حكم استئناف',
    'حكم ابتدائي',
    'قرار إداري',
    'فتوى قانونية'
  ];

  const courts = [
    'محكمة النقض',
    'محكمة الاستئناف',
    'المحكمة الابتدائية',
    'المحكمة الإدارية العليا',
    'مجلس الدولة'
  ];

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'حكم محكمة النقض في قضية فسخ عقد البيع لعدم دفع الثمن',
      type: 'حكم نقض',
      court: 'محكمة النقض',
      year: '2023',
      summary: 'قضت المحكمة بأن عدم دفع المشتري لثمن المبيع في الموعد المحدد يعطي البائع الحق في فسخ العقد والمطالبة بالتعويض...',
      lawNumber: 'الطعن رقم 1234 لسنة 2023'
    },
    {
      id: '2',
      title: 'تفسير المادة 147 من القانون المدني المصري',
      type: 'فتوى قانونية',
      court: 'مجلس الدولة',
      year: '2023',
      summary: 'تنص المادة على أن العقد يفسر وفقاً لقصد المتعاقدين الحقيقي، ويجب البحث عن هذا القصد من خلال عبارات العقد...'
    },
    {
      id: '3',
      title: 'قرار بشأن تطبيق قانون العمل الجديد',
      type: 'قرار إداري',
      court: 'وزارة القوى العاملة',
      year: '2024',
      summary: 'يسري قانون العمل الجديد على جميع العلاقات التعاقدية الجديدة اعتباراً من تاريخ نشره في الجريدة الرسمية...'
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const clearFilters = () => {
    setSelectedLaw('');
    setSelectedYear('');
    setSelectedType('');
    setSelectedCourt('');
    setSearchQuery('');
    setSearchResults([]);
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
                البحث القانوني المتقدم
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                ابحث في القوانين والأحكام والقرارات القضائية المصرية
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6 sticky top-8">
                  <div className="flex items-center space-x-2 space-x-reverse mb-6">
                    <Filter className="w-5 h-5 text-accent-purple" />
                    <h2 className="text-lg font-semibold text-neutral-dark dark:text-white">
                      تصفية النتائج
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Law Filter */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        القانون
                      </label>
                      <select
                        value={selectedLaw}
                        onChange={(e) => setSelectedLaw(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                      >
                        <option value="">جميع القوانين</option>
                        {laws.map((law) => (
                          <option key={law} value={law}>{law}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        السنة
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                      >
                        <option value="">جميع السنوات</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                      </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        نوع الحكم
                      </label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                      >
                        <option value="">جميع الأنواع</option>
                        {rulingTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Court Filter */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark dark:text-white mb-2">
                        المحكمة
                      </label>
                      <select
                        value={selectedCourt}
                        onChange={(e) => setSelectedCourt(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-3 py-2 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                      >
                        <option value="">جميع المحاكم</option>
                        {courts.map((court) => (
                          <option key={court} value={court}>{court}</option>
                        ))}
                      </select>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      مسح الفلاتر
                    </Button>
                  </div>
                </div>
              </div>

              {/* Search and Results */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6 mb-8">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex-1 relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-medium w-5 h-5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث في القوانين والأحكام..."
                        className="w-full pr-12 pl-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium text-neutral-dark dark:text-white placeholder-neutral-medium focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="px-8"
                    >
                      {isSearching ? 'جاري البحث...' : 'بحث'}
                    </Button>
                  </div>

                  {/* Active Filters */}
                  {(selectedLaw || selectedYear || selectedType || selectedCourt) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedLaw && (
                        <span className="bg-accent-purple/10 text-accent-purple px-3 py-1 rounded-full text-sm">
                          {selectedLaw}
                        </span>
                      )}
                      {selectedYear && (
                        <span className="bg-accent-purple/10 text-accent-purple px-3 py-1 rounded-full text-sm">
                          {selectedYear}
                        </span>
                      )}
                      {selectedType && (
                        <span className="bg-accent-purple/10 text-accent-purple px-3 py-1 rounded-full text-sm">
                          {selectedType}
                        </span>
                      )}
                      {selectedCourt && (
                        <span className="bg-accent-purple/10 text-accent-purple px-3 py-1 rounded-full text-sm">
                          {selectedCourt}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Loading State */}
                {isSearching && (
                  <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-12 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                      جاري البحث...
                    </h3>
                    <p className="text-neutral-medium dark:text-neutral-light">
                      نبحث في قاعدة البيانات القانونية
                    </p>
                  </div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-neutral-dark dark:text-white">
                        نتائج البحث ({searchResults.length})
                      </h2>
                    </div>

                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2 leading-tight">
                              {result.title}
                            </h3>
                            
                            <div className="flex items-center space-x-4 space-x-reverse mb-3 text-sm text-neutral-medium dark:text-neutral-light">
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <FileText className="w-4 h-4" />
                                <span>{result.type}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Building className="w-4 h-4" />
                                <span>{result.court}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Calendar className="w-4 h-4" />
                                <span>{result.year}</span>
                              </div>
                            </div>

                            {result.lawNumber && (
                              <div className="text-sm text-accent-purple font-medium mb-3">
                                {result.lawNumber}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-neutral-dark dark:text-white leading-relaxed mb-4">
                          {result.summary}
                        </p>

                        <div className="flex items-center space-x-3 space-x-reverse pt-3 border-t border-gray-200 dark:border-neutral-medium">
                          <Button size="sm" className="flex items-center space-x-2 space-x-reverse">
                            <ExternalLink className="w-4 h-4" />
                            <span>اقرأ المزيد</span>
                          </Button>
                          
                          <button className="text-accent-purple hover:text-purple-600 text-sm font-medium transition-colors">
                            حفظ في المفضلة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {searchResults.length === 0 && !isSearching && searchQuery && (
                  <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-12 text-center">
                    <Search className="w-12 h-12 text-neutral-medium mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-dark dark:text-white mb-2">
                      لم يتم العثور على نتائج
                    </h3>
                    <p className="text-neutral-medium dark:text-neutral-light mb-4">
                      جرب تعديل مصطلحات البحث أو استخدام فلاتر أقل تقييداً
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      مسح الفلاتر وإعادة البحث
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LegalResearch;