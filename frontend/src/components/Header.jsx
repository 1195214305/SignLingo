import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hand, BookOpen, Trophy, Settings } from 'lucide-react';
import { hasApiKey } from '../utils/api';
import ApiKeyModal from './ApiKeyModal';

function Header() {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(false);

  useEffect(() => {
    setApiConfigured(hasApiKey());
  }, [showSettings]);

  const navItems = [
    { path: '/', label: '首页', icon: Hand },
    { path: '/practice', label: '练习', icon: BookOpen },
    { path: '/progress', label: '进度', icon: Trophy },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Hand className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-stone-900">
                SignLingo
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-medium'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Status & Settings */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">
                <span className={`w-1.5 h-1.5 rounded-full ${apiConfigured ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                <span>{apiConfigured ? 'AI 已启用' : '基础模式'}</span>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                title="API 设置"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-stone-200">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-4 py-1 ${
                  isActive ? 'text-teal-600' : 'text-stone-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <ApiKeyModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

export default Header;
