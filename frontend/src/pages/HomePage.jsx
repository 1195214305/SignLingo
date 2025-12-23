import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hand, BookOpen, Trophy, ArrowRight, Sparkles, Globe, Zap } from 'lucide-react';
import { GESTURE_CATEGORIES } from '../utils/gestures';

function HomePage() {
  const features = [
    {
      icon: Hand,
      title: '实时手势识别',
      description: '基于 MediaPipe 的浏览器端 AI 识别，无需安装任何软件',
      color: 'bg-teal-100 text-teal-600',
    },
    {
      icon: Zap,
      title: '边缘计算加速',
      description: '阿里云 ESA 边缘节点提供毫秒级响应，全球低延迟访问',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: Globe,
      title: '无障碍设计',
      description: '专为听障人士和手语学习者设计，让沟通无界限',
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  const gestureEmojis = ['👍', '✌️', '🖐️', '👌', '🤘', '☝️'];

  return (
    <main className="flex-1 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-50 to-stone-50 py-12 sm:py-16 lg:py-24">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* 左侧文字 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>AI 驱动的手语学习平台</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-4 sm:mb-6">
                用双手说话
                <br />
                <span className="text-teal-600">让世界听见</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                SignLingo 是一款基于浏览器的手语学习工具。通过摄像头实时识别您的手势，提供即时反馈，让手语学习变得简单有趣。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/practice" className="btn-primary inline-flex items-center justify-center space-x-2">
                  <span>开始练习</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/progress" className="btn-secondary inline-flex items-center justify-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>查看进度</span>
                </Link>
              </div>
            </motion.div>

            {/* 右侧手势展示 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {gestureEmojis.map((emoji, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="aspect-square bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl hover:scale-105 transition-transform cursor-pointer"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-xs sm:text-sm text-stone-500">
                    支持多种常用手势识别
                  </p>
                </div>
                {/* 装饰元素 - 仅在大屏显示 */}
                <div className="hidden lg:block absolute -top-4 -right-4 w-20 h-20 bg-teal-200 rounded-full opacity-50 blur-2xl"></div>
                <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 bg-amber-200 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 sm:mb-4">
              为什么选择 SignLingo
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
              结合前沿 AI 技术与边缘计算，为您提供流畅、准确的手语学习体验
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-stone-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl ${feature.color} flex items-center justify-center mb-4 sm:mb-6`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 sm:mb-4">
              学习内容
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              从基础数字到日常交流，循序渐进掌握手语
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {Object.values(GESTURE_CATEGORIES).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="text-3xl sm:text-4xl">{category.icon}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500">{category.nameEn}</p>
                    </div>
                  </div>
                  <span className="bg-teal-100 text-teal-700 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {category.gestures.length} 个手势
                  </span>
                </div>
                <p className="text-sm sm:text-base text-stone-600 mb-4 sm:mb-6">
                  {category.description}
                </p>
                <Link
                  to={`/practice?category=${category.id}`}
                  className="inline-flex items-center space-x-2 text-teal-600 font-medium hover:text-teal-700 text-sm sm:text-base"
                >
                  <span>开始学习</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-teal-600 to-teal-500">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            准备好开始学习了吗？
          </h2>
          <p className="text-teal-100 text-base sm:text-lg mb-6 sm:mb-8">
            只需一个摄像头，即可开始您的手语学习之旅
          </p>
          <Link
            to="/practice"
            className="inline-flex items-center space-x-2 bg-white text-teal-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg text-sm sm:text-base"
          >
            <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>立即开始</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
