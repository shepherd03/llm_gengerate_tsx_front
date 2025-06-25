# Data Agent API 接口文档

## 概述

Data Agent 提供基于 Flask 的 RESTful API 服务，支持数据分析、统计计算和可视化功能。系统采用流式传输技术，实时返回处理进度和结果。

**服务地址：** `http://localhost:5000`

---

## 1. 流式数据分析接口

### 接口信息

- **URL：** `/micro_output_stream`
- **方法：** `POST`
- **Content-Type：** `application/json`
- **响应类型：** 流式 JSON（每行一个 JSON 对象）

### 请求参数

```json
{
  "user_input": "string",        // 必填，用户输入的分析需求
  "conversation_id": "string"   // 可选，会话ID，默认为"global"
}
```

**参数说明：**

- `user_input`: 用户的数据分析需求描述，支持自然语言输入
- `conversation_id`: 会话标识符，用于区分不同用户或会话，支持多会话并发

### 响应格式

流式响应，每行返回一个 JSON 对象，格式为：`{JSON对象}\n`

### 流式响应类型详解

#### 1. 信息提示 (type: "info")

**用途：** 显示处理进度和状态信息

```json
{
  "type": "info",
  "message": "string"  // 进度信息描述
}
```

**示例：**

```json
{"type": "info", "message": "正在分析用户意图"}
{"type": "info", "message": "检测到取数意图，准备获取数据"}
{"type": "info", "message": "检测到任务（statistical_analysis），即将执行..."}
{"type": "info", "message": "开始执行第1步：计算销售额统计"}
```

#### 2. 数据展示 (type: "data_display")

**用途：** 返回获取的原始数据

```json
{
  "type": "data_display",
  "message": "string",           // 操作结果描述
  "data": {
    "operation_type": "data_display",
    "title": "string",          // 数据标题
    "result": [                 // 数据记录数组
      {
        "column1": "value1",
        "column2": "value2",
        // ... 更多字段
      }
    ]
  }
}
```

**示例：**

```json
{
  "type": "data_display",
  "message": "数据获取成功",
  "data": {
    "operation_type": "data_display",
    "title": "销售数据",
    "result": [
      {"product": "商品A", "sales": 1000, "date": "2024-01-01"},
      {"product": "商品B", "sales": 1500, "date": "2024-01-01"}
    ]
  }
}
```

#### 3. 统计分析结果 (type: "statistical_analysis")

**用途：** 返回统计分析的计算结果

```json
{
  "type": "statistical_analysis",
  "message": "string",           // 分析完成信息
  "title": "string",            // 分析结果标题
  "data": [                     // 分析结果数据
    {
      "metric": "value",
      // ... 分析结果字段
    }
  ],
  "source": "string"            // 生成的代码文件路径
}
```

**示例：**

```json
{
  "type": "statistical_analysis",
  "message": "统计分析已完成",
  "title": "销售额统计分析",
  "data": [
    {"metric": "总销售额", "value": 25000},
    {"metric": "平均销售额", "value": 1250},
    {"metric": "最大销售额", "value": 3000}
  ],
  "source": "data_agent_outputs/generated_code_20240101_120000.py"
}
```

#### 4. 可视化数据 (type: "visualization")

**用途：** 返回准备好的可视化数据

```json
{
  "type": "visualization",
  "message": "string",           // 可视化准备信息
  "vis_type": "string",         // 图表类型
  "title": "string",            // 图表标题
  "data": [                     // 可视化数据
    {
      "x": "value",
      "y": "value",
      // ... 图表数据字段
    }
  ]
}
```

**vis_type 支持的图表类型：**

- `bar`: 柱状图
- `line`: 折线图
- `pie`: 饼图
- `scatter`: 散点图
- `histogram`: 直方图

**示例：**

```json
{
  "type": "visualization",
  "message": "可视化数据已准备好",
  "vis_type": "bar",
  "title": "月度销售趋势",
  "data": [
    {"month": "1月", "sales": 10000},
    {"month": "2月", "sales": 12000},
    {"month": "3月", "sales": 15000}
  ]
}
```

#### 6. 错误信息 (type: "error")

**用途：** 返回处理过程中的错误信息

```json
{
  "type": "error",
  "error_type": "string",       // 错误类型
  "message": "string",          // 错误描述
  "data": {}                    // 错误相关数据
}
```

**error_type 支持的错误类型（后续可继续扩展）：**

- `fetch_data_error`: 数据获取失败
- `execution_error`: 代码执行错误

**示例：**

```json
{"type": "error", "error_type": "execution_error", "message": "统计分析出错: 数据格式不正确", "data": {}}
{"type": "error", "error_type": "fetch_data_error", "message": "数据源连接失败", "data": {"operation_type": "data_display"}}
```

#### 7. 任务完成 (type: "finish")

**用途：** 标识任务执行完成

```json
{
  "type": "finish",
  "message": "string",           // 完成信息
  "step": number                // 可选，步骤编号
}
```

**示例：**

```json
{"type": "finish", "message": "取数任务完成"}
{"type": "finish", "message": "统计分析任务完成"}
{"type": "finish", "message": "多步任务执行全部成功（共3步）"}
{"type": "finish", "message": "任务终止", "step": 100}
```

### 流式响应处理流程

1. **意图识别阶段**

   ```json
   {"type": "info", "message": "正在分析用户意图"}
   ```
2. **分支处理**

   **A. 取数流程：**

   ```json
   {"type": "info", "message": "检测到取数意图，准备获取数据"}
   {"type": "data_display", "message": "数据获取成功", "data": {...}}
   {"type": "finish", "message": "取数任务完成"}
   ```

   **B. 单步分析流程：**

   ```json
   {"type": "info", "message": "检测到任务（statistical_analysis），即将执行..."}
   {"type": "statistical_analysis", "message": "统计分析已完成", "data": [...]}
   {"type": "finish", "message": "统计分析任务完成"}
   ```

   **C. 多步分析流程：**

   ```json
   {"type": "info", "message": "检测到多步任务，共3个步骤，开始执行"}
   {"type": "info", "message": "开始执行第1步：数据清洗"}
   {"type": "statistical_analysis", "message": "统计分析已完成", "data": [...]}
   {"type": "info", "message": "开始执行第2步：趋势分析"}
   {"type": "statistical_analysis", "message": "统计分析已完成", "data": [...]}
   {"type": "info", "message": "开始执行第3步：可视化"}
   {"type": "visualization", "message": "可视化数据已准备好", "data": [...]}
   {"type": "finish", "message": "多步任务执行全部成功（共3步）"}
   ```

### 错误处理场景

1. **无原始数据：**

   ```json
   {"type": "finish", "message": "未检测到原始数据，请先进行取数操作，再进行分析或可视化。", "step": 100}
   ```
2. **取数失败：**

   ```json
   {"type": "error", "error_type": "fetch_data_error", "message": "数据获取失败", "data": {"operation_type": "data_display"}}
   {"type": "finish", "message": "任务终止", "step": 100}
   ```
3. **分析执行错误：**

   ```json
   {"type": "error", "error_type": "execution_error", "message": "统计分析出错: 具体错误信息", "data": {}}
   {"type": "finish", "message": "任务执行过程中有失败，请检查上面步骤"}
   ```

---

## 2. 重置代理状态接口

### 接口信息

- **URL：** `/reset`
- **方法：** `POST`
- **Content-Type：** `application/json`

### 请求参数

```json
{
  "conversation_id": "string"   // 可选，会话ID，默认为"global"
}
```

### 响应格式

```json
{
  "code": 200,
  "message": "DataAgent状态已重置",
  "data": {
    "results": []
  }
}
```

### 使用场景

- 清除会话中的历史数据
- 重置分析状态
- 释放内存资源

---

## 3. 健康检查接口

### 接口信息

- **URL：** `/health`
- **方法：** `GET`

### 响应格式

```json
{
  "code": 200,
  "message": "Data Agent运行正常",
  "data": {
    "results": []
  }
}
```

### 使用场景

- 服务状态监控
- 负载均衡健康检查
- 系统可用性验证

---

## 4. 错误处理

### 404 错误

**触发条件：** 访问不存在的接口

```json
{
  "code": 404,
  "message": "接口不存在",
  "data": {
    "results": []
  }
}
```

### 500 错误

**触发条件：** 服务器内部错误

```json
{
  "code": 500,
  "message": "服务器内部错误",
  "data": {
    "results": []
  }
}
```
