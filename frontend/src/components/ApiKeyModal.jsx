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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">API 设置</h3>
            <p className="text-sm text-stone-500 mt-0.5">配置通义千问 API Key 以启用 AI 增强功能</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                通义千问 API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyValue}
                  onChange={(e) => setApiKeyValue(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 pr-12 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-teal-50 rounded-xl p-4 text-sm">
              <p className="font-medium text-teal-800 mb-2">如何获取 API Key？</p>
              <ol className="list-decimal list-inside space-y-1.5 text-teal-700">
                <li>
                  访问{' '}
                  <a
                    href="https://dashscope.console.aliyun.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-800 underline inline-flex items-center"
                  >
                    阿里云百炼控制台
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>登录后进入「API-KEY管理」</li>
                <li>创建或复制您的 API Key</li>
              </ol>
              <p className="mt-3 text-teal-600 text-xs">
                您的 Key 仅保存在本地浏览器中，不会上传到服务器。
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 text-sm">
              <p className="font-medium text-amber-800 mb-1">功能说明</p>
              <p className="text-amber-700 text-xs">
                配置 API Key 后，系统将使用 AI 对您的手势进行二次校验，提供更精准的反馈和建议。
                不配置也可以正常使用基础手势识别功能。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            清除
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className={`px-5 py-2 text-sm rounded-lg font-medium transition-all flex items-center space-x-2 ${
                saved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
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
