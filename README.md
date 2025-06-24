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

### 系统集成 ✅
- ✅ 路由系统更新 (`src/router/index.tsx`)
- ✅ 导航头部更新 (`src/components/AppHeader.tsx`)
- ✅ 布局系统更新 (`src/components/AppLayout.tsx`)
- ✅ 类型定义扩展 (`src/types/index.ts`)
- ✅ CSS动画效果添加 (`src/index.css`)

### 模拟数据系统 ✅
- ✅ 创建了完整的模拟数据服务 (`src/services/mockData.ts`)
- ✅ 支持所有API文档中定义的响应格式
- ✅ 智能识别用户输入，返回对应类型的模拟数据
- ✅ 自动故障转移：API连接失败时自动切换到模拟数据
- ✅ 模式切换功能：用户可手动切换实时/模拟数据模式
- ✅ 示例提示词：提供快速测试的示例输入
- ✅ 模拟网络延迟：提供真实的用户体验

## 技术栈
- React 18
- TypeScript
- Vite
- Tailwind CSS

## API接口
- `/fetch_data` - 数据获取接口
- `/generate_tsx` - TSX代码生成
- `/health_check` - 健康检查

### 模拟数据功能

当后端服务不可用时，系统会自动切换到模拟数据模式，支持：

- **数据展示** - 河北省各地市停电计划数据
- **统计分析** - 按地市合并的统计数据
- **可视化** - 柱状图数据格式
- **多步任务** - 统计分析 + 可视化组合

用户可以通过界面上的模式切换按钮手动选择使用实时数据或模拟数据。

## 组件结构
```
src/
├── components/     # 通用组件
├── pages/         # 页面组件
├── services/      # API服务
├── types/         # 类型定义
└── utils/         # 工具函数
```