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
      <div className="flex-1 flex items-center justify-center">
        <p className="text-stone-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-stone-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* 头部信息 */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                {category?.name || '手势练习'}
              </h1>
              <p className="text-sm text-stone-500 mt-1">
                跟随提示，用手势完成练习
              </p>
            </div>
            <button
              onClick={resetProgress}
              className="btn-secondary inline-flex items-center justify-center space-x-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新开始</span>
            </button>
          </div>

          {/* 进度条 */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-stone-700">学习进度</span>
              <span className="text-xs sm:text-sm text-stone-500">
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
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* 左侧：摄像头 */}
          <div className="w-full lg:flex-1">
            <CameraView
              targetGesture={currentGesture}
              onGestureMatch={handleGestureMatch}
              enabled={true}
            />
          </div>

          {/* 右侧：当前手势信息 */}
          <div className="w-full lg:flex-1 space-y-4 sm:space-y-6">
            {/* 当前手势卡片 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGesture?.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm text-stone-500">
                    第 {currentIndex + 1} / {gestures.length} 个
                  </span>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" />
                    <span className="text-xs sm:text-sm font-medium text-teal-600">目标手势</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-6">
                  <div className="gesture-demo">
                    {currentGesture?.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 mb-1 sm:mb-2 truncate">
                      {currentGesture?.name}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500">{currentGesture?.nameEn}</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="text-xs sm:text-sm font-medium text-stone-700 mb-1 sm:mb-2">动作说明</h3>
                  <p className="text-sm text-stone-600">{currentGesture?.description}</p>
                </div>

                {/* 导航按钮 */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="btn-secondary inline-flex items-center space-x-1 sm:space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">上一个</span>
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentIndex === gestures.length - 1}
                    className="btn-primary inline-flex items-center space-x-1 sm:space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">下一个</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 手势列表 - 在移动端可折叠 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-3 sm:mb-4">全部手势</h3>
              <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto hide-scrollbar">
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
              className="fixed inset-0 bg-stone-900/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">太棒了!</h2>
                <p className="text-sm sm:text-base text-stone-600 mb-4 sm:mb-6">
                  你已完成 {category?.name || '本组'} 的全部 {gestures.length} 个手势练习
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 justify-center">
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
