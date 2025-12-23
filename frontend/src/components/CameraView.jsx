import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, CheckCircle, AlertCircle, Loader2, Volume2, VolumeX } from 'lucide-react';
import useHandTracking from '../hooks/useHandTracking';

// 语音合成工具
const speak = (text) => {
  if ('speechSynthesis' in window) {
    // 取消之前的语音
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
};

function CameraView({ targetGesture, onGestureMatch, enabled = true }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [matchedGesture, setMatchedGesture] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastSpokenGesture, setLastSpokenGesture] = useState(null);
  const matchTimeoutRef = useRef(null);

  const handleGestureDetected = useCallback((gesture) => {
    if (targetGesture && gesture.id === targetGesture.id) {
      // 清除之前的超时
      if (matchTimeoutRef.current) {
        clearTimeout(matchTimeoutRef.current);
      }

      setMatchedGesture(gesture);

      // 语音反馈
      if (soundEnabled) {
        speak(`正确！这是${gesture.name}`);
      }

      // 延迟触发匹配回调，确保用户看到成功状态
      matchTimeoutRef.current = setTimeout(() => {
        onGestureMatch?.(gesture);
        setMatchedGesture(null);
      }, 1500);
    }
  }, [targetGesture, onGestureMatch, soundEnabled]);

  const { isLoading, error, handsDetected, currentGesture, edgeFeedback } = useHandTracking(
    videoRef,
    canvasRef,
    {
      enabled,
      onGestureDetected: handleGestureDetected,
    }
  );

  // 当识别到新手势时播报（非目标手势也播报）
  useEffect(() => {
    if (currentGesture && soundEnabled && currentGesture.id !== lastSpokenGesture) {
      // 只有当不是目标手势时才播报识别结果
      if (!targetGesture || currentGesture.id !== targetGesture.id) {
        speak(`识别到${currentGesture.name}`);
      }
      setLastSpokenGesture(currentGesture.id);
    }
  }, [currentGesture, soundEnabled, lastSpokenGesture, targetGesture]);

  const isMatched = matchedGesture?.id === targetGesture?.id;

  return (
    <div style={{ position: 'relative' }}>
      {/* 摄像头容器 */}
      <div
        className="camera-container"
        style={{
          boxShadow: isMatched ? '0 0 0 4px #22c55e' : undefined,
          transition: 'box-shadow 0.3s'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* 加载状态 */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(28, 25, 23, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Loader2 style={{ width: '3rem', height: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
              <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>正在加载手势识别模型...</p>
              <p style={{ fontSize: '0.875rem', color: '#a8a29e', marginTop: '0.5rem' }}>首次加载可能需要几秒钟</p>
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
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(28, 25, 23, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: '1.5rem'
              }}
            >
              <CameraOff style={{ width: '4rem', height: '4rem', color: '#f87171', marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.125rem', fontWeight: 500, textAlign: 'center' }}>无法访问摄像头</p>
              <p style={{ fontSize: '0.875rem', color: '#a8a29e', marginTop: '0.5rem', textAlign: 'center' }}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
                style={{ marginTop: '1rem' }}
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
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(34, 197, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                style={{
                  background: '#22c55e',
                  borderRadius: '50%',
                  padding: '1.5rem'
                }}
              >
                <CheckCircle style={{ width: '4rem', height: '4rem', color: 'white' }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 语音开关按钮 */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            borderRadius: '50%',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'white',
            zIndex: 10
          }}
          title={soundEnabled ? '关闭语音' : '开启语音'}
        >
          {soundEnabled ?
            <Volume2 style={{ width: '1.25rem', height: '1.25rem' }} /> :
            <VolumeX style={{ width: '1.25rem', height: '1.25rem' }} />
          }
        </button>
      </div>

      {/* 状态指示器 */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {!isLoading && !error && (
          <>
            <div
              className={`status-indicator ${handsDetected ? 'detecting' : 'ready'}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
                background: handsDetected ? '#fef3c7' : '#dcfce7',
                color: handsDetected ? '#92400e' : '#166534'
              }}
            >
              {handsDetected ? (
                <>
                  <span style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    background: '#f59e0b',
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite'
                  }}></span>
                  <span>检测到手部</span>
                </>
              ) : (
                <>
                  <Camera style={{ width: '1rem', height: '1rem' }} />
                  <span>请将手放入画面</span>
                </>
              )}
            </div>

            {currentGesture && !isMatched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  background: '#f5f5f4',
                  color: '#44403c'
                }}
              >
                <span>识别到:</span>
                <span style={{ fontWeight: 600 }}>{currentGesture.name}</span>
                <span style={{ fontSize: '1.25rem' }}>{currentGesture.emoji}</span>
              </motion.div>
            )}

            {isMatched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  background: '#d1fae5',
                  color: '#065f46'
                }}
              >
                <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                <span>完美!</span>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* 实时识别结果详细显示 */}
      {currentGesture && !isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem',
            padding: '1.25rem',
            background: isMatched ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)' : 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
            borderRadius: '1rem',
            border: isMatched ? '2px solid #22c55e' : '2px solid #14b8a6'
          }}
        >
          {/* 手势名称和emoji */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '3.5rem' }}>{currentGesture.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: isMatched ? '#166534' : '#0f766e',
                margin: 0,
                lineHeight: 1.2
              }}>
                {currentGesture.name}
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: isMatched ? '#15803d' : '#0d9488',
                margin: '0.25rem 0 0 0'
              }}>
                {currentGesture.nameEn}
              </p>
            </div>
            {isMatched && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  background: '#22c55e',
                  borderRadius: '50%',
                  padding: '0.5rem'
                }}
              >
                <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </motion.div>
            )}
          </div>

          {/* 手势含义 */}
          {currentGesture.meaning && (
            <div style={{
              background: 'rgba(255,255,255,0.6)',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#0f766e',
                margin: '0 0 0.25rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                含义
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#1c1917',
                margin: 0,
                lineHeight: 1.5
              }}>
                {currentGesture.meaning}
              </p>
            </div>
          )}

          {/* 使用场景和文化背景 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {currentGesture.usage && (
              <div style={{
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem'
              }}>
                <p style={{
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  color: '#0d9488',
                  margin: '0 0 0.125rem 0',
                  textTransform: 'uppercase'
                }}>
                  使用场景
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#44403c',
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  {currentGesture.usage}
                </p>
              </div>
            )}
            {currentGesture.culture && (
              <div style={{
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem'
              }}>
                <p style={{
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  color: '#0d9488',
                  margin: '0 0 0.125rem 0',
                  textTransform: 'uppercase'
                }}>
                  文化背景
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#44403c',
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  {currentGesture.culture}
                </p>
              </div>
            )}
          </div>

          {isMatched && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#166534',
                textAlign: 'center'
              }}
            >
              太棒了！手势正确！
            </motion.p>
          )}
          {!isMatched && targetGesture && currentGesture.id !== targetGesture.id && (
            <p style={{
              marginTop: '0.75rem',
              fontSize: '0.875rem',
              color: '#b45309',
              textAlign: 'center'
            }}>
              当前目标: {targetGesture.name} {targetGesture.emoji}
            </p>
          )}
        </motion.div>
      )}

      {/* 边缘函数AI反馈 */}
      {edgeFeedback && edgeFeedback.feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: '#f0fdfa',
            border: '1px solid #99f6e4',
            borderRadius: '0.5rem'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <span style={{ color: '#0d9488', fontWeight: 500 }}>AI反馈:</span>
            <span style={{ color: '#0f766e' }}>{edgeFeedback.feedback}</span>
            {edgeFeedback.aiVerified !== undefined && (
              <span style={{
                padding: '0.125rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                background: edgeFeedback.aiVerified ? '#d1fae5' : '#fef3c7',
                color: edgeFeedback.aiVerified ? '#166534' : '#92400e'
              }}>
                {edgeFeedback.aiVerified ? '✓ AI确认' : '需改进'}
              </span>
            )}
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default CameraView;
