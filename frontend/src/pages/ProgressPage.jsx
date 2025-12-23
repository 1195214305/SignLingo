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
    <div style={{ flex: 1, background: '#fafaf9', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917' }}>学习进度</h1>
          <p style={{ color: '#78716c', marginTop: '0.25rem' }}>追踪你的手语学习之旅</p>
        </div>

        {/* 统计卡片 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#ccfbf1',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target style={{ width: '1.25rem', height: '1.25rem', color: '#0d9488' }} />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#78716c' }}>已练习</span>
            </div>
            <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1c1917' }}>{stats.totalPracticed}</p>
            <p style={{ fontSize: '0.875rem', color: '#a8a29e' }}>个手势</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#fef3c7',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame style={{ width: '1.25rem', height: '1.25rem', color: '#d97706' }} />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#78716c' }}>连续天数</span>
            </div>
            <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1c1917' }}>{stats.streak}</p>
            <p style={{ fontSize: '0.875rem', color: '#a8a29e' }}>天</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#d1fae5',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#059669' }} />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#78716c' }}>准确率</span>
            </div>
            <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1c1917' }}>{stats.accuracy}%</p>
            <p style={{ fontSize: '0.875rem', color: '#a8a29e' }}>平均</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#dbeafe',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#78716c' }}>上次练习</span>
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1917' }}>
              {stats.lastPractice || '尚未开始'}
            </p>
          </motion.div>
        </div>

        {/* 分类进度和成就 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* 分类进度 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1c1917', marginBottom: '1.5rem' }}>
              分类进度
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {Object.entries(GESTURE_CATEGORIES).map(([catId, category]) => {
                const progress = categoryProgress[catId] || { completed: 0, total: category.gestures.length };
                const percentage = Math.round((progress.completed / progress.total) * 100);

                return (
                  <div key={catId}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                        <div>
                          <p style={{ fontWeight: 500, color: '#1c1917' }}>{category.name}</p>
                          <p style={{ fontSize: '0.875rem', color: '#78716c' }}>
                            {progress.completed} / {progress.total} 完成
                          </p>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0d9488' }}>
                        {percentage}%
                      </span>
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
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#1c1917',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Trophy style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />
              <span>成就</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${achievement.unlocked ? '#fde68a' : '#e7e5e4'}`,
                    background: achievement.unlocked ? '#fffbeb' : '#fafaf9',
                    opacity: achievement.unlocked ? 1 : 0.6
                  }}
                >
                  <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>{achievement.icon}</div>
                  <h3 style={{
                    fontWeight: 500,
                    color: achievement.unlocked ? '#1c1917' : '#78716c'
                  }}>
                    {achievement.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '0.25rem' }}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      fontSize: '0.75rem',
                      background: '#fde68a',
                      color: '#92400e',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px'
                    }}>
                      已解锁
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 提示 */}
        <div style={{
          marginTop: '2rem',
          background: 'linear-gradient(to right, #0d9488, #14b8a6)',
          borderRadius: '1rem',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                继续你的学习之旅
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                每天练习一点，积少成多，你会成为手语达人！
              </p>
            </div>
            <a
              href="/practice"
              style={{
                background: 'white',
                color: '#0d9488',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
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
