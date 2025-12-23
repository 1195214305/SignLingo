# SignLingo - 手语实时翻译练习板

<div align="center">

![SignLingo Logo](https://img.shields.io/badge/SignLingo-手语学习-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE4IDExVjZhMiAyIDAgMCAwLTItMnYwYTIgMiAwIDAgMC0yIDJ2MCIvPjxwYXRoIGQ9Ik0xNCAxMFY0YTIgMiAwIDAgMC0yLTJ2MGEyIDIgMCAwIDAtMiAydjIiLz48cGF0aCBkPSJNMTAgMTAuNVY2YTIgMiAwIDAgMC0yLTJ2MGEyIDIgMCAwIDAtMiAydjgiLz48cGF0aCBkPSJNMTggOGEyIDIgMCAxIDEgNCAwdjZhOCA4IDAgMCAxLTggOGgtMmMtMi44IDAtNS41LTEuMS03LjUtMy4xbC0uOS0uOWExIDEgMCAwIDEgMC0xLjRsLjktLjlhMSAxIDAgMCAxIDEuNCAwbC45LjlhNSA1IDAgMCAwIDMuNSAxLjVIMTBhMiAyIDAgMCAwIDItMlY4Ii8+PC9zdmc+)

**让手语学习变得简单有趣**

[![Powered by ESA Pages](https://img.shields.io/badge/Powered%20by-阿里云%20ESA%20Pages-FF6A00?style=flat-square)](https://www.aliyun.com/product/esa)
[![MediaPipe](https://img.shields.io/badge/AI-MediaPipe%20Hands-4285F4?style=flat-square)](https://mediapipe.dev/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square)](https://react.dev/)

[在线体验](#) · [功能介绍](#功能特性) · [技术架构](#技术架构) · [本地开发](#本地开发)

</div>

---

## 声明

> **本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护**

![阿里云ESA](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

## 项目简介

**SignLingo** 是一款基于浏览器的手语学习工具，利用 **MediaPipe Hands** 在前端实时识别用户手势，结合 **阿里云 ESA Pages 边缘函数** 提供 AI 校验和低延迟服务。

本项目旨在帮助：
- 🧏 **听障人士** - 提供便捷的手语练习工具
- 📚 **手语学习者** - 通过实时反馈快速掌握手语
- 👨‍👩‍👧‍👦 **听障家庭** - 促进家庭成员间的沟通

## 功能特性

### 核心功能

| 功能 | 描述 |
|------|------|
| 🖐️ **实时手势识别** | 基于 MediaPipe WASM，纯浏览器端 AI 识别，无需安装软件 |
| 🎯 **即时反馈** | 识别结果实时显示，帮助用户快速纠正动作 |
| 📊 **学习进度** | 追踪练习记录，解锁成就，激励持续学习 |
| 🌍 **边缘加速** | 阿里云 ESA 全球节点，毫秒级响应 |

### 手势库

- **数字手势**: 一、二、三、四、五
- **常用手势**: 好/赞、拳头、OK、摇滚、打电话、指向

## 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   摄像头输入     │  │  MediaPipe WASM │  │  React UI   │ │
│  │   (WebRTC)      │──│  手势识别引擎    │──│  实时反馈   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   阿里云 ESA Pages 边缘节点                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   静态资源缓存   │  │   边缘函数      │  │  Geo-IP     │ │
│  │   (HTML/JS/CSS) │  │   AI 二次校验   │  │  地理定位   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────┬───────────────────────────────┘
                              │ (可选)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      通义千问 API                            │
│                   (AI 手势校验增强)                          │
└─────────────────────────────────────────────────────────────┘
```

## 边缘计算特性 (How We Use Edge)

本项目深度利用阿里云 ESA Pages 的边缘计算能力：

### 1. 边缘函数 (Edge Functions)

```javascript
// functions/api.js - 边缘侧处理手势校验
export async function onRequest(context) {
  const { request, env } = context;

  // 获取用户地理位置
  const geoInfo = {
    country: request.headers.get('CF-IPCountry'),
    city: request.headers.get('CF-IPCity'),
  };

  // 根据地理位置返回本地化内容
  // 边缘侧 AI 校验，减少延迟
}
```

### 2. 地理位置感知

- 自动检测用户所在地区
- 根据地区推荐本地化手语（如中国手语 vs 美国手语）
- 边缘节点就近响应，全球低延迟

### 3. 静态资源边缘缓存

- MediaPipe 模型文件边缘缓存
- 首次加载后，后续访问极速响应
- 全球 CDN 加速

### 4. 流式响应

- AI 反馈流式返回
- 用户无需等待完整响应

## 本地开发

### 环境要求

- Node.js 18+
- 支持 WebRTC 的现代浏览器
- 摄像头设备

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/your-username/SignLingo.git
cd SignLingo

# 安装依赖
cd frontend
npm install

# 启动开发服务器
npm run dev
```

### 项目结构

```
SignLingo/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # React 组件
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CameraView.jsx
│   │   │   └── GestureCard.jsx
│   │   ├── pages/           # 页面
│   │   │   ├── HomePage.jsx
│   │   │   ├── PracticePage.jsx
│   │   │   └── ProgressPage.jsx
│   │   ├── hooks/           # 自定义 Hooks
│   │   │   └── useHandTracking.js
│   │   └── utils/           # 工具函数
│   │       └── gestures.js  # 手势定义
│   └── package.json
├── functions/               # 边缘函数
│   └── api.js              # API 处理
└── README.md
```

## 部署

### ESA Pages 部署配置

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `npm install && npm run build` |
| 根目录 | `/frontend` |
| 静态资源目录 | `dist` |
| Node.js 版本 | 18.x |

### 环境变量（可选）

| 变量名 | 描述 |
|--------|------|
| `QWEN_API_KEY` | 通义千问 API Key（用于 AI 二次校验） |

## 技术栈

- **前端框架**: React 18 + Vite
- **样式**: TailwindCSS 4
- **动画**: Framer Motion
- **手势识别**: MediaPipe Hands (WASM)
- **部署**: 阿里云 ESA Pages
- **边缘计算**: ESA Edge Functions

## 社会价值

SignLingo 致力于：

1. **无障碍设计** - 让技术服务于每一个人
2. **教育普及** - 降低手语学习门槛
3. **社会包容** - 促进听障群体与社会的沟通

## 许可证

MIT License

---

<div align="center">

**阿里云 ESA Pages 边缘开发大赛参赛作品**

Made with ❤️ for accessibility

---

**本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护**

</div>
