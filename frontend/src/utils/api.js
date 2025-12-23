/**
 * SignLingo API 工具
 * 调用边缘函数进行手势校验和统计
 */

// API 基础路径（部署后会自动指向边缘函数）
const API_BASE = '/api';

/**
 * 调用边缘函数校验手势
 * @param {string} gestureId - 手势ID
 * @param {Array} landmarks - 手部关键点数据
 * @param {number} confidence - 置信度
 * @returns {Promise<Object>} 校验结果
 */
export async function verifyGesture(gestureId, landmarks, confidence) {
  try {
    const response = await fetch(`${API_BASE}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gestureId,
        landmarks,
        confidence,
      }),
    });

    if (!response.ok) {
      throw new Error('校验请求失败');
    }

    return await response.json();
  } catch (error) {
    console.error('边缘函数调用失败:', error);
    // 降级处理：返回本地校验结果
    return {
      gestureId,
      verified: confidence >= 0.7,
      confidence,
      feedback: getLocalFeedback(confidence),
      timestamp: Date.now(),
      fallback: true,
    };
  }
}

/**
 * 获取全局统计信息
 * @returns {Promise<Object>} 统计数据
 */
export async function getGlobalStats() {
  try {
    const response = await fetch(`${API_BASE}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('获取统计失败');
    }

    return await response.json();
  } catch (error) {
    console.error('获取统计失败:', error);
    return null;
  }
}

/**
 * 提交用户反馈
 * @param {string} type - 反馈类型
 * @param {string} message - 反馈内容
 * @param {string} gestureId - 相关手势ID
 * @returns {Promise<Object>} 提交结果
 */
export async function submitFeedback(type, message, gestureId) {
  try {
    const response = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        message,
        gestureId,
      }),
    });

    if (!response.ok) {
      throw new Error('提交反馈失败');
    }

    return await response.json();
  } catch (error) {
    console.error('提交反馈失败:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 本地反馈（降级处理）
 */
function getLocalFeedback(confidence) {
  if (confidence >= 0.9) {
    return '太棒了！手势非常标准！';
  } else if (confidence >= 0.7) {
    return '不错！再调整一下手指位置';
  } else {
    return '继续练习！注意观察示范动作';
  }
}
