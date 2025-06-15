# Text2JSX 对话展示系统

## 项目简介
这是一个基于React + TypeScript + Vite的前端项目，用于创建一个精美的对话界面。用户可以输入文字，系统会调用后端API获取大模型生成的TSX代码，并将代码内容展示出来。

## 功能特性
- 🎨 精美的对话界面设计
- 💬 实时消息发送和接收
- 🔧 TSX代码展示功能
- 🧪 TSX组件演示页面 - 模拟后端数据渲染
- 🔄 页面切换功能 - 智能对话与组件演示
- 📱 响应式设计，支持移动端
- 🎯 简洁开箱即用，无需注册登录
- 🔀 代码/预览双视图模式
- 🎛️ 组件实时渲染预览
- 📊 支持图表组件展示
- 🧩 模块化组件架构

## 技术栈
- React 19.1.0
- TypeScript
- Vite
- Tailwind CSS 3.4.1
- PostCSS + Autoprefixer
- Axios (HTTP请求库)
- ESLint

## 项目结构
```
src/
├── App.tsx                 # 主应用组件（已重构为组件化架构）
├── components/             # 可复用组件
│   ├── AppHeader.tsx       # 应用头部导航组件
│   ├── AppLayout.tsx       # 应用布局组件
│   ├── ChatInput.tsx       # 聊天输入框组件
│   ├── ChatSection.tsx     # 聊天区域组件
│   ├── CodeDisplay.tsx     # 代码显示组件
│   ├── CodeEditor.tsx      # Monaco代码编辑器组件
│   ├── CodeEditorPanel.tsx # 代码编辑器面板
│   ├── CodePreview.tsx     # 代码预览组件
│   ├── CodePreviewPanel.tsx# 代码预览面板
│   ├── CodePreviewSection.tsx # 代码预览区域组件
│   ├── ErrorDisplay.tsx    # 错误显示组件
│   ├── GlassContainer.tsx  # 玻璃效果容器组件
│   ├── MessageList.tsx     # 消息列表组件
│   ├── TsxCompiler.tsx     # TSX编译器组件
│   ├── ViewToggle.tsx      # 视图切换组件
│   └── WindowHeader.tsx    # 窗口头部组件
├── pages/                  # 页面组件
│   └── CodeEditorDemo.tsx  # 代码编辑器演示页面
├── services/               # 服务层
│   └── api.ts              # API服务
├── styles/                 # 样式文件
│   ├── index.css           # 全局样式
│   └── monaco-scrollbar.css# Monaco编辑器滚动条样式
├── types/                  # 类型定义
│   └── index.ts            # 通用类型定义
└── utils/                  # 工具函数和自定义Hook
    ├── defaultCode.ts      # 默认代码模板
    ├── http.ts             # HTTP工具
    ├── useApiService.ts    # API服务Hook
    ├── useAppState.ts      # 应用状态管理Hook
    └── useCodeCompiler.ts  # 代码编译Hook
```

## 安装和运行

### 安装依赖
```bash
npm install
```

### 安装Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 启动开发服务器
```bash
npm run dev
```

## VS Code 配置

### 解决 Tailwind CSS 警告
项目已配置 VS Code 设置来解决 `@tailwind` 指令的 "Unknown at rule" 警告：

- `.vscode/settings.json` - 禁用默认CSS验证并启用自定义CSS数据
- `.vscode/css_custom_data.json` - 定义Tailwind CSS指令的自定义数据

这些配置文件让VS Code正确识别以下Tailwind指令：
- `@tailwind base`
- `@tailwind components` 
- `@tailwind utilities`
- `@apply`
- `@layer`

### 推荐的VS Code扩展
- Tailwind CSS IntelliSense
- PostCSS Language Support
- TypeScript Importer

### 构建生产版本
```bash
npm run build
```

## 组件功能详解

### WindowHeader 组件
增强版窗口标题栏组件，支持多种自定义参数：

#### 基础参数
- `title`: 标题文本
- `subtitle`: 副标题（支持字符串或React节点）
- `actions`: 操作按钮区域
- `variant`: 样式变体（'default' | 'gradient'）

#### 增强功能
- `showDots`: 是否显示装饰圆点（默认true）
- `customDots`: 自定义圆点内容
- `titleClassName`: 标题自定义样式类名
- `subtitleClassName`: 副标题自定义样式类名
- `headerClassName`: 头部容器自定义样式类名
- `onTitleClick`: 标题点击事件
- `onSubtitleClick`: 副标题点击事件

#### 使用示例
```tsx
<WindowHeader
  title="TSX 代码"
  subtitle="支持 TypeScript + Tailwind CSS"
  variant="gradient"
  onTitleClick={() => console.log('标题被点击')}
/>
```

### GlassContainer 组件
毛玻璃效果容器组件，提供多种预设组合：

- `GlassCard`: 中等毛玻璃效果卡片
- `GlassPanel`: 强毛玻璃效果面板
- `GlassButton`: 轻毛玻璃效果按钮
- `GlassModal`: 超强毛玻璃效果模态框

### CodeEditorDemo 页面
动态代码编辑器页面，展示了WindowHeader组件的实际应用：

- 左侧编辑区通过副标题显示代码输入状态
- 右侧预览区通过副标题显示编译运行状态
- 支持TSX代码的实时编译和预览
- 使用毛玻璃效果提升视觉体验

## HTTP请求封装

### Axios封装特性
项目使用自定义的HTTP客户端封装，提供以下功能：

- **统一配置**: 基础URL、超时时间、请求头等
- **请求拦截器**: 自动添加认证信息、请求日志
- **响应拦截器**: 统一错误处理、响应日志
- **错误处理**: 根据HTTP状态码提供友好的错误信息
- **类型安全**: 完整的TypeScript类型定义

### HTTP客户端使用方法
```typescript
import { httpClient } from '../utils/http';

// GET请求
const response = await httpClient.get('/api/data');

// POST请求
const response = await httpClient.post('/api/data', { key: 'value' });

// 响应格式
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## API接口说明

### 后端统一响应格式
所有API接口都遵循统一的响应格式：
```typescript
{
  code: number;        // HTTP状态码
  message: string;     // 响应消息
  data?: any;         // 响应数据
  timestamp: string;   // 时间戳
}
```

### TSX代码生成接口

- **URL**: `/generate_tsx`
- **方法**: POST
- **参数**:
  ```typescript
  {
    data: any;           // 要渲染的数据（可以是对象、数组等）
    prompt?: string;     // 可选的自定义提示词，使用{data}作为数据占位符
  }
  ```
- **返回值**:
  ```typescript
  {
    code: 200,
    message: "TSX代码生成成功",
    data: {
      tsx_code: string;      // 生成的TSX代码
      input_data: any;       // 输入的数据
      prompt_used: string;   // 使用的提示词类型（"custom" | "default"）
      data_type: string;     // 数据类型
    },
    timestamp: string
  }
  ```

### 健康检查接口
- **URL**: `/health_check`
- **方法**: GET
- **返回值**: 
  ```typescript
  {
    code: 200,
    message: "服务运行正常",
    data: {
      service: "LLM TSX Generator",
      version: "1.0.0",
      status: "healthy",
      environment: string,
      timestamp: string
    },
    timestamp: string
  }
  ```

### 前端API服务方法

#### generateTsxCode(message: string)
- 发送文本消息生成TSX代码
- 内部将message作为data参数发送
- 使用默认提示词

#### generateTsxWithData(data: any, customPrompt?: string)
- 发送任意数据生成TSX代码
- 支持自定义提示词
- 适用于复杂数据结构的可视化

#### checkHealth()
- 检查后端服务状态
- 返回布尔值表示服务是否健康

## 组件说明

### ChatInterface
主要的对话界面组件，包含消息列表和输入框。

**Props**: 无

**功能**:
- 管理消息状态
- 处理用户输入
- 调用后端API
- 展示TSX代码

### MessageList
消息列表组件，用于展示对话历史。

**Props**:
```typescript
interface MessageListProps {
  messages: Message[];
}
```

### CodeDisplay
代码展示组件，用于渲染TSX代码。

**Props**:
```typescript
interface CodeDisplayProps {
  code: string;
  language?: string;
}
```

### CodeEditor
基于Monaco Editor的代码编辑器组件，专为TSX开发优化，提供完整的React/TypeScript编辑体验。

**功能特性**:
- 🎨 完整的TSX/TypeScript支持，无语法错误提示
- 🔧 VS Code级别的编辑体验
- 📝 优化的JSX语法高亮（标签、属性、属性值）
- 📁 智能补全和参数提示
- ✨ 代码折叠和自动格式化
- 🖱️ 玻璃效果主题，完美融入项目设计
- 💡 透明背景设计，增强视觉层次

**Props**:
```typescript
interface CodeEditorProps {
  value: string;                    // 编辑器中的代码内容
  onChange: (value: string) => void; // 代码变化时的回调函数
  language?: string;                // 编程语言，默认为typescriptreact
  theme?: 'vs-dark' | 'light' | 'vs'; // 编辑器主题，默认为vs-dark
  height?: string | number;         // 编辑器高度，默认为100%
  readOnly?: boolean;               // 是否只读
  placeholder?: string;             // 占位符文本
  className?: string;               // 自定义类名
  showMinimap?: boolean;            // 是否显示小地图
  fontSize?: number;                // 字体大小
}
```

**使用示例**:
```tsx
<CodeEditor
  value={code}
  onChange={setCode}
  language="typescriptreact"
  placeholder="在此输入 TSX 代码..."
  fontSize={14}
/>
```

## 类型定义

```typescript
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  tsxCode?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    tsxCode: string;
    timestamp: number;
  };
  error?: string;
}
```

## 样式设计
- 使用Tailwind CSS进行样式设计
- 采用现代化的卡片式布局
- 支持深色/浅色主题
- 响应式设计，适配各种屏幕尺寸

## 页面功能说明

### 智能对话页面
主页面提供智能对话功能，用户可以输入问题，系统调用后端API生成TSX代码并展示。

### TSX组件演示页面
新增的演示页面模拟从后端传来的TSX数据文件，包含以下功能：
- **组件选择**: 提供按钮、卡片、模态框、表单等预设组件
- **代码预览**: 在CodeDisplay组件中渲染选中的TSX代码
- **实时切换**: 支持在不同组件间快速切换
- **返回功能**: 可以返回主对话页面

### 页面切换
在应用头部提供页面切换按钮：
- **对话页面**: 智能问答和代码生成
- **演示页面**: TSX组件预览和测试

## 开发注意事项
- 导入类型时必须使用 `import type` 语法
- 遵循TypeScript严格模式
- 使用ESLint进行代码规范检查
- 组件采用函数式组件 + Hooks
- 新增组件需要在types/index.ts中定义相应类型

## 已知问题

1. **代码编译错误处理**：当TSX代码存在语法错误时，错误信息可能不够详细
2. **性能优化**：大量代码编译时可能存在性能瓶颈
3. **浏览器兼容性**：某些较老的浏览器可能不支持部分ES6+特性

## 问题修复记录

### TypeScript类型错误修复
**问题描述：** `useCodeCompiler.ts` 文件中出现两个TypeScript错误：
1. `找不到命名空间"NodeJS"` - 第34行
2. `不能将类型"(code: string) => void"分配给类型"(code: string) => Promise<CompilerResult>"` - 第135行

**原因分析：**
1. 使用了 `NodeJS.Timeout` 类型但未正确导入Node.js类型定义
2. Hook接口定义的compile函数返回Promise，但实际实现返回void，类型不匹配

**解决方案：**
1. 将 `NodeJS.Timeout` 改为 `number` 类型（浏览器环境下setTimeout返回number）
2. 修改接口定义，将compile函数返回类型从 `Promise<CompilerResult>` 改为 `void`
3. 重构内部实现，分离异步编译逻辑（`compileInternal`）和对外接口（`compile`）
4. 使用 `window.setTimeout` 和 `window.clearTimeout` 确保浏览器兼容性

**修改文件：**
- `src/hooks/useCodeCompiler.ts` - 修复类型定义和实现逻辑

**修复时间：** 2024年12月

### 修复：exports is not defined 错误
**问题描述**：在代码编辑器中运行代码时出现 `Uncaught ReferenceError: exports is not defined` 错误

**原因分析**：Babel 编译 TSX 代码时默认生成 CommonJS 模块语法（使用 `exports`），但浏览器环境无法识别 CommonJS 的 `exports` 对象

**解决方案**：
1. 在 Babel 配置中添加 `@babel/preset-env` 预设
2. 设置 `modules: false` 选项，避免生成 CommonJS 模块代码
3. 在 `index.html` 中加载 `@babel/preset-env` 库

**修改文件**：
- `src/pages/CodeEditorDemo.tsx`：更新 Babel 编译配置
- `index.html`：添加 `@babel/preset-env` 脚本加载

## 更新日志

### v1.3.4 (2024-12-23)
**CodeEditor 组件圆角样式优化**
- 修复代码编辑器容器圆角不匹配问题
  - 为 CodeEditor 组件添加 `rounded-2xl` 圆角，与 GlassPanel 保持一致
  - 移除 Monaco Editor 的边框，让毛玻璃容器统一处理边框效果
  - 优化编辑器边缘样式配置，确保与圆角容器完美匹配
- 简化容器嵌套结构
  - 优化 CodeEditorDemo 中的布局层次
  - 减少不必要的 div 包装，提升渲染性能
  - 保持错误提示的正确定位
- 增强视觉一致性
  - 统一所有毛玻璃组件的圆角规范
  - 改进编辑器与容器的视觉融合度

### v1.3.3 (最新)
- 🎨 优化 `CodeEditor` 组件视觉效果和语法高亮
  - 修复编辑器背景透明导致内容不可见的问题
  - 增强语法高亮配色方案，支持完整的 TypeScript 和 JSX 语法
  - 优化编辑器主题配色，提供更好的代码可读性
  - 改进选择、高亮和光标的视觉效果
  - 增强注释、关键字、字符串、数字等语法元素的颜色区分
  - 完善 JSX 标签、属性和属性值的专用高亮
  - 提升整体编码体验和视觉舒适度

### v1.3.2
- 🔧 修复 `CodeEditor` 组件TypeScript编译错误
  - 修复padding配置中不支持的left属性问题
  - 修复codeLens配置类型错误
  - 修复语法错误：多余的大括号和缺失的类型注解
  - 为beforeMount和onMount回调函数添加正确的类型注解
  - 确保所有Monaco Editor配置项符合API规范
- ✅ 通过TypeScript严格模式检查
- 🚀 提升代码编辑器稳定性和可靠性

### v1.3.1
- 🔧 修复 `CodeEditor` 组件TSX支持问题
  - 语言设置从 `typescript` 改为 `typescriptreact`，完美支持TSX语法
  - 优化JSX语法高亮：增强标签、属性、属性值的颜色区分
  - 改进玻璃效果：透明背景设计，更好融入项目视觉风格
  - 增强编辑体验：优化内边距、代码折叠、选择高亮等细节
- 🎨 视觉优化
  - 编辑器背景完全透明，突出玻璃效果
  - 调整颜色方案，提升代码可读性
  - 优化悬停提示和建议框样式
- 📚 更新文档，反映最新功能特性

### v1.3.0 (2024-01-XX)
- ✨ **新增 `CodeEditor` 组件** - 基于Monaco Editor的专业代码编辑器
- 🎨 **VS Code级别编辑体验** - 语法高亮、智能补全、参数提示等
- 🎯 **自定义玻璃主题** - 专为项目设计的半透明深色主题
- 🔧 **增强编辑功能** - 代码折叠、多光标、自动格式化
- 📦 **组件封装优化** - 简化API，提高可复用性
- 🚀 **性能优化** - 优化编辑器加载和渲染性能
- 📝 **完善文档** - 添加详细的组件使用说明和示例

### v1.2.0 (2024-01-XX)
- 🧩 **组件分离重构**: 将功能拆分为独立的可复用组件
- ✨ 新增 `CodeRenderer` 组件 - 支持代码字符串渲染为实际React组件
- ✨ 新增 `ViewToggle` 组件 - 提供代码/预览视图切换功能
- ✨ 新增 `WindowHeader` 组件 - 统一窗口标题栏样式，消除重复代码
- 📊 新增图表组件支持 - 在演示页面中添加BarChart示例
- 🔀 实现双视图模式 - 用户可在代码查看和组件预览间切换
- 🐛 修复TypeScript错误 - 移除未使用的React导入，修复ESLint警告
- 🎨 优化代码结构 - 提高可维护性和可扩展性
- 🔧 改进错误处理 - 标准化catch块中的错误变量处理

### v1.1.0 (2024-01-XX)
- ✨ 新增TSX组件演示页面
- ✨ 添加页面切换功能
- 🎨 优化界面美观度，增强毛玻璃效果
- 🔧 隐藏滚动条，提升视觉体验
- 📝 完善项目文档和使用说明

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 实现基础对话界面
- 集成Tailwind CSS
- 添加TSX代码展示功能