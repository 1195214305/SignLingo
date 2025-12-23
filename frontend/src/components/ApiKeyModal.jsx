import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Check, ExternalLink } from 'lucide-react';
import { getApiKey, setApiKey } from '../utils/api';

function ApiKeyModal({ isOpen, onClose }) {
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyValue(getApiKey());
      setSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    setApiKey(apiKeyValue.trim());
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKeyValue('');
    setApiKey('');
    setSaved(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(28, 25, 23, 0.5)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        maxWidth: '28rem',
        width: '100%',
        overflow: 'hidden',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #e7e5e4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1c1917', margin: 0 }}>
              API 设置
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '0.25rem' }}>
              配置通义千问 API Key 启用 AI 功能
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              color: '#a8a29e',
              background: 'transparent',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* API Key Input */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#44403c',
                marginBottom: '0.5rem'
              }}>
                通义千问 API Key
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyValue}
                  onChange={(e) => setApiKeyValue(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxx"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    paddingRight: '3rem',
                    border: '1px solid #d6d3d1',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#a8a29e',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  {showKey ?
                    <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} /> :
                    <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                  }
                </button>
              </div>
            </div>

            {/* Help Info */}
            <div style={{
              background: '#f0fdfa',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              fontSize: '0.75rem'
            }}>
              <p style={{ fontWeight: 500, color: '#115e59', marginBottom: '0.5rem' }}>
                如何获取 API Key？
              </p>
              <ol style={{
                margin: 0,
                paddingLeft: '1.25rem',
                color: '#0f766e',
                lineHeight: 1.6
              }}>
                <li>
                  访问{' '}
                  <a
                    href="https://dashscope.console.aliyun.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#0d9488',
                      textDecoration: 'underline',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    阿里云百炼控制台
                    <ExternalLink style={{ width: '0.625rem', height: '0.625rem', marginLeft: '0.25rem' }} />
                  </a>
                </li>
                <li>进入「API-KEY管理」</li>
                <li>创建或复制 API Key</li>
              </ol>
              <p style={{ marginTop: '0.5rem', color: '#14b8a6', fontSize: '0.625rem' }}>
                Key 仅保存在本地，不会上传服务器
              </p>
            </div>

            {/* Feature Note */}
            <div style={{
              background: '#fffbeb',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              fontSize: '0.75rem'
            }}>
              <p style={{ fontWeight: 500, color: '#92400e', marginBottom: '0.25rem' }}>
                功能说明
              </p>
              <p style={{ color: '#b45309', fontSize: '0.625rem', lineHeight: 1.5 }}>
                配置后将使用 AI 对手势进行二次校验，提供更精准反馈。不配置也可正常使用基础功能。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.75rem 1.25rem',
          background: '#fafaf9',
          borderTop: '1px solid #e7e5e4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handleClear}
            style={{
              fontSize: '0.75rem',
              color: '#78716c',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            清除
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                color: '#57534e',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: saved ? '#22c55e' : '#0d9488',
                color: 'white'
              }}
            >
              {saved ? (
                <>
                  <Check style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>已保存</span>
                </>
              ) : (
                <span>保存</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiKeyModal;
