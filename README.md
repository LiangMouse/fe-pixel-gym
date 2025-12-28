# FE Pixel Gym �️

> 前端手写代码练习场 - 在 `vibe coding` 的时代，坚持古法编程 💪

## 为什么？

在 AI 辅助编程盛行的时代，我相信**手写代码**对于夯实基础的价值。

这个 repo 几乎纯手写实现，用于练习和巩固前端核心技能 😤

## 项目列表

| 项目 | 简介 |
|------|------|
| [Weather WebApp](./packages/weather-webapp/README.md) | 响应式天气预报应用 |

## 项目结构

```
fe-pixel-gym/
├── apps/                     # 复杂应用项目
├── packages/                 # 练习项目 & 公共代码
│   ├── weather-webapp/       # 天气预报应用
│   ├── ui/                   # 共享 UI 组件库
│   ├── config/               # 共享配置
│   ├── eslint-config/        # ESLint 配置
│   ├── typescript-config/    # TypeScript 配置
│   └── hooks/                # 常用 React Hooks
├── pnpm-workspace.yaml       # pnpm 工作区配置
└── turbo.json                # Turborepo 配置
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 运行所有项目
pnpm dev

# 运行特定项目
pnpm --filter @repo/weather-webapp dev
```

### 构建

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

### 代码检查

```bash
pnpm lint
```

## 技术栈

- ⚡️ [Turborepo](https://turbo.build/) - Monorepo 管理
- 📦 [pnpm](https://pnpm.io/) - 包管理器
- ⚛️ [React](https://react.dev/) - UI 框架
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- 🎯 [TypeScript](https://www.typescriptlang.org/) - 类型安全
- ⚡ [Vite](https://vite.dev/) - 构建工具

## 开发规范

- 使用 TypeScript，避免使用 `any` 类型
- 遵循 ESLint 规则
- 尽量手写代码，减少 AI 依赖 🔧

## License

MIT
