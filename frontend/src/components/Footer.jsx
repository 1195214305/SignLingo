import { Github, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <span>SignLingo</span>
            <span className="text-stone-400">|</span>
            <span>让手语学习更简单</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-stone-500">
            <span className="flex items-center space-x-1">
              <span>Powered by</span>
              <a
                href="https://www.aliyun.com/product/esa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                阿里云 ESA Pages
              </a>
            </span>
            <span className="text-stone-300">|</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-stone-700"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="flex items-center space-x-1 text-sm text-stone-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for accessibility</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200 text-center text-xs text-stone-400">
          <p>本项目使用 MediaPipe 进行手势识别，旨在帮助听障人士和手语学习者</p>
          <p className="mt-1">© 2025 SignLingo. 阿里云 ESA Pages 边缘开发大赛参赛作品</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
