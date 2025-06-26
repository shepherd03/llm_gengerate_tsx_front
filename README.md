# 智能问答系统前端项目

## 项目概述
基于React + TypeScript的智能问答系统前端，支持数据展示、统计分析和可视化功能。

## 当前进展

### 已完成功能
- ✅ 基础聊天界面 (ChatPage.tsx)
- ✅ TSX代码生成和预览
- ✅ API服务集成
- ✅ 基础组件库

### 数据分析页面 (DataAnalysisPage) ✅
- ✅ 创建了完整的数据分析页面 (`src/pages/DataAnalysisPage.tsx`)
- ✅ 支持单步和多步任务处理
- ✅ 集成了三种核心组件：
  - `DataDisplayComponent` - 数据展示组件
  - `StatisticalAnalysisComponent` - 统计分析组件  
  - `VisualizationComponent` - 可视化组件
- ✅ 实现了多步任务的分步执行和渲染
- ✅ 添加了路由配置 (`/analysis`)
- ✅ 更新了导航系统，包含数据分析页面入口
- ✅ 扩展了类型定义以支持多步任务
- ✅ 添加了fadeIn动画效果

### 组件库扩展 ✅
- ✅ `DataDisplayComponent` - 显示数据详情，支持分页显示前10条
- ✅ `StatisticalAnalysisComponent` - 统计分析展示，包含数值统计摘要
- ✅ `VisualizationComponent` - 图表生成，支持柱状图、折线图、饼图
- ✅ `CodePreviewPanel` - 代码预览面板，支持高度配置
  - 支持像素值高度设置 (如: `height={400}`)
  - 支持CSS值高度设置 (如: `height="50vh"`, `height="100%"`)
  - 提供完整的使用示例 (`CodePreviewPanel.example.tsx`)

### 系统集成 ✅
- ✅ 路由系统更新 (`src/router/index.tsx`)
- ✅ 导航头部更新 (`src/components/AppHeader.tsx`)
- ✅ 布局系统更新 (`src/components/AppLayout.tsx`)
- ✅ 类型定义扩展 (`src/types/index.ts`)
- ✅ CSS动画效果添加 (`src/index.css`)



## 技术栈
- React 18
- TypeScript
- Vite
- Tailwind CSS

## 组件使用指南

### CodePreviewPanel 高度配置

`CodePreviewPanel` 组件现在支持通过 `height` 参数配置预览容器的高度：

```typescript
// 固定像素高度
<CodePreviewPanel height={400} />

// 视口高度百分比
<CodePreviewPanel height="50vh" />

// 相对父容器高度
<CodePreviewPanel height="100%" />

// 默认高度（不设置height参数，使用flex-1）
<CodePreviewPanel />
```

#### 参数说明
- `height?: number | string` - 预览容器高度
  - `number` 类型：像素值，如 `400` 表示 400px
  - `string` 类型：CSS值，如 `"50vh"`, `"100%"`, `"300px"` 等
  - 不设置：使用默认的 flex-1 布局

#### 使用场景
- **固定高度**：适用于需要统一高度的预览区域
- **视口高度**：适用于响应式设计，根据屏幕大小调整
- **相对高度**：适用于嵌套在特定容器中的场景
- **默认高度**：适用于弹性布局，自动填充可用空间

## API接口
- `/fetch_data` - 数据获取接口
- `/generate_tsx` - TSX代码生成
- `/health_check` - 健康检查



## 组件结构
```
src/
├── components/     # 通用组件
├── pages/         # 页面组件
├── services/      # API服务
├── types/         # 类型定义
└── utils/         # 工具函数
```