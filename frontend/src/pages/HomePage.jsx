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

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-stone-50 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI 驱动的手语学习平台</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-6">
                用双手说话
                <br />
                <span className="text-teal-600">让世界听见</span>
              </h1>

              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                SignLingo 是一款基于浏览器的手语学习工具。通过摄像头实时识别您的手势，
                提供即时反馈，让手语学习变得简单有趣。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/practice" className="btn-primary inline-flex items-center space-x-2">
                  <span>开始练习</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/progress" className="btn-secondary inline-flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>查看进度</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 float-animation">
                <div className="grid grid-cols-3 gap-4">
                  {['👍', '✌️', '🖐️', '👌', '🤘', '☝️'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="aspect-square bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl flex items-center justify-center text-4xl hover:scale-110 transition-transform cursor-pointer"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-stone-500">支持多种常用手势识别</p>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-200 rounded-full opacity-50 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">为什么选择 SignLingo</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              结合前沿 AI 技术与边缘计算，为您提供流畅、准确的手语学习体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-stone-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">学习内容</h2>
            <p className="text-stone-600">从基础数字到日常交流，循序渐进掌握手语</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.values(GESTURE_CATEGORIES).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-4xl mb-4 block">{category.icon}</span>
                    <h3 className="text-xl font-semibold text-stone-900">{category.name}</h3>
                    <p className="text-stone-500 text-sm">{category.nameEn}</p>
                  </div>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                    {category.gestures.length} 个手势
                  </span>
                </div>
                <p className="text-stone-600 mb-6">{category.description}</p>
                <Link
                  to={`/practice?category=${category.id}`}
                  className="inline-flex items-center space-x-2 text-teal-600 font-medium hover:text-teal-700"
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
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">准备好开始学习了吗？</h2>
          <p className="text-teal-100 text-lg mb-8">
            只需一个摄像头，即可开始您的手语学习之旅
          </p>
          <Link
            to="/practice"
            className="inline-flex items-center space-x-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg"
          >
            <Hand className="w-5 h-5" />
            <span>立即开始</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
