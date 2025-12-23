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
  // ========== 数字手势 (0-10) ==========
  zero: {
    id: 'zero',
    name: '零',
    nameEn: 'Zero',
    category: 'numbers',
    description: '握拳，拇指和食指形成圆圈',
    emoji: '0️⃣',
    difficulty: 2,
    fingers: {
      thumb: 'touching_index',
      index: 'touching_thumb',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  one: {
    id: 'one',
    name: '一',
    nameEn: 'One',
    category: 'numbers',
    description: '伸出食指，其他手指握拳',
    emoji: '1️⃣',
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
    emoji: '2️⃣',
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
    emoji: '3️⃣',
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
    emoji: '4️⃣',
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
    emoji: '5️⃣',
    difficulty: 1,
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
    name: '六',
    nameEn: 'Six',
    category: 'numbers',
    description: '伸出拇指和小指，其他手指弯曲',
    emoji: '6️⃣',
    difficulty: 2,
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
    description: '食指弯曲成钩状，其他手指伸直',
    emoji: '9️⃣',
    difficulty: 2,
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
    name: '十',
    nameEn: 'Ten',
    category: 'numbers',
    description: '竖起大拇指，其他手指握拳（或双手各伸五指）',
    emoji: '🔟',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },

  // ========== 常用手势 ==========
  thumbsUp: {
    id: 'thumbsUp',
    name: '好/赞',
    nameEn: 'Thumbs Up',
    category: 'common',
    description: '竖起大拇指，其他手指握拳，表示赞同或很好',
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
    description: '握紧拳头，表示加油或力量',
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
    name: 'OK/好的',
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
    nameEn: 'Rock / I Love You',
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
    description: '伸出拇指和小指，其他手指弯曲，模拟电话',
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
    name: '指向/这个',
    nameEn: 'Point',
    category: 'common',
    description: '伸出食指指向前方，表示指示方向或选择',
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
  peace: {
    id: 'peace',
    name: '和平/胜利',
    nameEn: 'Peace / Victory',
    category: 'common',
    description: '伸出食指和中指形成V字，表示和平或胜利',
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
  stop: {
    id: 'stop',
    name: '停/等一下',
    nameEn: 'Stop',
    category: 'common',
    description: '五指张开，手掌朝前，表示停止',
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

  // ========== 日常交流手势 ==========
  hello: {
    id: 'hello',
    name: '你好',
    nameEn: 'Hello',
    category: 'daily',
    description: '五指张开，手掌朝前轻轻挥动',
    emoji: '👋',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  thanks: {
    id: 'thanks',
    name: '谢谢',
    nameEn: 'Thank You',
    category: 'daily',
    description: '手掌朝下，从嘴边向前移动',
    emoji: '🙏',
    difficulty: 2,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  sorry: {
    id: 'sorry',
    name: '对不起',
    nameEn: 'Sorry',
    category: 'daily',
    description: '握拳放在胸前，做圆周运动',
    emoji: '😔',
    difficulty: 2,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  please: {
    id: 'please',
    name: '请',
    nameEn: 'Please',
    category: 'daily',
    description: '手掌朝上，向前伸出',
    emoji: '🤲',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  yes: {
    id: 'yes',
    name: '是/对',
    nameEn: 'Yes',
    category: 'daily',
    description: '握拳，像点头一样上下移动',
    emoji: '✅',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  no: {
    id: 'no',
    name: '不/不是',
    nameEn: 'No',
    category: 'daily',
    description: '食指和中指伸出，像剪刀一样合拢',
    emoji: '❌',
    difficulty: 2,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  help: {
    id: 'help',
    name: '帮助',
    nameEn: 'Help',
    category: 'daily',
    description: '一只手握拳放在另一只手掌上，向上推',
    emoji: '🆘',
    difficulty: 2,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  love: {
    id: 'love',
    name: '爱/喜欢',
    nameEn: 'Love',
    category: 'daily',
    description: '双手交叉放在胸前，或伸出拇指、食指和小指',
    emoji: '❤️',
    difficulty: 2,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },

  // ========== 字母手势 (A-F) ==========
  letterA: {
    id: 'letterA',
    name: '字母A',
    nameEn: 'Letter A',
    category: 'alphabet',
    description: '握拳，拇指贴在拳头侧面',
    emoji: '🅰️',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  letterB: {
    id: 'letterB',
    name: '字母B',
    nameEn: 'Letter B',
    category: 'alphabet',
    description: '四指伸直并拢，拇指弯曲贴在手掌',
    emoji: '🅱️',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  letterC: {
    id: 'letterC',
    name: '字母C',
    nameEn: 'Letter C',
    category: 'alphabet',
    description: '手指弯曲成C形',
    emoji: '©️',
    difficulty: 2,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  letterD: {
    id: 'letterD',
    name: '字母D',
    nameEn: 'Letter D',
    category: 'alphabet',
    description: '食指伸直，其他手指和拇指形成圆圈',
    emoji: '🇩',
    difficulty: 2,
    fingers: {
      thumb: 'touching_middle',
      index: 'extended',
      middle: 'touching_thumb',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  letterF: {
    id: 'letterF',
    name: '字母F',
    nameEn: 'Letter F',
    category: 'alphabet',
    description: '拇指和食指形成圆圈，其他三指伸直',
    emoji: '🇫',
    difficulty: 2,
    fingers: {
      thumb: 'touching_index',
      index: 'touching_thumb',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
  letterL: {
    id: 'letterL',
    name: '字母L',
    nameEn: 'Letter L',
    category: 'alphabet',
    description: '拇指和食指伸出成L形，其他手指弯曲',
    emoji: '🇱',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  letterV: {
    id: 'letterV',
    name: '字母V',
    nameEn: 'Letter V',
    category: 'alphabet',
    description: '食指和中指伸出成V形',
    emoji: '🇻',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  letterW: {
    id: 'letterW',
    name: '字母W',
    nameEn: 'Letter W',
    category: 'alphabet',
    description: '食指、中指、无名指伸出成W形',
    emoji: '🇼',
    difficulty: 1,
    fingers: {
      thumb: 'bent',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'bent',
    },
  },
  letterY: {
    id: 'letterY',
    name: '字母Y',
    nameEn: 'Letter Y',
    category: 'alphabet',
    description: '拇指和小指伸出成Y形',
    emoji: '🇾',
    difficulty: 1,
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
};

// 手势分类
export const GESTURE_CATEGORIES = {
  numbers: {
    id: 'numbers',
    name: '数字手势',
    nameEn: 'Numbers (0-10)',
    description: '学习用手语表示数字0到10',
    icon: '🔢',
    gestures: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  },
  common: {
    id: 'common',
    name: '常用手势',
    nameEn: 'Common Gestures',
    description: '日常交流中最常用的手势',
    icon: '💬',
    gestures: ['thumbsUp', 'fist', 'ok', 'rock', 'call', 'point', 'peace', 'stop'],
  },
  daily: {
    id: 'daily',
    name: '日常交流',
    nameEn: 'Daily Communication',
    description: '日常生活中常用的交流手势',
    icon: '🗣️',
    gestures: ['hello', 'thanks', 'sorry', 'please', 'yes', 'no', 'help', 'love'],
  },
  alphabet: {
    id: 'alphabet',
    name: '字母手势',
    nameEn: 'Alphabet',
    description: '学习手语字母表',
    icon: '🔤',
    gestures: ['letterA', 'letterB', 'letterC', 'letterD', 'letterF', 'letterL', 'letterV', 'letterW', 'letterY'],
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
