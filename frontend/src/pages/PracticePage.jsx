import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Trophy, Target } from 'lucide-react';
import CameraView from '../components/CameraView';
import GestureCard from '../components/GestureCard';
import { GESTURE_CATEGORIES, getGesturesByCategory, getAllGestures } from '../utils/gestures';

function PracticePage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category') || 'numbers';

  const [gestures, setGestures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedGestures, setCompletedGestures] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  // 加载手势列表
  useEffect(() => {
    const gestureList = categoryId === 'all'
      ? getAllGestures()
      : getGesturesByCategory(categoryId);
    setGestures(gestureList);
    setCurrentIndex(0);
    setCompletedGestures(new Set());
  }, [categoryId]);

  const currentGesture = gestures[currentIndex];
  const category = GESTURE_CATEGORIES[categoryId];
  const progress = gestures.length > 0
    ? Math.round((completedGestures.size / gestures.length) * 100)
    : 0;

  // 处理手势匹配
  const handleGestureMatch = useCallback((gesture) => {
    setCompletedGestures(prev => new Set([...prev, gesture.id]));
    setShowSuccess(true);

    // 自动进入下一个
    setTimeout(() => {
      setShowSuccess(false);
      if (currentIndex < gestures.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 1500);
  }, [currentIndex, gestures.length]);

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
            <button
              onClick={resetProgress}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <RotateCcw style={{ width: '1rem', height: '1rem' }} />
              <span>重新开始</span>
            </button>
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
              targetGesture={currentGesture}
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
      </div>
    </div>
  );
}

export default PracticePage;
