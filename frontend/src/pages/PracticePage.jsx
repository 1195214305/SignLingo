import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Trophy, Target, Clock, Zap } from 'lucide-react';
import CameraView from '../components/CameraView';
import GestureCard from '../components/GestureCard';
import { GESTURE_CATEGORIES, getGesturesByCategory, getAllGestures } from '../utils/gestures';

// 保存进度到 localStorage
function saveProgress(completedGestures, categoryId, totalGestures) {
  const savedProgress = JSON.parse(localStorage.getItem('signlingo_progress') || '{}');

  // 如果是 'all' 分类，需要更新所有分类的进度
  if (categoryId === 'all') {
    // 遍历所有分类，更新各自的完成情况
    Object.keys(GESTURE_CATEGORIES).forEach(catId => {
      const catGestureIds = GESTURE_CATEGORIES[catId].gestures;
      const completedInCat = catGestureIds.filter(id => completedGestures.has(id));
      savedProgress[catId] = {
        completed: completedInCat.length,
        total: catGestureIds.length,
        completedIds: completedInCat,
      };
    });
  } else {
    savedProgress[categoryId] = {
      completed: completedGestures.size,
      total: GESTURE_CATEGORIES[categoryId]?.gestures.length || totalGestures,
      completedIds: Array.from(completedGestures),
    };
  }

  localStorage.setItem('signlingo_progress', JSON.stringify(savedProgress));

  // 更新统计数据
  const savedStats = JSON.parse(localStorage.getItem('signlingo_stats') || '{}');
  const allCompleted = new Set();
  Object.values(savedProgress).forEach(cat => {
    if (cat.completedIds) {
      cat.completedIds.forEach(id => allCompleted.add(id));
    }
  });
  savedStats.totalPracticed = allCompleted.size;
  savedStats.lastPractice = new Date().toLocaleDateString('zh-CN');

  // 更新连续天数
  const today = new Date().toDateString();
  const lastDate = savedStats.lastPracticeDate;
  if (lastDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastDate === yesterday) {
      savedStats.streak = (savedStats.streak || 0) + 1;
    } else {
      savedStats.streak = 1;
    }
    savedStats.lastPracticeDate = today;
  }

  localStorage.setItem('signlingo_stats', JSON.stringify(savedStats));
}

// 加载已完成的手势
function loadCompletedGestures(categoryId) {
  const savedProgress = JSON.parse(localStorage.getItem('signlingo_progress') || '{}');

  // 如果是 'all' 分类，合并所有分类的已完成手势
  if (categoryId === 'all') {
    const allCompleted = new Set();
    Object.values(savedProgress).forEach(cat => {
      if (cat.completedIds) {
        cat.completedIds.forEach(id => allCompleted.add(id));
      }
    });
    return allCompleted;
  }

  const categoryProgress = savedProgress[categoryId];
  if (categoryProgress?.completedIds) {
    return new Set(categoryProgress.completedIds);
  }
  return new Set();
}

function PracticePage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category') || 'numbers';

  const [gestures, setGestures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedGestures, setCompletedGestures] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  // 限时挑战模式
  const [challengeMode, setChallengeMode] = useState(false);
  const [challengeTime, setChallengeTime] = useState(0);
  const [challengeStarted, setChallengStarted] = useState(false);
  const [challengeGestures, setChallengeGestures] = useState([]);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeComplete, setChallengeComplete] = useState(false);

  // 加载手势列表和已完成的进度
  useEffect(() => {
    const gestureList = categoryId === 'all'
      ? getAllGestures()
      : getGesturesByCategory(categoryId);
    setGestures(gestureList);
    setCurrentIndex(0);

    // 加载已保存的进度
    const saved = loadCompletedGestures(categoryId);
    setCompletedGestures(saved);
  }, [categoryId]);

  // 限时挑战计时器
  useEffect(() => {
    let timer;
    if (challengeMode && challengeStarted && !challengeComplete && challengeTime > 0) {
      timer = setInterval(() => {
        setChallengeTime(prev => {
          if (prev <= 1) {
            setChallengeComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [challengeMode, challengeStarted, challengeComplete, challengeTime]);

  const currentGesture = gestures[currentIndex];
  const category = GESTURE_CATEGORIES[categoryId];
  const progress = gestures.length > 0
    ? Math.round((completedGestures.size / gestures.length) * 100)
    : 0;

  // 处理手势匹配
  const handleGestureMatch = useCallback((gesture) => {
    if (challengeMode && challengeStarted && !challengeComplete) {
      // 限时挑战模式
      if (gesture.id === challengeGestures[challengeIndex]?.id) {
        setChallengeScore(prev => prev + 1);
        if (challengeIndex < challengeGestures.length - 1) {
          setChallengeIndex(prev => prev + 1);
        } else {
          setChallengeComplete(true);
        }
      }
    } else {
      // 普通练习模式
      const newCompleted = new Set([...completedGestures, gesture.id]);
      setCompletedGestures(newCompleted);
      setShowSuccess(true);

      // 保存进度到 localStorage
      saveProgress(newCompleted, categoryId, gestures.length);

      // 自动进入下一个
      setTimeout(() => {
        setShowSuccess(false);
        if (currentIndex < gestures.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      }, 1500);
    }
  }, [currentIndex, gestures.length, completedGestures, categoryId, challengeMode, challengeStarted, challengeComplete, challengeGestures, challengeIndex, gestures]);

  // 开始限时挑战
  const startChallenge = () => {
    // 随机选择5个手势
    const shuffled = [...gestures].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(5, shuffled.length));
    setChallengeGestures(selected);
    setChallengeIndex(0);
    setChallengeScore(0);
    setChallengeTime(30); // 30秒
    setChallengStarted(true);
    setChallengeComplete(false);
  };

  // 退出挑战模式
  const exitChallenge = () => {
    setChallengeMode(false);
    setChallengStarted(false);
    setChallengeComplete(false);
  };

  // 导航
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < gestures.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const resetProgress = () => {
    setCompletedGestures(new Set());
    setCurrentIndex(0);
    // 清除该分类的保存进度
    const savedProgress = JSON.parse(localStorage.getItem('signlingo_progress') || '{}');
    delete savedProgress[categoryId];
    localStorage.setItem('signlingo_progress', JSON.stringify(savedProgress));
  };

  if (gestures.length === 0) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#78716c' }}>加载中...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, background: '#fafaf9' }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1rem'
      }}>
        {/* 头部信息 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917' }}>
                {category?.name || '手势练习'}
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#78716c', marginTop: '0.25rem' }}>
                跟随提示，用手势完成练习
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setChallengeMode(true)}
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
              >
                <Zap style={{ width: '1rem', height: '1rem' }} />
                <span>限时挑战</span>
              </button>
              <button
                onClick={resetProgress}
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
              >
                <RotateCcw style={{ width: '1rem', height: '1rem' }} />
                <span>重新开始</span>
              </button>
            </div>
          </div>

          {/* 进度条 */}
          <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            padding: '1rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#44403c' }}>学习进度</span>
              <span style={{ fontSize: '0.875rem', color: '#78716c' }}>
                {completedGestures.size} / {gestures.length} 完成
              </span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* 主要内容区 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* 左侧：摄像头 */}
          <div style={{ width: '100%' }}>
            <CameraView
              targetGesture={challengeMode && challengeStarted && !challengeComplete ? challengeGestures[challengeIndex] : currentGesture}
              onGestureMatch={handleGestureMatch}
              enabled={true}
            />
          </div>

          {/* 右侧：当前手势信息 */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 当前手势卡片 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGesture?.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', color: '#78716c' }}>
                    第 {currentIndex + 1} / {gestures.length} 个
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target style={{ width: '1rem', height: '1rem', color: '#14b8a6' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0d9488' }}>目标手势</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div className="gesture-demo">
                    {currentGesture?.emoji}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1c1917',
                      marginBottom: '0.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {currentGesture?.name}
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#78716c' }}>{currentGesture?.nameEn}</p>
                  </div>
                </div>

                <div style={{
                  background: '#fafaf9',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#44403c', marginBottom: '0.5rem' }}>
                    动作说明
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#57534e' }}>{currentGesture?.description}</p>
                </div>

                {/* 导航按钮 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}>
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      opacity: currentIndex === 0 ? 0.5 : 1,
                      cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
                    <span>上一个</span>
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentIndex === gestures.length - 1}
                    className="btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      opacity: currentIndex === gestures.length - 1 ? 0.5 : 1,
                      cursor: currentIndex === gestures.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <span>下一个</span>
                    <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 手势列表 */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1c1917', marginBottom: '1rem' }}>
                全部手势
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxHeight: '16rem',
                overflowY: 'auto'
              }} className="hide-scrollbar">
                {gestures.map((gesture, index) => (
                  <GestureCard
                    key={gesture.id}
                    gesture={gesture}
                    isActive={index === currentIndex}
                    isCompleted={completedGestures.has(gesture.id)}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 完成提示 */}
        <AnimatePresence>
          {completedGestures.size === gestures.length && gestures.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(28, 25, 23, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                padding: '1rem'
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  maxWidth: '24rem',
                  width: '100%',
                  textAlign: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }}
              >
                <div style={{
                  width: '5rem',
                  height: '5rem',
                  background: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Trophy style={{ width: '2.5rem', height: '2.5rem', color: '#f59e0b' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>
                  太棒了!
                </h2>
                <p style={{ fontSize: '1rem', color: '#57534e', marginBottom: '1.5rem' }}>
                  你已完成 {category?.name || '本组'} 的全部 {gestures.length} 个手势练习
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <button onClick={resetProgress} className="btn-secondary">
                    再练一次
                  </button>
                  <button
                    onClick={() => window.location.href = '/progress'}
                    className="btn-primary"
                  >
                    查看进度
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 限时挑战模式弹窗 */}
        <AnimatePresence>
          {challengeMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(28, 25, 23, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                padding: '1rem'
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  maxWidth: '32rem',
                  width: '100%',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }}
              >
                {!challengeStarted && !challengeComplete && (
                  <>
                    <div style={{
                      width: '5rem',
                      height: '5rem',
                      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem'
                    }}>
                      <Zap style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem', textAlign: 'center' }}>
                      限时挑战
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#57534e', marginBottom: '1.5rem', textAlign: 'center' }}>
                      在30秒内完成5个随机手势，测试你的手语水平！
                    </p>
                    <div style={{
                      background: '#f0fdfa',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#0d9488' }} />
                        <span style={{ fontSize: '0.875rem', color: '#0f766e' }}>时间限制: 30秒</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Target style={{ width: '1.25rem', height: '1.25rem', color: '#0d9488' }} />
                        <span style={{ fontSize: '0.875rem', color: '#0f766e' }}>目标: 完成5个手势</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button onClick={exitChallenge} className="btn-secondary" style={{ flex: 1 }}>
                        取消
                      </button>
                      <button onClick={startChallenge} className="btn-primary" style={{ flex: 1 }}>
                        开始挑战
                      </button>
                    </div>
                  </>
                )}

                {challengeStarted && !challengeComplete && (
                  <>
                    {/* 挑战进行中 */}
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: challengeTime <= 10 ? '#ef4444' : '#0d9488',
                        marginBottom: '0.5rem'
                      }}>
                        {challengeTime}s
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#78716c' }}>
                        {challengeIndex + 1} / {challengeGestures.length} 个手势
                      </p>
                    </div>

                    {/* 当前目标手势 */}
                    {challengeGestures[challengeIndex] && (
                      <div style={{
                        background: '#f0fdfa',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
                          {challengeGestures[challengeIndex].emoji}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.25rem' }}>
                          {challengeGestures[challengeIndex].name}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#57534e' }}>
                          {challengeGestures[challengeIndex].description}
                        </p>
                      </div>
                    )}

                    {/* 得分 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <Trophy style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#44403c' }}>
                        得分: {challengeScore}
                      </span>
                    </div>

                    <button onClick={exitChallenge} className="btn-secondary" style={{ width: '100%' }}>
                      退出挑战
                    </button>
                  </>
                )}

                {challengeComplete && (
                  <>
                    {/* 挑战结束 */}
                    <div style={{
                      width: '5rem',
                      height: '5rem',
                      background: challengeScore >= 3 ? '#fef3c7' : '#fee2e2',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem'
                    }}>
                      <Trophy style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        color: challengeScore >= 3 ? '#f59e0b' : '#ef4444'
                      }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem', textAlign: 'center' }}>
                      {challengeScore >= 5 ? '完美通关！' : challengeScore >= 3 ? '挑战成功！' : '继续加油！'}
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#57534e', marginBottom: '1rem', textAlign: 'center' }}>
                      你在30秒内完成了 {challengeScore} / {challengeGestures.length} 个手势
                    </p>

                    {/* 评价 */}
                    <div style={{
                      background: '#f5f5f4',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}>
                      <p style={{ fontSize: '0.875rem', color: '#57534e' }}>
                        {challengeScore >= 5 ? '太厉害了！你已经是手语大师！' :
                         challengeScore >= 3 ? '表现不错！继续练习会更好！' :
                         '多加练习，你一定可以做到的！'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button onClick={exitChallenge} className="btn-secondary" style={{ flex: 1 }}>
                        返回练习
                      </button>
                      <button onClick={startChallenge} className="btn-primary" style={{ flex: 1 }}>
                        再来一次
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PracticePage;
