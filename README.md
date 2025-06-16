# TSX 代码生成和预览系统

一个基于 React + TypeScript + Vite 的智能 TSX 代码生成和实时预览系统。

## 项目概述

本项目提供了一个完整的 TSX 代码编辑、编译和预览环境，支持：

- 智能对话界面生成 TSX 代码
- Monaco Editor 代码编辑器
- 实时代码编译和预览
- 安全的 iframe 沙箱环境
- 组件演示功能

## 技术架构

### 核心技术栈

- **前端框架**: React 19.1.0
- **开发语言**: TypeScript
- **构建工具**: Vite 6.3.5
- **UI组件库**: Ant Design 5.26.0
- **样式方案**: Tailwind CSS 3.4.1
- **代码编辑器**: Monaco Editor
- **图表库**: ECharts + echarts-for-react
- **HTTP客户端**: Axios
- **代码规范**: ESLint + TypeScript ESLint

### 项目结构

```
src/
├── components/          # 可复用组件
│   ├── AppHeader.tsx   # 应用头部
│   ├── AppLayout.tsx   # 应用布局
│   ├── ChatInput.tsx   # 聊天输入
│   ├── ChatSection.tsx # 聊天区域
│   ├── CodeDisplay.tsx # 代码显示
│   ├── CodeEditor/     # 代码编辑器组件
│   ├── CodePreview/    # 代码预览组件
│   ├── CodePreviewSection.tsx # 预览区域
│   ├── Common/         # 通用组件
│   ├── ErrorDisplay.tsx # 错误显示
│   ├── MessageList.tsx # 消息列表
│   ├── TsxCompiler.tsx # TSX编译器
│   └── ViewToggle.tsx  # 视图切换
├── pages/              # 页面组件
│   └── CodeEditorPreview.tsx # 代码编辑预览页面
├── services/           # API服务
│   └── api.ts         # API接口定义
├── utils/              # 工具函数
│   ├── defaultCode.ts # 默认代码
│   ├── http.ts        # HTTP工具
│   ├── useApiService.ts # API服务Hook
│   ├── useAppState.ts # 应用状态Hook
│   └── useCodeCompiler.ts # 代码编译Hook
├── types/              # 类型定义
│   └── index.ts       # 类型声明
└── styles/             # 样式文件
    └── monaco-scrollbar.css # Monaco编辑器样式
```

## 核心功能

### 1. 代码编译系统 (`useCodeCompiler.ts`)

**异步编译的原因：**
- **避免UI卡顿**: Babel编译是CPU密集型操作，异步执行防止阻塞主线程
- **提高响应性**: 用户可以继续编辑代码而不等待编译完成
- **处理并发请求**: 防抖机制避免频繁编译，提升性能
- **模拟真实环境**: 生产环境中编译通常是异步的

**核心特性：**
- Babel配置用于TSX到JavaScript转换
- 防抖编译减少不必要的编译次数
- 错误处理和状态管理
- 支持React 18+ 语法

### 2. 代码预览系统 (`CodePreview/`) - 已升级为动态代码执行技术

**技术升级：**
- **动态代码执行**: 使用 `new Function()` 动态执行编译后的JavaScript代码
- **直接组件渲染**: 将编译后的代码直接执行并渲染为React组件
- **更好的兼容性**: 完美支持React组件的动态渲染
- **实时预览**: 代码变更后立即执行并显示结果

**核心特性：**
- 动态JavaScript代码执行
- React组件实时渲染
- 完整的错误处理和状态管理
- 安全的代码执行环境

**技术实现：**
```typescript
// 动态执行编译后的代码
const executeCode = new Function(
  'React', 'useState', 'useEffect', 'useCallback',
  'module', 'exports',
  `${code}\nreturn module.exports.default || module.exports;`
);

const Component = executeCode(React, React.useState, React.useEffect, React.useCallback, module, moduleExports);
return React.createElement(Component);
```

**安全特性：**
- 受控的执行环境
- 模块化的代码隔离
- 完整的错误捕获和处理

### 3. ECharts 图表集成

**技术栈：**
- **ECharts**: 强大的数据可视化图表库
- **echarts-for-react**: React封装组件
- **动态图表**: 支持在代码预览中实时渲染图表

**支持的图表类型：**
- 柱状图 (Bar Chart)
- 饼图 (Pie Chart) 
- 折线图 (Line Chart)
- 散点图 (Scatter Chart)
- 更多图表类型...

**使用方法：**
```typescript
// 在生成的TSX代码中使用ECharts
function MyComponent() {
  const option = {
    title: { text: '示例图表' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'bar' }]
  };
  
  return (
    <div>
      <ReactECharts 
        option={option} 
        style={{ height: '400px' }}
      />
    </div>
  );
}
```

**可用的全局变量：**
- `echarts`: ECharts核心库
- `ReactECharts`: React组件
- `React`: React库及所有hooks

**示例模板：**
项目内置了完整的ECharts示例模板，包含：
- 交互式图表切换
- 多种图表类型展示
- 响应式设计
- Tailwind CSS样式集成

### 4. 代码编辑器 (`CodeEditor/`)

- Monaco Editor 集成
- TypeScript 语法高亮
- 智能代码补全
- 错误提示和诊断

## 安全规范

### iframe 沙箱安全

**重要安全修复 (2024-12-19):**
- 移除了 iframe 的 `allow-same-origin` 权限
- 原因：`allow-scripts` + `allow-same-origin` 组合会导致沙箱逃逸
- 解决方案：使用函数作用域创建安全的模块环境

**当前沙箱配置：**
```html
sandbox="allow-scripts allow-forms allow-popups allow-modals"
```

**安全最佳实践：**
1. 永远不要同时使用 `allow-scripts` 和 `allow-same-origin`
2. 使用最小权限原则配置沙箱
3. 在函数作用域内执行用户代码
4. 避免全局变量污染

### 依赖安全

- 使用内联样式替代 CDN 依赖（生产环境）
- 定期更新依赖包
- 使用 npm audit 检查安全漏洞

## 开发规范

### 代码规范

- 使用 TypeScript 严格模式
- ESLint + Prettier 代码格式化
- 组件使用 PascalCase 命名
- 文件使用 camelCase 命名
- 接口使用 PascalCase 命名

### 组件开发

```typescript
interface ComponentProps {
  /** 属性描述 */
  prop: string;
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  // 组件逻辑
  return <div>{prop}</div>;
};

export default Component;
```

### 样式规范

- 优先使用 Tailwind CSS
- 按照布局、盒模型、排版、视觉、其他的顺序组织类名
- 复杂样式使用 CSS 模块

## 性能优化

### 编译优化

- 防抖编译减少编译频率
- 异步编译避免UI阻塞
- 缓存编译结果

### 渲染优化

- React.memo 优化组件重渲染
- useCallback 和 useMemo 优化计算
- 懒加载非关键组件

## API 接口

### TSX 生成接口

```typescript
// POST /api/generate-tsx
interface TsxGenerationRequest {
  prompt: string;
}

interface TsxGenerationResponse {
  code: number;
  message: string;
  data?: {
    tsx: string;
    description: string;
  };
}
```

## 部署说明

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

### 生产环境

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

### 环境变量

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8000

# 其他配置...
```

## 故障排除

### 常见问题

1. **编译错误**: 检查 TSX 语法和组件定义
2. **预览不显示**: 检查编译是否成功，查看控制台错误
3. **样式问题**: 确认 Tailwind CSS 类名正确

### 调试技巧

- 使用浏览器开发者工具
- 检查 iframe 内部的控制台输出
- 查看网络请求状态

## 更新日志

### v1.2.0 (2024-12-19)
- **安全修复**: 移除 iframe `allow-same-origin` 权限，防止沙箱逃逸
- **优化**: 改进模块系统处理，使用函数作用域隔离
- **增强**: 完善错误处理和显示机制

### v1.1.0 (2024-12-18)
- **功能**: 添加代码预览组件优化
- **修复**: 解决 `exports is not defined` 错误
- **改进**: 移除生产环境 CDN 依赖

### v1.0.0 (2024-12-17)
- **初始版本**: 基础 TSX 编辑和预览功能
- **功能**: Monaco Editor 集成
- **功能**: 实时编译和预览

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请创建 Issue 或联系开发团队。