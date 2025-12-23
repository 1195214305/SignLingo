/**
 * 中国手语手势数据库
 * 基于《中国手语》国家通用手语标准
 *
 * 每个手势包含：
 * - 手指状态定义（用于识别）
 * - 详细的含义说明
 * - 使用场景
 * - 文化背景
 */

// 基础手语手势库 - 每个手势手指状态唯一
export const GESTURES = {
  // ========== 数字手势 (1-10) ==========
  one: {
    id: 'one',
    name: '一',
    nameEn: 'One',
    category: 'numbers',
    emoji: '☝️',
    difficulty: 1,
    priority: 1,
    description: '伸出食指，其他手指握拳',
    meaning: '数字"1"，也可表示"第一"、"一个"、"单独"等含义',
    usage: '日常计数、表示数量、强调唯一性',
    culture: '在中国手语中，数字1-5的手势与日常生活中的手势相同，便于理解',
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
    emoji: '✌️',
    difficulty: 1,
    priority: 1,
    description: '伸出食指和中指，形成V字',
    meaning: '数字"2"，也是国际通用的"胜利"手势，表示和平、成功',
    usage: '计数、拍照时表示开心、表示胜利',
    culture: '二战时期丘吉尔使用此手势表示胜利(Victory)，后成为全球通用的和平/胜利符号',
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
    emoji: '3️⃣',
    difficulty: 1,
    priority: 1,
    description: '伸出食指、中指和无名指',
    meaning: '数字"3"，在某些语境下也表示"OK"或"完美"',
    usage: '日常计数、表示数量',
    culture: '中国传统文化中"三"是吉祥数字，代表"天地人"三才',
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
    emoji: '4️⃣',
    difficulty: 1,
    priority: 1,
    description: '伸出四根手指，拇指弯曲贴于掌心',
    meaning: '数字"4"，四指并拢表示整齐、团结',
    usage: '日常计数、表示数量',
    culture: '虽然"四"在某些场合谐音"死"，但在手语中是中性的数字表达',
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
    emoji: '🖐️',
    difficulty: 1,
    priority: 1,
    description: '五指张开，手掌朝前',
    meaning: '数字"5"，也表示"停止"、"等一下"、"打招呼"',
    usage: '计数、打招呼、示意停止、引起注意',
    culture: '张开的手掌是人类最原始的友好信号，表示"我没有武器"',
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
    emoji: '🤙',
    difficulty: 2,
    priority: 1,
    description: '伸出拇指和小指，其他手指弯曲',
    meaning: '数字"6"，在中国也表示"打电话"的动作，夏威夷文化中是"Shaka"问候',
    usage: '计数、表示打电话、冲浪文化中的问候',
    culture: '这个手势在夏威夷叫"Shaka"，表示放松、友好，是冲浪文化的标志',
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
    emoji: '7️⃣',
    difficulty: 2,
    priority: 1,
    description: '伸出拇指、食指和中指',
    meaning: '数字"7"，三指张开如同数字7的形状',
    usage: '日常计数、表示数量',
    culture: '"七"在中国文化中是吉祥数字，七夕节、北斗七星等都与七相关',
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
    emoji: '8️⃣',
    difficulty: 2,
    priority: 1,
    description: '伸出拇指、食指、中指和无名指',
    meaning: '数字"8"，在中国文化中是最吉祥的数字，谐音"发"',
    usage: '日常计数、表示吉祥',
    culture: '"八"谐音"发财"，是中国人最喜欢的数字，常用于电话号码、车牌等',
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
    emoji: '9️⃣',
    difficulty: 2,
    priority: 1,
    description: '食指弯曲成钩状，其他手指伸直',
    meaning: '数字"9"，食指弯曲模拟数字9的形状，也表示"长久"',
    usage: '日常计数、表示长久',
    culture: '"九"谐音"久"，代表长长久久，常用于婚礼、祝福等场合',
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
    emoji: '👍',
    difficulty: 1,
    priority: 1,
    description: '竖起大拇指，其他手指握拳',
    meaning: '数字"10"，同时也是国际通用的"赞"、"好"、"同意"手势',
    usage: '计数、表示赞同、鼓励、肯定',
    culture: '竖起大拇指在大多数文化中都是正面含义，但在某些中东国家可能有冒犯意味',
    fingers: {
      thumb: 'extended',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },

  // ========== 常用交流手势 ==========
  fist: {
    id: 'fist',
    name: '拳头',
    nameEn: 'Fist',
    category: 'common',
    emoji: '✊',
    difficulty: 1,
    priority: 2,
    description: '五指握紧成拳',
    meaning: '表示"加油"、"力量"、"团结"、"坚持"，也用于表示愤怒或决心',
    usage: '鼓励他人、表达决心、运动场上加油、表示团结',
    culture: '握拳是人类表达力量和决心的本能动作，在各种文化中都有类似含义',
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
    emoji: '🤘',
    difficulty: 2,
    priority: 2,
    description: '伸出食指和小指，其他手指弯曲',
    meaning: '摇滚乐的标志性手势，表示"摇滚"、"酷"、"热情"',
    usage: '音乐会、表达热情、表示很酷',
    culture: '由Black Sabbath乐队的Ronnie James Dio推广，源自意大利驱邪手势',
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
    name: '我爱你',
    nameEn: 'I Love You',
    category: 'common',
    emoji: '🤟',
    difficulty: 2,
    priority: 2,
    description: '伸出拇指、食指和小指',
    meaning: '美国手语中的"我爱你"，结合了I、L、Y三个字母的手势',
    usage: '表达爱意、告别时的温馨手势、演唱会上与偶像互动',
    culture: '这是美国手语(ASL)的标志性手势，由I(小指)、L(拇指+食指)、Y(拇指+小指)组合而成',
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
    name: '字母L',
    nameEn: 'Letter L',
    category: 'common',
    emoji: '👉',
    difficulty: 1,
    priority: 2,
    description: '拇指和食指伸出成L形，其他手指弯曲',
    meaning: '字母"L"，在网络文化中也表示"Loser(失败者)"，但更多用于指示方向',
    usage: '表示字母L、指示方向、拍照造型',
    culture: '在美国手语中是字母L，在某些青年文化中放在额头表示"Loser"',
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  pinkyPromise: {
    id: 'pinkyPromise',
    name: '拉钩',
    nameEn: 'Pinky Promise',
    category: 'common',
    emoji: '🤙',
    difficulty: 2,
    priority: 2,
    description: '只伸出小指，其他手指弯曲',
    meaning: '表示"约定"、"承诺"，两人小指相勾表示拉钩约定',
    usage: '与朋友做约定、表示承诺、儿童之间的誓言',
    culture: '拉钩约定起源于日本，"拉钩上吊一百年不许变"是中国儿童常用的誓言',
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },

  // ========== 日常生活手势 ==========
  thinking: {
    id: 'thinking',
    name: '思考',
    nameEn: 'Thinking',
    category: 'daily',
    emoji: '🤔',
    difficulty: 2,
    priority: 3,
    description: '只伸出中指，其他手指弯曲',
    meaning: '在手语中表示"思考"、"想一想"，中指指向太阳穴表示动脑',
    usage: '表示正在思考、请对方等待、表示需要时间考虑',
    culture: '在手语中，指向头部的动作通常与思维、想法相关',
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'extended',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  ringFinger: {
    id: 'ringFinger',
    name: '无名指',
    nameEn: 'Ring Finger',
    category: 'daily',
    emoji: '💍',
    difficulty: 3,
    priority: 3,
    description: '只伸出无名指，其他手指弯曲',
    meaning: '表示"戒指"、"婚姻"、"承诺"，因为结婚戒指戴在无名指上',
    usage: '谈论婚姻、表示已婚、询问感情状态',
    culture: '古罗马人相信无名指有一条"爱情之脉"直通心脏，所以结婚戒指戴在这里',
    fingers: {
      thumb: 'bent',
      index: 'bent',
      middle: 'bent',
      ring: 'extended',
      pinky: 'bent',
    },
  },
  thumbIndex: {
    id: 'thumbIndex',
    name: '比心',
    nameEn: 'Finger Heart',
    category: 'daily',
    emoji: '🫰',
    difficulty: 2,
    priority: 3,
    description: '拇指和食指交叉成心形，其他手指弯曲',
    meaning: '韩国流行的"比心"手势，表示"爱你"、"喜欢"',
    usage: '拍照、向偶像表达喜爱、社交媒体',
    culture: '起源于韩国，由K-pop偶像推广到全球，是当代年轻人表达喜爱的流行方式',
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'bent',
    },
  },
  spiderman: {
    id: 'spiderman',
    name: '蜘蛛侠',
    nameEn: 'Spider-Man',
    category: 'daily',
    emoji: '🕷️',
    difficulty: 2,
    priority: 3,
    description: '伸出拇指、食指和小指，中指和无名指弯曲触碰掌心',
    meaning: '蜘蛛侠发射蛛丝的经典手势，表示"酷"、"超级英雄"',
    usage: '模仿蜘蛛侠、表达酷炫、儿童游戏',
    culture: '源自漫威漫画《蜘蛛侠》，彼得·帕克用这个手势触发蛛丝发射器',
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'bent',
      ring: 'bent',
      pinky: 'extended',
    },
  },
  vulcan: {
    id: 'vulcan',
    name: '瓦肯举手礼',
    nameEn: 'Vulcan Salute',
    category: 'daily',
    emoji: '🖖',
    difficulty: 3,
    priority: 3,
    description: '中指和无名指分开，形成V形分叉',
    meaning: '《星际迷航》中瓦肯人的问候语"Live long and prosper(生生不息，繁荣昌盛)"',
    usage: '科幻迷之间的问候、表达祝福',
    culture: '由演员Leonard Nimoy创造，灵感来自犹太教祭司的祝福手势',
    fingers: {
      thumb: 'extended',
      index: 'extended',
      middle: 'extended',
      ring: 'extended',
      pinky: 'extended',
    },
  },
};

// 手势分类
export const GESTURE_CATEGORIES = {
  numbers: {
    id: 'numbers',
    name: '数字手势',
    nameEn: 'Numbers (1-10)',
    description: '学习用手语表示数字1到10，这是手语学习的基础',
    icon: '🔢',
    gestures: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  },
  common: {
    id: 'common',
    name: '常用手势',
    nameEn: 'Common Gestures',
    description: '日常交流中最常用的手势，具有丰富的文化内涵',
    icon: '💬',
    gestures: ['fist', 'rock', 'love', 'letterL', 'pinkyPromise'],
  },
  daily: {
    id: 'daily',
    name: '趣味手势',
    nameEn: 'Fun Gestures',
    description: '流行文化和日常生活中的有趣手势',
    icon: '🎉',
    gestures: ['thinking', 'ringFinger', 'thumbIndex', 'spiderman', 'vulcan'],
  },
};

/**
 * 计算手指是否伸直
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

  if (finger === 'thumb') {
    const tip = landmarks[4];
    const base = landmarks[2];
    const wrist = landmarks[0];

    const tipToWrist = Math.sqrt(
      Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2)
    );
    const baseToWrist = Math.sqrt(
      Math.pow(base.x - wrist.x, 2) + Math.pow(base.y - wrist.y, 2)
    );

    return tipToWrist > baseToWrist * 1.2;
  }

  const tip = landmarks[indices[3]];
  const pip = landmarks[indices[2]];
  const mcp = landmarks[indices[1]];

  return tip.y < pip.y && pip.y < mcp.y;
}

/**
 * 检测当前手势
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

  // 按优先级排序
  const sortedGestures = Object.entries(GESTURES).sort((a, b) => {
    return (a[1].priority || 99) - (b[1].priority || 99);
  });

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
 */
export function getGesturesByCategory(category) {
  const cat = GESTURE_CATEGORIES[category];
  if (!cat) return [];

  return cat.gestures.map(id => GESTURES[id]).filter(Boolean);
}

/**
 * 获取所有手势
 */
export function getAllGestures() {
  return Object.values(GESTURES);
}

export default GESTURES;
