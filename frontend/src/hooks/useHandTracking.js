import { useEffect, useRef, useState, useCallback } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { detectGesture } from '../utils/gestures';

// MediaPipe Hands 连接线定义
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],     // 拇指
  [0, 5], [5, 6], [6, 7], [7, 8],     // 食指
  [0, 9], [9, 10], [10, 11], [11, 12], // 中指
  [0, 13], [13, 14], [14, 15], [15, 16], // 无名指
  [0, 17], [17, 18], [18, 19], [19, 20], // 小指
  [5, 9], [9, 13], [13, 17], [0, 17]  // 手掌
];

export function useHandTracking(videoRef, canvasRef, options = {}) {
  const {
    onGestureDetected,
    onHandsDetected,
    enabled = true,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [handsDetected, setHandsDetected] = useState(false);
  const [currentGesture, setCurrentGesture] = useState(null);

  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const lastGestureRef = useRef(null);
  const gestureStableCountRef = useRef(0);

  // 处理检测结果
  const onResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    // 设置canvas尺寸
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      setHandsDetected(true);
      onHandsDetected?.(true);

      // 绘制手部关键点
      for (const landmarks of results.multiHandLandmarks) {
        // 绘制连接线
        drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
          color: '#14b8a6',
          lineWidth: 3,
        });

        // 绘制关键点
        drawLandmarks(ctx, landmarks, {
          color: '#0f766e',
          lineWidth: 1,
          radius: 4,
        });

        // 检测手势
        const gesture = detectGesture(landmarks);

        if (gesture) {
          // 手势稳定性检测
          if (lastGestureRef.current?.id === gesture.id) {
            gestureStableCountRef.current++;
          } else {
            gestureStableCountRef.current = 1;
            lastGestureRef.current = gesture;
          }

          // 手势稳定超过5帧才确认
          if (gestureStableCountRef.current >= 5) {
            setCurrentGesture(gesture);
            onGestureDetected?.(gesture);
          }
        } else {
          gestureStableCountRef.current = 0;
          lastGestureRef.current = null;
          setCurrentGesture(null);
        }
      }
    } else {
      setHandsDetected(false);
      setCurrentGesture(null);
      onHandsDetected?.(false);
      gestureStableCountRef.current = 0;
      lastGestureRef.current = null;
    }
  }, [canvasRef, videoRef, onGestureDetected, onHandsDetected]);

  // 初始化 MediaPipe Hands
  useEffect(() => {
    if (!enabled || !videoRef.current) return;

    const initHands = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 创建 Hands 实例
        const hands = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults(onResults);
        handsRef.current = hands;

        // 创建摄像头实例
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (handsRef.current && videoRef.current) {
              await handsRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        cameraRef.current = camera;
        await camera.start();

        setIsLoading(false);
      } catch (err) {
        console.error('初始化手势识别失败:', err);
        setError(err.message || '无法启动摄像头');
        setIsLoading(false);
      }
    };

    initHands();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [enabled, videoRef, onResults]);

  return {
    isLoading,
    error,
    handsDetected,
    currentGesture,
  };
}

export default useHandTracking;
