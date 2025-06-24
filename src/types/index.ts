// 消息类型定义
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  tsxCode?: string;
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

// TSX生成接口的数据结构
export interface TsxGenerationData {
  tsx_code: string;
  input_data: any;
  prompt_used: 'custom' | 'default';
  data_type: string;
}

// 健康检查数据结构
export interface HealthCheckData {
  service: string;
  version: string;
  status: string;
  environment: string;
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

// 数据展示类型
export interface DataDisplayResponse {
  operation_type: 'data_display';
  title: string;
  result: Array<Record<string, any>>;
}

// 统计分析类型
export interface StatisticalAnalysisResponse {
  operation_type: 'statistical_analysis';
  title: string;
  result: Record<string, any>;
  source: string;
}

// 可视化类型
export interface VisualizationResponse {
  operation_type: 'visualization';
  title: string;
  result: Array<Record<string, any>>;
  type: string;
}

export interface CodeDisplayProps {
  code: string;
  language?: string;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}