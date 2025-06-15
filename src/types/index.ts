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

// 组件Props类型定义
export interface MessageListProps {
  messages: Message[];
}

export interface CodeDisplayProps {
  code: string;
  language?: string;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}