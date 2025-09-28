import React from 'react';
import { MessageCircle, FileText, Search, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Button from '../components/UI/Button';
import { useAuth } from '../contexts/AuthContext';

const MainDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();


  const quickActions = [
    {
      title: t("quickActions.consultation.title"),
      description: t("quickActions.consultation.description"),
      icon: MessageCircle,
      path: '/consultation',
      color: 'bg-blue-500'
    },
    {
      title: t("quickActions.document.title"),
      description: t("quickActions.document.description"),
      icon: FileText,
      path: '/documents',
      color: 'bg-green-500'
    },
    {
      title: t("quickActions.research.title"),
      description: t("quickActions.research.description"),
      icon: Search,
      path: '/research',
      color: 'bg-purple-500'
    },
    {
      title: t("quickActions.lawyer.title"),
      description: t("quickActions.lawyer.description"),
      icon: Users,
      path: '/lawyers',
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      type: 'consultation',
      title: t("recentActivity.items.consultation"),
      time: t("recentActivity.items.time1"),
      status: t("recentActivity.items.status")
    },
    {
      type: 'document',
      title: t("recentActivity.items.document"),
      time: t("recentActivity.items.time2"),
      status: t("recentActivity.items.status")
    },
    {
      type: 'research',
      title: t("recentActivity.items.research"),
      time: t("recentActivity.items.time3"),
      status: t("recentActivity.items.status")
    }
  ];

  const stats = [
    { label: t("stats.consultations"), value: '12', icon: MessageCircle, trend: '+3' },
    { label: t("stats.documents"), value: '8', icon: FileText, trend: '+2' },
    { label: t("stats.research"), value: '15', icon: Search, trend: '+5' },
    { label: t("stats.responseTime"), value: '< 30s', icon: Clock, trend: 'محسّن' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-darker">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-neutral-dark dark:text-white mb-2">
                {t("welcome", { name: user?.name })}
              </h1>
              <p className="text-neutral-medium dark:text-neutral-light">
                {t("subtitle")}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white dark:bg-neutral-dark p-6 rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-5 h-5 text-accent-purple" />
                      <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-2xl font-semibold text-neutral-dark dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-medium dark:text-neutral-light">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral-dark dark:text-white mb-6">
                {t("quickActions.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.path}
                      className="group bg-white dark:bg-neutral-dark p-6 rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-neutral-dark dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-neutral-medium dark:text-neutral-light leading-relaxed">
                        {action.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-dark dark:text-white">
                      {t("recentActivity.title")}
                    </h2>
                 
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 dark:bg-neutral-medium rounded-lg">
                        <div className="w-10 h-10 bg-accent-purple/10 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-accent-purple" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-dark dark:text-white">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-neutral-medium dark:text-neutral-light">
                            {activity.time} • {activity.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-accent-purple to-purple-600 rounded-card p-6 text-white">
                  <Shield className="w-8 h-8 mb-4 opacity-80" />
                  <h3 className="font-semibold mb-2">{t("tips.title")}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {t("tips.content")}
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-dark rounded-card shadow-sm border border-gray-200 dark:border-neutral-medium p-6">
                  <h3 className="font-semibold text-neutral-dark dark:text-white mb-4">
                    {t("updates.title")}
                  </h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium text-neutral-dark dark:text-white mb-1">
                        {t("updates.taxLaw.title")}
                      </div>
                      <div className="text-neutral-medium dark:text-neutral-light">
                        {t("updates.taxLaw.desc")}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-neutral-dark dark:text-white mb-1">
                        {t("updates.dataLaw.title")}
                      </div>
                      <div className="text-neutral-medium dark:text-neutral-light">
                        {t("updates.dataLaw.desc")}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    {t("updates.showAll")}
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

export default MainDashboard;
