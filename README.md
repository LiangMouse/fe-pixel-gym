# FE Pixel Gym 🎯

> 像素级设计还原练习 - 前端设计体操房

## 项目结构

```
pixel-gym/
├── package.json              # 根目录配置 (Turbo, pnpm)
├── pnpm-workspace.yaml       # 定义工作区
├── turbo.json                # Turbo 管道配置
├── apps/                     # 【存放练习项目】
│   ├── 01-linear-landing     # 示例：Linear 首页还原
│   ├── 02-dub-dashboard      # 示例：Dub 后台还原
│   └── 03-raycast-page       # 示例：Raycast 页面还原
└── packages/                 # 【存放公共代码】
    ├── ui/                   # ★ 共享的 UI 组件库
    │   ├── src/
    │   │   ├── components/ui/  # Shadcn 风格组件
    │   │   └── lib/           # 工具函数 (cn)
    │   └── tailwind.config.ts # 基础 Tailwind 配置
    ├── config/               # 共享配置
    │   ├── eslint/           # ESLint 配置
    │   └── typescript/       # TypeScript 配置
    └── hooks/                # 常用 React Hooks
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 运行所有应用
pnpm dev

# 运行特定应用
cd apps/01-linear-landing
pnpm dev
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

## 添加新的练习项目

1. 在 `apps/` 目录下创建新文件夹
2. 参考 `01-linear-landing` 的结构
3. 在 `package.json` 中添加依赖：
   - `@repo/ui` - 共享组件
   - `@repo/config` - 配置
   - `@repo/hooks` - Hooks (可选)

## Packages 说明

### @repo/ui

共享的 UI 组件库，基于 Shadcn/ui 风格。包含：

- Button, Card 等基础组件
- `cn()` 工具函数用于类名合并
- Tailwind CSS 配置

### @repo/config

统一的代码规范配置：

- ESLint 配置
- TypeScript 配置

### @repo/hooks

常用的 React Hooks：

- `useScroll` - 滚动位置监听
- 更多 Hooks 待添加...

## 技术栈

- ⚡️ [Turborepo](https://turbo.build/) - Monorepo 管理
- 📦 [pnpm](https://pnpm.io/) - 包管理器
- ⚛️ [React 18](https://react.dev/) - UI 框架
- 🎨 [Next.js 15](https://nextjs.org/) - React 框架
- 💨 [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- 🎯 [TypeScript](https://www.typescriptlang.org/) - 类型安全

## 开发规范

- 使用 TypeScript，避免使用 `any` 类型
- 遵循 ESLint 规则
- 使用 Tailwind CSS 进行样式开发
- 组件优先从 `@repo/ui` 引入

## License

MIT
