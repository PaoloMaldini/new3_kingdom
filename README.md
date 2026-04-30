# 千古筑迹

一款历史遗址命运抉择类卡牌游戏，穿越千年风云，抉择历史命运。

![Game Preview](https://img.shields.io/badge/Vue-3-42b983?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring)

## 🎮 游戏简介

**千古筑迹** 是一款以中国历史遗址为主题的命运抉择类卡牌游戏。玩家将扮演历史人物，在左右抉择中体验历史的波澜壮阔。

### 核心玩法

- 🔮 **左右抉择**：每回合面临两个选择，左右滑动卡片进行抉择
- 📊 **四维属性**：天意、权谋、兵力、粮草，属性过高或耗尽都会导致游戏结束
- 🏛️ **十大遗址**：五丈原、剑门关、采石矶、垓下、马嵬驿、钓鱼城、景山、山海关、襄阳古城、卢沟桥与华清宫
- 🎵 **沉浸音效**：根据结局和属性变化智能播放背景音效

## 🏛️ 遗址剧本

| 遗址 | 时代 | 核心人物 |
|------|------|---------|
| 五丈原诸葛亮庙 | 三国 · 公元234年 | 诸葛亮、司马懿 |
| 剑门关 | 三国 · 公元263年 | 姜维、钟会、邓艾 |
| 采石矶 | 南宋 · 公元1161年 | 虞允文、完颜亮 |
| 垓下遗址 | 楚汉 · 公元前202年 | 项羽、刘邦、虞姬 |
| 马嵬驿 | 盛唐 · 公元756年 | 唐玄宗、杨贵妃、陈玄礼 |
| 钓鱼城遗址 | 南宋 · 公元1259年 | 王坚、张珏、蒙哥 |
| 景山 | 明末 · 公元1644年 | 崇祯帝 |
| 山海关 | 明末清初 · 公元1644年 | 吴三桂、李自成、多尔衮 |
| 襄阳古城 | 宋元 · 公元1267-1273年 | 吕文焕、忽必烈 |
| 卢沟桥与宛平城 | 民国 · 公元1937年 | 宋哲元、何基沣 |
| 华清宫 | 唐宋/1936年 | 唐玄宗、张学良、蒋介石 |

## 🎨 技术栈

### 前端
- Vue 3 + Composition API
- TypeScript
- Vite 构建工具
- Pinia 状态管理
- Vue Router 路由

### 后端
- Spring Boot
- Java

### 部署
- Nginx
- Docker

## 🚀 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 后端

```bash
cd backend
mvn spring-boot:run
```

### 构建生产版本

```bash
cd frontend
npm run build
```

## 📁 项目结构

```
gamedemo/
├── frontend/              # 前端项目
│   ├── public/
│   │   ├── audio/       # 音效文件
│   │   └── img/         # 图片资源
│   └── src/
│       ├── components/    # Vue 组件
│       ├── data/          # 游戏数据
│       ├── stores/        # Pinia 状态管理
│       ├── utils/         # 工具函数
│       └── views/          # 页面视图
├── backend/              # 后端项目
│   └── src/main/java/    # Java 源码
├── deploy/               # 部署配置
└── nginx/                # Nginx 配置
```

## 🎵 音效系统

游戏内置音效反馈系统：
- **真结局**：播放《关羽之歌》或《刘备之死》
- **属性警告**：根据属性变化播放不同音效
- **智能打断**：用户操作时自动停止当前音效

## 📝 License

MIT License
