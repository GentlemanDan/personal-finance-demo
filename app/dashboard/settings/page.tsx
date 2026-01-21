'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { 
  User,
  Tag,
  Globe,
  Bell,
  Download,
  Upload,
  Palette,
  Shield,
  ChevronRight,
  Check,
  Plus,
  Edit2,
  Trash2,
  Utensils,
  Car,
  Home,
  Heart,
  Gamepad2,
  ShoppingBag,
  GraduationCap,
  Smartphone,
  Briefcase,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { settings, categories, currency } = translations;

// Секции настроек
const settingsSections = [
  { id: 'profile', label: settings.profile, icon: User },
  { id: 'categories', label: settings.categories, icon: Tag },
  { id: 'currency', label: settings.currency, icon: Globe },
  { id: 'notifications', label: settings.notifications, icon: Bell },
  { id: 'export', label: settings.export, icon: Download },
  { id: 'import', label: settings.import, icon: Upload },
  { id: 'theme', label: settings.theme, icon: Palette },
];

// Категории пользователя
const userCategories = [
  { id: 1, name: categories.food, icon: Utensils, color: '#10b981', type: 'expense' },
  { id: 2, name: categories.transport, icon: Car, color: '#3b82f6', type: 'expense' },
  { id: 3, name: categories.housing, icon: Home, color: '#f59e0b', type: 'expense' },
  { id: 4, name: categories.health, icon: Heart, color: '#ec4899', type: 'expense' },
  { id: 5, name: categories.entertainment, icon: Gamepad2, color: '#ef4444', type: 'expense' },
  { id: 6, name: categories.shopping, icon: ShoppingBag, color: '#8b5cf6', type: 'expense' },
  { id: 7, name: categories.education, icon: GraduationCap, color: '#6366f1', type: 'expense' },
  { id: 8, name: categories.subscriptions, icon: Smartphone, color: '#06b6d4', type: 'expense' },
  { id: 9, name: categories.salary, icon: Briefcase, color: '#16a34a', type: 'income' },
  { id: 10, name: categories.freelance, icon: Briefcase, color: '#22c55e', type: 'income' },
];

// Валюты
const currencies = [
  { code: 'RUB', symbol: '₽', name: 'Российский рубль' },
  { code: 'USD', symbol: '$', name: 'Доллар США' },
  { code: 'EUR', symbol: '€', name: 'Евро' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedCurrency, setSelectedCurrency] = useState('RUB');
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReports: true,
    goalReminders: true,
    transactionNotifications: false,
  });
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  return (
    <div className="dashboard-page flex min-h-screen" style={{ backgroundColor: designTokens.colors.background.page }}>
      <Sidebar />

      <main
        className="flex-1"
        style={{
          marginLeft: designTokens.layout.sidebar.width,
          padding: designTokens.layout.content.padding,
        }}
      >
        <div style={{ maxWidth: designTokens.layout.content.maxWidth, margin: '0 auto' }}>
          
          {/* Header */}
          <header className="mb-8">
            <h1 
              className="font-semibold"
              style={{ 
                fontSize: designTokens.typography.fontSize.h2,
                color: designTokens.colors.text.primary,
              }}
            >
              {settings.title}
            </h1>
            <p style={{ color: designTokens.colors.text.secondary, marginTop: '4px' }}>
              Управление приложением и персонализация
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Settings Navigation */}
            <div 
              className="lg:col-span-1 p-4 bg-white h-fit"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <nav className="space-y-1">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className="w-full flex items-center gap-3 p-3 transition-all text-left"
                      style={{
                        borderRadius: designTokens.borderRadius.lg,
                        backgroundColor: activeSection === section.id 
                          ? `${designTokens.colors.brand.primary}15` 
                          : 'transparent',
                        color: activeSection === section.id 
                          ? designTokens.colors.brand.primary 
                          : designTokens.colors.text.primary,
                      }}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <h2 
                    className="font-semibold mb-6"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {settings.profile}
                  </h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                      style={{ backgroundColor: designTokens.colors.brand.primary }}
                    >
                      ГС
                    </div>
                    <div>
                      <button 
                        className="px-4 py-2 text-sm font-medium"
                        style={{ 
                          backgroundColor: designTokens.colors.background.secondary,
                          borderRadius: designTokens.borderRadius.lg,
                          color: designTokens.colors.text.primary,
                        }}
                      >
                        Изменить фото
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label 
                        className="block text-sm mb-2"
                        style={{ color: designTokens.colors.text.secondary }}
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        defaultValue="Герасим"
                        className="w-full p-3 outline-none"
                        style={{ 
                          borderRadius: designTokens.borderRadius.lg,
                          border: `1px solid ${designTokens.colors.border.light}`,
                          color: designTokens.colors.text.primary,
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm mb-2"
                        style={{ color: designTokens.colors.text.secondary }}
                      >
                        Фамилия
                      </label>
                      <input
                        type="text"
                        defaultValue="Смирнов"
                        className="w-full p-3 outline-none"
                        style={{ 
                          borderRadius: designTokens.borderRadius.lg,
                          border: `1px solid ${designTokens.colors.border.light}`,
                          color: designTokens.colors.text.primary,
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label 
                        className="block text-sm mb-2"
                        style={{ color: designTokens.colors.text.secondary }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="gerasim@example.com"
                        className="w-full p-3 outline-none"
                        style={{ 
                          borderRadius: designTokens.borderRadius.lg,
                          border: `1px solid ${designTokens.colors.border.light}`,
                          color: designTokens.colors.text.primary,
                        }}
                      />
                    </div>
                  </div>

                  <button 
                    className="mt-6 px-6 py-2 text-white font-medium flex items-center gap-2"
                    style={{ 
                      backgroundColor: designTokens.colors.brand.primary,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  >
                    <Check size={18} />
                    Сохранить
                  </button>
                </div>
              )}

              {/* Categories Section */}
              {activeSection === 'categories' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 
                      className="font-semibold"
                      style={{ 
                        fontSize: designTokens.typography.fontSize.h4,
                        color: designTokens.colors.text.primary,
                      }}
                    >
                      {settings.categories}
                    </h2>
                    <button 
                      className="flex items-center gap-2 px-4 py-2 text-white font-medium"
                      style={{ 
                        backgroundColor: designTokens.colors.brand.primary,
                        borderRadius: designTokens.borderRadius.lg,
                      }}
                    >
                      <Plus size={18} />
                      Добавить
                    </button>
                  </div>

                  {/* Expense Categories */}
                  <div className="mb-6">
                    <h3 
                      className="text-sm font-medium mb-3"
                      style={{ color: designTokens.colors.text.secondary }}
                    >
                      Категории расходов
                    </h3>
                    <div className="space-y-2">
                      {userCategories.filter(c => c.type === 'expense').map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div 
                            key={cat.id}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{ backgroundColor: designTokens.colors.background.secondary }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${cat.color}20` }}
                              >
                                <Icon size={18} style={{ color: cat.color }} />
                              </div>
                              <span style={{ color: designTokens.colors.text.primary }}>
                                {cat.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg hover:bg-gray-200">
                                <Edit2 size={16} style={{ color: designTokens.colors.text.tertiary }} />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-gray-200">
                                <Trash2 size={16} style={{ color: designTokens.colors.text.tertiary }} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Income Categories */}
                  <div>
                    <h3 
                      className="text-sm font-medium mb-3"
                      style={{ color: designTokens.colors.text.secondary }}
                    >
                      Категории доходов
                    </h3>
                    <div className="space-y-2">
                      {userCategories.filter(c => c.type === 'income').map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div 
                            key={cat.id}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{ backgroundColor: designTokens.colors.background.secondary }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${cat.color}20` }}
                              >
                                <Icon size={18} style={{ color: cat.color }} />
                              </div>
                              <span style={{ color: designTokens.colors.text.primary }}>
                                {cat.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg hover:bg-gray-200">
                                <Edit2 size={16} style={{ color: designTokens.colors.text.tertiary }} />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-gray-200">
                                <Trash2 size={16} style={{ color: designTokens.colors.text.tertiary }} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Currency Section */}
              {activeSection === 'currency' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <h2 
                    className="font-semibold mb-6"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {settings.currency}
                  </h2>

                  <div className="space-y-3">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => setSelectedCurrency(curr.code)}
                        className="w-full flex items-center justify-between p-4 rounded-lg transition-all"
                        style={{ 
                          backgroundColor: selectedCurrency === curr.code 
                            ? `${designTokens.colors.brand.primary}15`
                            : designTokens.colors.background.secondary,
                          border: selectedCurrency === curr.code 
                            ? `2px solid ${designTokens.colors.brand.primary}`
                            : '2px solid transparent',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: designTokens.colors.text.primary }}
                          >
                            {curr.symbol}
                          </span>
                          <div className="text-left">
                            <p 
                              className="font-medium"
                              style={{ color: designTokens.colors.text.primary }}
                            >
                              {curr.code}
                            </p>
                            <p 
                              className="text-sm"
                              style={{ color: designTokens.colors.text.secondary }}
                            >
                              {curr.name}
                            </p>
                          </div>
                        </div>
                        {selectedCurrency === curr.code && (
                          <Check size={20} style={{ color: designTokens.colors.brand.primary }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <h2 
                    className="font-semibold mb-6"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {settings.notifications}
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: 'budgetAlerts', label: 'Уведомления о превышении бюджета', desc: 'Получать уведомления когда расходы превышают лимит' },
                      { key: 'weeklyReports', label: 'Еженедельные отчёты', desc: 'Получать сводку расходов каждую неделю' },
                      { key: 'goalReminders', label: 'Напоминания о целях', desc: 'Напоминания о пополнении накоплений' },
                      { key: 'transactionNotifications', label: 'Уведомления об операциях', desc: 'Уведомления о каждой новой операции' },
                    ].map((item) => (
                      <div 
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ backgroundColor: designTokens.colors.background.secondary }}
                      >
                        <div>
                          <p 
                            className="font-medium"
                            style={{ color: designTokens.colors.text.primary }}
                          >
                            {item.label}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: designTokens.colors.text.secondary }}
                          >
                            {item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({
                            ...prev,
                            [item.key]: !prev[item.key as keyof typeof notifications]
                          }))}
                          className="relative w-12 h-6 rounded-full transition-all"
                          style={{ 
                            backgroundColor: notifications[item.key as keyof typeof notifications] 
                              ? designTokens.colors.brand.primary 
                              : '#d1d5db',
                          }}
                        >
                          <div 
                            className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                            style={{ 
                              left: notifications[item.key as keyof typeof notifications] ? '28px' : '4px',
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Export Section */}
              {activeSection === 'export' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <h2 
                    className="font-semibold mb-6"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {settings.export}
                  </h2>

                  <p 
                    className="mb-6"
                    style={{ color: designTokens.colors.text.secondary }}
                  >
                    Экспортируйте ваши данные в удобном формате для анализа или резервного копирования.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['CSV', 'Excel', 'JSON', 'PDF'].map((format) => (
                      <button
                        key={format}
                        className="p-4 rounded-lg flex items-center justify-between hover:bg-gray-50"
                        style={{ 
                          border: `1px solid ${designTokens.colors.border.light}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Download size={20} style={{ color: designTokens.colors.brand.primary }} />
                          <span style={{ color: designTokens.colors.text.primary }}>
                            Экспорт в {format}
                          </span>
                        </div>
                        <ChevronRight size={18} style={{ color: designTokens.colors.text.tertiary }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Import Section */}
              {activeSection === 'import' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <h2 
                    className="font-semibold mb-6"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {settings.import}
                  </h2>

                  <div 
                    className="border-2 border-dashed rounded-xl p-10 text-center"
                    style={{ borderColor: designTokens.colors.border.light }}
                  >
                    <Upload size={48} className="mx-auto mb-4" style={{ color: designTokens.colors.text.tertiary }} />
                    <p 
                      className="font-medium mb-2"
                      style={{ color: designTokens.colors.text.primary }}
                    >
                      Перетащите файл сюда
                    </p>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: designTokens.colors.text.secondary }}
                    >
                      или нажмите для выбора файла
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: designTokens.colors.text.tertiary }}
                    >
                      Поддерживаемые форматы: CSV, Excel, JSON
                    </p>
                  </div>
                </div>
              )}

              {/* Theme Section */}
              {activeSection === 'theme' && (
                <div 
                  className="p-6 bg-white"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                  }}
                >
                  <h2 
                    className="font-semibold mb-6"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {settings.theme}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Светлая', desc: 'Классическая светлая тема' },
                      { id: 'dark', label: 'Тёмная', desc: 'Тёмная тема для глаз' },
                      { id: 'system', label: 'Системная', desc: 'Следовать настройкам системы' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id as typeof theme)}
                        className="p-4 rounded-lg text-left transition-all"
                        style={{ 
                          backgroundColor: theme === t.id 
                            ? `${designTokens.colors.brand.primary}15`
                            : designTokens.colors.background.secondary,
                          border: theme === t.id 
                            ? `2px solid ${designTokens.colors.brand.primary}`
                            : '2px solid transparent',
                        }}
                      >
                        <p 
                          className="font-medium mb-1"
                          style={{ color: designTokens.colors.text.primary }}
                        >
                          {t.label}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: designTokens.colors.text.secondary }}
                        >
                          {t.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
