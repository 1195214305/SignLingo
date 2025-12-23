import { Github, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 py-6 sm:py-8 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* 主要内容 */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo和标语 */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-stone-600">
            <span className="font-medium">SignLingo</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline">让手语学习更简单</span>
          </div>

          {/* 链接 */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-stone-500">
            <span className="flex items-center space-x-1">
              <span className="hidden sm:inline">Powered by</span>
              <a
                href="https://www.aliyun.com/product/esa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                阿里云 ESA
              </a>
            </span>
            <span className="text-stone-300">|</span>
            <a
              href="https://github.com/1195214305/SignLingo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-stone-700"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Made with love */}
          <div className="flex items-center justify-center sm:justify-end space-x-1 text-xs sm:text-sm text-stone-500">
            <span>Made with</span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
            <span className="hidden sm:inline">for accessibility</span>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-stone-200 text-center">
          <p className="text-xs text-stone-400 leading-relaxed">
            本项目使用 MediaPipe 进行手势识别，旨在帮助听障人士和手语学习者
          </p>
          <p className="text-xs text-stone-400 mt-1">
            © 2025 SignLingo · 阿里云 ESA Pages 边缘开发大赛参赛作品
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
