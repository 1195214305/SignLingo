import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Flame, Calendar, TrendingUp } from 'lucide-react';
import { GESTURE_CATEGORIES, getAllGestures } from '../utils/gestures';

function ProgressPage() {
  const [stats, setStats] = useState({
    totalPracticed: 0,
    streak: 0,
    accuracy: 0,
    lastPractice: null,
  });

  const [categoryProgress, setCategoryProgress] = useState({});

  useEffect(() => {
    // 从 localStorage 加载进度数据
    const savedStats = localStorage.getItem('signlingo_stats');
    const savedProgress = localStorage.getItem('signlingo_progress');

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    if (savedProgress) {
      setCategoryProgress(JSON.parse(savedProgress));
    } else {
      // 初始化进度
      const initialProgress = {};
      Object.keys(GESTURE_CATEGORIES).forEach(catId => {
        initialProgress[catId] = {
          completed: 0,
          total: GESTURE_CATEGORIES[catId].gestures.length,
        };
      });
      setCategoryProgress(initialProgress);
    }
  }, []);

  const allGestures = getAllGestures();
  const totalGestures = allGestures.length;

  const achievements = [
    {
      id: 'first_gesture',
      name: '初次尝试',
      description: '完成第一个手势练习',
      icon: '🎯',
      unlocked: stats.totalPracticed >= 1,
    },
    {
      id: 'numbers_master',
      name: '数字达人',
      description: '完成所有数字手势',
      icon: '🔢',
      unlocked: categoryProgress.numbers?.completed >= 5,
    },
    {
      id: 'streak_3',
      name: '坚持不懈',
      description: '连续练习3天',
      icon: '🔥',
      unlocked: stats.streak >= 3,
    },
    {
      id: 'all_gestures',
      name: '手语大师',
      description: '完成所有手势练习',
      icon: '👑',
      unlocked: stats.totalPracticed >= totalGestures,
    },
  ];

  return (
    <div className="flex-1 bg-stone-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900">学习进度</h1>
          <p className="text-stone-500 mt-1">追踪你的手语学习之旅</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-sm text-stone-500">已练习</span>
            </div>
            <p className="text-3xl font-bold text-stone-900">{stats.totalPracticed}</p>
            <p className="text-sm text-stone-400">个手势</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-stone-500">连续天数</span>
            </div>
            <p className="text-3xl font-bold text-stone-900">{stats.streak}</p>
            <p className="text-sm text-stone-400">天</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-stone-500">准确率</span>
            </div>
            <p className="text-3xl font-bold text-stone-900">{stats.accuracy}%</p>
            <p className="text-sm text-stone-400">平均</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-stone-500">上次练习</span>
            </div>
            <p className="text-xl font-bold text-stone-900">
              {stats.lastPractice || '尚未开始'}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 分类进度 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900 mb-6">分类进度</h2>
            <div className="space-y-6">
              {Object.entries(GESTURE_CATEGORIES).map(([catId, category]) => {
                const progress = categoryProgress[catId] || { completed: 0, total: category.gestures.length };
                const percentage = Math.round((progress.completed / progress.total) * 100);

                return (
                  <div key={catId}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <p className="font-medium text-stone-900">{category.name}</p>
                          <p className="text-sm text-stone-500">
                            {progress.completed} / {progress.total} 完成
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-teal-600">{percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 成就 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900 mb-6 flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>成就</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl border-2 ${
                    achievement.unlocked
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-stone-200 bg-stone-50 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className={`font-medium ${
                    achievement.unlocked ? 'text-stone-900' : 'text-stone-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                      已解锁
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 提示 */}
        <div className="mt-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">继续你的学习之旅</h3>
              <p className="text-teal-100">每天练习一点，积少成多，你会成为手语达人！</p>
            </div>
            <a
              href="/practice"
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
            >
              开始练习
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
