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
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(250, 250, 249, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e7e5e4'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '3.5rem'
          }}>
            {/* Logo */}
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none'
            }}>
              <div style={{
                width: '2.25rem',
                height: '2.25rem',
                background: 'linear-gradient(to bottom right, #14b8a6, #0d9488)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Hand style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
              </div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: '#1c1917'
              }}>
                SignLingo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.25rem'
            }} className="desktop-nav">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      background: isActive ? '#f0fdfa' : 'transparent',
                      color: isActive ? '#0f766e' : '#57534e',
                      fontWeight: isActive ? 500 : 400
                    }}
                  >
                    <Icon style={{ width: '1rem', height: '1rem' }} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Status & Settings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: '#78716c',
                background: '#f5f5f4',
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px'
              }}>
                <span style={{
                  width: '0.375rem',
                  height: '0.375rem',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: apiConfigured ? '#22c55e' : '#f59e0b',
                  animation: 'pulse 2s infinite'
                }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {apiConfigured ? 'AI 已启用' : '基础模式'}
                </span>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  padding: '0.5rem',
                  color: '#78716c',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="API 设置"
              >
                <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0.5rem 0',
          borderTop: '1px solid #e7e5e4',
          background: '#fafaf9'
        }} className="mobile-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.125rem',
                  padding: '0.25rem 1rem',
                  minWidth: 0,
                  textDecoration: 'none',
                  color: isActive ? '#0d9488' : '#78716c'
                }}
              >
                <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                <span style={{ fontSize: '0.75rem' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <ApiKeyModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

export default Header;
