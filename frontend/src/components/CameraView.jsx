import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import useHandTracking from '../hooks/useHandTracking';

function CameraView({ targetGesture, onGestureMatch, enabled = true }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [matchedGesture, setMatchedGesture] = useState(null);
  const matchTimeoutRef = useRef(null);

  const handleGestureDetected = useCallback((gesture) => {
    if (targetGesture && gesture.id === targetGesture.id) {
      // 清除之前的超时
      if (matchTimeoutRef.current) {
        clearTimeout(matchTimeoutRef.current);
      }

      setMatchedGesture(gesture);

      // 延迟触发匹配回调，确保用户看到成功状态
      matchTimeoutRef.current = setTimeout(() => {
        onGestureMatch?.(gesture);
        setMatchedGesture(null);
      }, 1000);
    }
  }, [targetGesture, onGestureMatch]);

  const { isLoading, error, handsDetected, currentGesture, edgeFeedback } = useHandTracking(
    videoRef,
    canvasRef,
    {
      enabled,
      onGestureDetected: handleGestureDetected,
    }
  );

  const isMatched = matchedGesture?.id === targetGesture?.id;

  return (
    <div className="relative">
      {/* 摄像头容器 */}
      <div className={`camera-container ${isMatched ? 'ring-4 ring-emerald-500' : ''}`}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* 加载状态 */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/80 flex flex-col items-center justify-center text-white"
            >
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="text-lg font-medium">正在加载手势识别模型...</p>
              <p className="text-sm text-stone-400 mt-2">首次加载可能需要几秒钟</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 错误状态 */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/90 flex flex-col items-center justify-center text-white p-6"
            >
              <CameraOff className="w-16 h-16 text-red-400 mb-4" />
              <p className="text-lg font-medium text-center">无法访问摄像头</p>
              <p className="text-sm text-stone-400 mt-2 text-center">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 btn-primary"
              >
                重试
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 匹配成功动画 */}
        <AnimatePresence>
          {isMatched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="bg-emerald-500 rounded-full p-6"
              >
                <CheckCircle className="w-16 h-16 text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 状态指示器 */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        {!isLoading && !error && (
          <>
            <div className={`status-indicator ${handsDetected ? 'detecting' : 'ready'}`}>
              {handsDetected ? (
                <>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span>检测到手部</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>请将手放入画面</span>
                </>
              )}
            </div>

            {currentGesture && !isMatched && (
              <div className="status-indicator bg-stone-100 text-stone-700">
                <span>识别到: {currentGesture.name}</span>
                <span className="text-lg">{currentGesture.emoji}</span>
              </div>
            )}

            {isMatched && (
              <div className="status-indicator success">
                <CheckCircle className="w-4 h-4" />
                <span>完美!</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* 边缘函数AI反馈 */}
      {edgeFeedback && edgeFeedback.feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-lg"
        >
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-teal-600 font-medium">AI反馈:</span>
            <span className="text-teal-700">{edgeFeedback.feedback}</span>
            {edgeFeedback.aiVerified !== undefined && (
              <span className={`px-2 py-0.5 rounded text-xs ${edgeFeedback.aiVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {edgeFeedback.aiVerified ? '✓ AI确认' : '需改进'}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CameraView;
