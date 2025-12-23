/**
 * 手语手势数据库
 * 包含基础手语手势的定义和识别规则
 */

// 手指状态检测阈值
const FINGER_THRESHOLDS = {
  EXTENDED: 0.7,  // 手指伸直阈值
  BENT: 0.3,      // 手指弯曲阈值
};

// 基础手语手势库
export const GESTURES = {
  // 数字手势
  one: {
    id: 'one',
    name: '一',
    nameEn: 'One',
    category: 'numbers',
    description: '伸出食指，其他手指握拳',
    emoji: '☝️',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  two: {
    id: 'two',
    name: '二',
    nameEn: 'Two',
    category: 'numbers',
    description: '伸出食指和中指，形成V字',
    emoji: '✌️',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  three: {
    id: 'three',
    name: '三',
    nameEn: 'Three',
    category: 'numbers',
    description: '伸出食指、中指和无名指',
    emoji: '🤟',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'bent',
    },
  },
  four: {
    id: 'four',
    name: '四',
    nameEn: 'Four',
    category: 'numbers',
    description: '伸出四根手指，拇指弯曲',
    emoji: '🖖',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  five: {
    id: 'five',
    name: '五',
    nameEn: 'Five',
    category: 'numbers',
    description: '五指张开',
    emoji: '🖐️',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  // 常用手势
  thumbsUp: {
    id: 'thumbsUp',
    name: '好/赞',
    nameEn: 'Thumbs Up',
    category: 'common',
    description: '竖起大拇指，其他手指握拳',
    emoji: '👍',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  fist: {
    id: 'fist',
    name: '拳头/加油',
    nameEn: 'Fist',
    category: 'common',
    description: '握紧拳头',
    emoji: '✊',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  ok: {
    id: 'ok',
    name: 'OK',
    nameEn: 'OK',
    category: 'common',
    description: '拇指和食指形成圆圈，其他手指伸直',
    emoji: '👌',
    difficulty: 2,
    fingers: {
      thumb: 'touching_index',
      index: 'touching_thumb',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  rock: {
    id: 'rock',
    name: '摇滚/爱你',
    nameEn: 'Rock',
    category: 'common',
    description: '伸出食指和小指，其他手指弯曲',
    emoji: '🤘',
    difficulty: 2,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  call: {
    id: 'call',
    name: '打电话',
    nameEn: 'Call Me',
    category: 'common',
    description: '伸出拇指和小指，其他手指弯曲',
    emoji: '🤙',
    difficulty: 2,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  point: {
    id: 'point',
    name: '指向',
    nameEn: 'Point',
    category: 'common',
    description: '伸出食指指向前方',
    emoji: '👆',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
};

// 手势分类
export const GESTURE_CATEGORIES = {
  numbers: {
    id: 'numbers',
    name: '数字手势',
    nameEn: 'Numbers',
    description: '学习用手语表示数字',
    icon: '🔢',
    gestures: ['one', 'two', 'three', 'four', 'five'],
  },
  common: {
    id: 'common',
    name: '常用手势',
    nameEn: 'Common',
    description: '日常交流中常用的手势',
    icon: '💬',
    gestures: ['thumbsUp', 'fist', 'ok', 'rock', 'call', 'point'],
  },
};

/**
 * 计算手指是否伸直
 * @param {Array} landmarks - MediaPipe手部关键点
 * @param {string} finger - 手指名称
 * @returns {boolean}
 */
function isFingerExtended(landmarks, finger) {
  const fingerIndices = {
    thumb: [1, 2, 3, 4],
    index: [5, 6, 7, 8],
    middle: [9, 10, 11, 12],
    ring: [13, 14, 15, 16],
    pinky: [17, 18, 19, 20],
  };

  const indices = fingerIndices[finger];
  if (!indices) return false;

  // 对于拇指，使用不同的判断逻辑
  if (finger === 'thumb') {
    const tip = landmarks[4];
    const base = landmarks[2];
    const wrist = landmarks[0];

    // 拇指伸直时，指尖应该远离手腕
    const tipToWrist = Math.sqrt(
      Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2)
    );
    const baseToWrist = Math.sqrt(
      Math.pow(base.x - wrist.x, 2) + Math.pow(base.y - wrist.y, 2)
    );

    return tipToWrist > baseToWrist * 1.2;
  }

  // 其他手指：比较指尖和指根的y坐标
  const tip = landmarks[indices[3]];
  const pip = landmarks[indices[2]];
  const mcp = landmarks[indices[1]];

  // 手指伸直时，指尖y坐标应该小于指根（屏幕坐标系y向下）
  return tip.y < pip.y && pip.y < mcp.y;
}

/**
 * 检测当前手势
 * @param {Array} landmarks - MediaPipe手部关键点
 * @returns {Object|null} 匹配的手势或null
 */
export function detectGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return null;

  const fingerStates = {
    thumb: isFingerExtended(landmarks, 'thumb'),
    index: isFingerExtended(landmarks, 'index'),
    middle: isFingerExtended(landmarks, 'middle'),
    ring: isFingerExtended(landmarks, 'ring'),
    pinky: isFingerExtended(landmarks, 'pinky'),
  };

  // 遍历所有手势进行匹配
  for (const [gestureId, gesture] of Object.entries(GESTURES)) {
    let match = true;

    for (const [finger, expectedState] of Object.entries(gesture.fingers)) {
      const isExtended = fingerStates[finger];

      if (expectedState === 'extended' && !isExtended) {
        match = false;
        break;
      }
      if (expectedState === 'bent' && isExtended) {
        match = false;
        break;
      }
      // 特殊状态（如touching）暂时跳过精确检测
      if (expectedState.startsWith('touching')) {
        continue;
      }
    }

    if (match) {
      return {
        ...gesture,
        confidence: calculateConfidence(fingerStates, gesture.fingers),
      };
    }
  }

  return null;
}

/**
 * 计算手势匹配置信度
 */
function calculateConfidence(fingerStates, expectedFingers) {
  let matches = 0;
  let total = 0;

  for (const [finger, expectedState] of Object.entries(expectedFingers)) {
    if (expectedState.startsWith('touching')) continue;

    total++;
    const isExtended = fingerStates[finger];

    if ((expectedState === 'extended' && isExtended) ||
        (expectedState === 'bent' && !isExtended)) {
      matches++;
    }
  }

  return total > 0 ? matches / total : 0;
}

/**
 * 获取手势练习列表
 * @param {string} category - 分类ID
 * @returns {Array}
 */
export function getGesturesByCategory(category) {
  const cat = GESTURE_CATEGORIES[category];
  if (!cat) return [];

  return cat.gestures.map(id => GESTURES[id]).filter(Boolean);
}

/**
 * 获取所有手势
 * @returns {Array}
 */
export function getAllGestures() {
  return Object.values(GESTURES);
}

export default GESTURES;
