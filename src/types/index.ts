// 消息类型定义
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// API响应类型定义
export interface ApiResponse {
  success: boolean;
  tsxCode: string;
  message: string;
  error?: string;
}

// 后端统一响应格式
export interface BackendResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  timestamp: string;
}

// 数据获取接口的响应数据结构
export interface FetchDataResponse {
  operation_type: 'data_display' | 'statistical_analysis' | 'visualization';
  title: string;
  result: any; // 根据operation_type不同，数据格式不同
  type?: string; // 仅在visualization时存在
  source?: string; // 仅在statistical_analysis时存在
  message?: string; // 子任务提示信息
}

// 多步任务响应数据结构
export interface MultiStepResponse {
  results: FetchDataResponse[];
}

// 完整的后端响应（支持单步和多步）
export interface CompleteBackendResponse {
  code: number;
  message: string;
  data: FetchDataResponse | MultiStepResponse;
  timestamp?: string;
}



// 流式响应消息基础类型
export type StreamMessage =
  | StreamInfoMessage
  | StreamDataDisplayMessage
  | StreamStatisticalAnalysisMessage
  | StreamVisualizationMessage
  | StreamErrorMessage
  | StreamFinishMessage;

// 流式响应 - 信息提示
export interface StreamInfoMessage {
  type: 'info';
  message: string;
}

// 流式响应 - 数据展示
export interface StreamDataDisplayMessage {
  type: 'data_display';
  message: string;
  data: {
    operation_type: 'data_display';
    title: string;
    result: Array<Record<string, any>>;
  };
}

// 流式响应 - 统计分析结果
export interface StreamStatisticalAnalysisMessage {
  type: 'statistical_analysis';
  message: string;
  title: string;
  data: Array<Record<string, any>>;
  source: string;
}

// 流式响应 - 可视化数据
export interface StreamVisualizationMessage {
  type: 'visualization';
  message: string;
  vis_type: 'bar' | 'line' | 'pie' | 'scatter' | 'histogram';
  title: string;
  data: Array<Record<string, any>>;
}

// 流式响应 - 错误信息
export interface StreamErrorMessage {
  type: 'error';
  error_type: 'fetch_data_error' | 'execution_error';
  message: string;
  data: Record<string, any>;
}

// 流式响应 - 任务完成
export interface StreamFinishMessage {
  type: 'finish';
  message: string;
  step?: number;
}