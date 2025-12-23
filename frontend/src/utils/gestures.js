/**
 * 手语手势数据库
 * 优化版：每个手势的手指状态唯一，避免识别混淆
 *
 * 手指状态组合说明：
 * - 五指张开: five (五)
 * - 四指张开(无拇指): four (四)
 * - 三指张开(食中无): three (三)
 * - 二指张开(食中): two (二/V)
 * - 一指张开(食指): one (一)
 * - 握拳: fist (拳头)
 * - 拇指伸直: thumbsUp (赞)
 * - 拇指+小指: six (六/打电话)
 * - 拇指+食指+中指: seven (七)
 * - 拇指+食指+中指+无名指: eight (八)
 * - 拇指+中指+无名指+小指: nine (九)
 * - 食指+小指: rock (摇滚)
 * - 拇指+食指: letterL (L)
 * - 拇指+食指+小指: love (爱)
 */

// 基础手语手势库 - 每个手势手指状态唯一
export const GESTURES = {
  // ========== 数字手势 (1-10) ==========
  one: {
    id: 'one',
    name: '一 / 指向',
    nameEn: 'One / Point',
    category: 'numbers',
    description: '伸出食指，其他手指握拳',
    emoji: '☝️',
    difficulty: 1,
    priority: 1,
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
    name: '二 / 胜利',
    nameEn: 'Two / Victory',
    category: 'numbers',
    description: '伸出食指和中指，形成V字',
    emoji: '✌️',
    difficulty: 1,
    priority: 1,
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
    emoji: '3️⃣',
    difficulty: 1,
    priority: 1,
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
    emoji: '4️⃣',
    difficulty: 1,
    priority: 1,
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
    name: '五 / 停',
    nameEn: 'Five / Stop',
    category: 'numbers',
    description: '五指张开',
    emoji: '🖐️',
    difficulty: 1,
    priority: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  six: {
    id: 'six',
    name: '六 / 打电话',
    nameEn: 'Six / Call',
    category: 'numbers',
    description: '伸出拇指和小指，其他手指弯曲',
    emoji: '🤙',
    difficulty: 2,
    priority: 1,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  seven: {
    id: 'seven',
    name: '七',
    nameEn: 'Seven',
    category: 'numbers',
    description: '伸出拇指、食指和中指',
    emoji: '7️⃣',
    difficulty: 2,
    priority: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  eight: {
    id: 'eight',
    name: '八',
    nameEn: 'Eight',
    category: 'numbers',
    description: '伸出拇指、食指、中指和无名指',
    emoji: '8️⃣',
    difficulty: 2,
    priority: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'bent',
    },
  },
  nine: {
    id: 'nine',
    name: '九',
    nameEn: 'Nine',
    category: 'numbers',
    description: '食指弯曲，其他手指伸直',
    emoji: '9️⃣',
    difficulty: 2,
    priority: 1,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  ten: {
    id: 'ten',
    name: '十 / 赞',
    nameEn: 'Ten / Thumbs Up',
    category: 'numbers',
    description: '竖起大拇指，其他手指握拳',
    emoji: '👍',
    difficulty: 1,
    priority: 1,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },

  // ========== 常用手势 ==========
  fist: {
    id: 'fist',
    name: '拳头 / 加油',
    nameEn: 'Fist / Fighting',
    category: 'common',
    description: '握紧拳头，表示加油或力量',
    emoji: '✊',
    difficulty: 1,
    priority: 2,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  rock: {
    id: 'rock',
    name: '摇滚',
    nameEn: 'Rock',
    category: 'common',
    description: '伸出食指和小指，其他手指弯曲',
    emoji: '🤘',
    difficulty: 2,
    priority: 2,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  love: {
    id: 'love',
    name: '爱你',
    nameEn: 'I Love You',
    category: 'common',
    description: '伸出拇指、食指和小指',
    emoji: '🤟',
    difficulty: 2,
    priority: 2,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  letterL: {
    id: 'letterL',
    name: '字母L / 枪',
    nameEn: 'Letter L / Gun',
    category: 'common',
    description: '拇指和食指伸出成L形',
    emoji: '👉',
    difficulty: 1,
    priority: 2,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  pinkyUp: {
    id: 'pinkyUp',
    name: '小指',
    nameEn: 'Pinky',
    category: 'common',
    description: '只伸出小指',
    emoji: '🤙',
    difficulty: 2,
    priority: 2,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  middleFinger: {
    id: 'middleFinger',
    name: '中指',
    nameEn: 'Middle Finger',
    category: 'common',
    description: '只伸出中指',
    emoji: '🖕',
    difficulty: 2,
    priority: 2,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'extended',
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
    nameEn: 'Numbers (1-10)',
    description: '学习用手语表示数字1到10',
    icon: '🔢',
    gestures: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  },
  common: {
    id: 'common',
    name: '常用手势',
    nameEn: 'Common Gestures',
    description: '日常交流中最常用的手势',
    icon: '💬',
    gestures: ['fist', 'rock', 'love', 'letterL', 'pinkyUp', 'middleFinger'],
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
 * 检测当前手势 - 优化版
 * 按优先级排序，数字手势优先
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

  // 按优先级排序手势（数字优先）
  const sortedGestures = Object.entries(GESTURES).sort((a, b) => {
    return (a[1].priority || 99) - (b[1].priority || 99);
  });

  // 遍历所有手势进行匹配
  for (const [gestureId, gesture] of sortedGestures) {
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
    }

    if (match) {
      return {
        ...gesture,
        confidence: 1.0,
        fingerStates: fingerStates,
      };
    }
  }

  return null;
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
