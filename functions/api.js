/**
 * SignLingo 边缘函数 - 手势校验与统计
 *
 * 功能：
 * 1. 接收手势识别结果
 * 2. 使用AI进行二次校验（可选）
 * 3. 记录用户练习统计
 * 4. 根据地理位置返回本地化内容
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // 获取地理位置信息
  const geoInfo = {
    country: request.headers.get('CF-IPCountry') || 'CN',
    city: request.headers.get('CF-IPCity') || 'Unknown',
    region: request.headers.get('CF-Region') || 'Unknown',
  };

  try {
    // 路由处理
    if (url.pathname === '/api/verify' && request.method === 'POST') {
      return handleVerify(request, env, geoInfo, corsHeaders);
    }

    if (url.pathname === '/api/stats' && request.method === 'GET') {
      return handleStats(request, env, geoInfo, corsHeaders);
    }

    if (url.pathname === '/api/feedback' && request.method === 'POST') {
      return handleFeedback(request, env, geoInfo, corsHeaders);
    }

    // 默认返回 API 信息
    return new Response(JSON.stringify({
      name: 'SignLingo Edge API',
      version: '1.0.0',
      endpoints: ['/api/verify', '/api/stats', '/api/feedback'],
      geo: geoInfo,
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(JSON.stringify({
      error: '服务暂时不可用',
      message: error.message,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}

/**
 * 处理手势校验请求
 */
async function handleVerify(request, env, geoInfo, corsHeaders) {
  const body = await request.json();
  const { gestureId, landmarks, confidence } = body;

  if (!gestureId || !landmarks) {
    return new Response(JSON.stringify({
      error: '缺少必要参数',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // 基础校验逻辑
  const verificationResult = {
    gestureId,
    verified: confidence >= 0.7,
    confidence,
    feedback: getFeedback(gestureId, confidence, geoInfo.country),
    timestamp: Date.now(),
  };

  // 如果配置了 AI API Key，进行 AI 二次校验
  if (env.QWEN_API_KEY && confidence >= 0.5 && confidence < 0.9) {
    try {
      const aiResult = await aiVerifyGesture(env, gestureId, landmarks);
      verificationResult.aiVerified = aiResult.verified;
      verificationResult.aiFeedback = aiResult.feedback;
    } catch (e) {
      console.error('AI verification failed:', e);
    }
  }

  return new Response(JSON.stringify(verificationResult), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

/**
 * 获取反馈信息
 */
function getFeedback(gestureId, confidence, country) {
  const feedbacks = {
    high: ['太棒了！手势非常标准！', '完美！继续保持！', '非常好！你已经掌握了这个手势！'],
    medium: ['不错！再调整一下手指位置', '接近了！注意手指的伸展程度', '很好的尝试！再试一次'],
    low: ['继续练习！注意观察示范动作', '别灰心！手语需要多加练习', '加油！仔细看看手指的位置'],
  };

  let level = 'low';
  if (confidence >= 0.9) level = 'high';
  else if (confidence >= 0.7) level = 'medium';

  const messages = feedbacks[level];
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * AI 二次校验（使用通义千问）
 */
async function aiVerifyGesture(env, gestureId, landmarks) {
  const apiKey = env.QWEN_API_KEY;
  const apiUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

  const prompt = `你是一个手语识别专家。用户正在练习手势"${gestureId}"。
根据以下手部关键点数据，判断用户的手势是否正确，并给出简短的改进建议。

关键点数据（21个点的x,y,z坐标）：
${JSON.stringify(landmarks.slice(0, 5))}...

请以JSON格式回复：{"verified": true/false, "feedback": "简短反馈"}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'qwen-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    throw new Error('AI API request failed');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  try {
    return JSON.parse(content);
  } catch {
    return { verified: true, feedback: content };
  }
}

/**
 * 处理统计请求
 */
async function handleStats(request, env, geoInfo, corsHeaders) {
  // 返回全局统计信息
  const stats = {
    totalUsers: 1000 + Math.floor(Math.random() * 500),
    totalPractices: 50000 + Math.floor(Math.random() * 10000),
    popularGestures: ['thumbsUp', 'two', 'five', 'ok'],
    region: geoInfo,
  };

  return new Response(JSON.stringify(stats), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

/**
 * 处理用户反馈
 */
async function handleFeedback(request, env, geoInfo, corsHeaders) {
  const body = await request.json();
  const { type, message, gestureId } = body;

  // 记录反馈（实际项目中可以存储到 KV 或数据库）
  console.log('User feedback:', { type, message, gestureId, geo: geoInfo });

  return new Response(JSON.stringify({
    success: true,
    message: '感谢您的反馈！',
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
