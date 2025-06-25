import {
  httpClient,
  type ApiResponse
} from '../utils/http';
import type {
  BackendResponse,
  FetchDataResponse,
  StreamMessage
} from '../types';

// TSX生成接口的数据结构
interface TsxGenerationData {
  tsx_code: string;
  input_data: any;
  prompt_used: 'custom' | 'default';
  data_type: string;
}

// 健康检查数据结构
interface HealthCheckData {
  service: string;
  version: string;
  status: string;
  environment: string;
  timestamp: string;
}

// TSX生成响应接口
interface TsxGenerationResponse {
  success: boolean;
  tsxCode: string;
  message?: string;
  error?: string;
}

/**
 * API服务类
 * 处理与后端的通信
 */
class ApiService {
  /**
   * 发送消息到后端并获取TSX代码
   * @param message 用户输入的消息
   * @returns Promise<TsxGenerationResponse>
   */
  async generateTsxCode(message: string): Promise<TsxGenerationResponse> {
    try {
      const response = await httpClient.post<BackendResponse<TsxGenerationData>>('/generate_tsx', {
        data: message.trim(),
        prompt: undefined // 使用默认提示词
      });

      if (!response.success) {
        return {
          success: false,
          tsxCode: '',
          message: response.error || '请求失败，请检查网络连接',
          error: response.error
        };
      }

      const backendData = response.data as BackendResponse<TsxGenerationData>;

      // 检查后端响应状态码
      if (backendData.code !== 200) {
        return {
          success: false,
          tsxCode: '',
          message: backendData.message || '生成TSX代码失败',
          error: backendData.message
        };
      }

      // 验证数据格式
      if (!backendData.data || !backendData.data.tsx_code) {
        return {
          success: false,
          tsxCode: '',
          message: '响应数据格式错误',
          error: 'Invalid response format'
        };
      }

      return {
        success: true,
        tsxCode: backendData.data.tsx_code,
        message: backendData.message || 'TSX代码生成成功',
        error: undefined
      };
    } catch (error) {
      return {
        success: false,
        tsxCode: '',
        message: '网络请求失败',
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  }

  /**
   * 检查API服务状态
   * @returns Promise<boolean>
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await httpClient.get<BackendResponse<HealthCheckData>>('/health_check');

      if (!response.success) {
        return false;
      }

      const backendData = response.data as BackendResponse<HealthCheckData>;
      return backendData.code === 200 && backendData.data?.status === 'healthy';
    } catch (error) {
      console.error('健康检查失败:', error);
      return false;
    }
  }

  /**
   * 生成TSX代码（支持自定义提示词）
   * @param data 要渲染的数据
   * @param customPrompt 可选的自定义提示词
   * @returns Promise<TsxGenerationResponse>
   */
  async generateTsxWithData(data: any, customPrompt?: string): Promise<TsxGenerationResponse> {
    try {
      const response = await httpClient.post<BackendResponse<TsxGenerationData>>('/generate_tsx', {
        data: data,
        prompt: customPrompt
      });

      if (!response.success) {
        return {
          success: false,
          tsxCode: '',
          message: response.error || '请求失败，请检查网络连接',
          error: response.error
        };
      }

      const backendData = response.data as BackendResponse<TsxGenerationData>;

      if (backendData.code !== 200) {
        return {
          success: false,
          tsxCode: '',
          message: backendData.message || '生成TSX代码失败',
          error: backendData.message
        };
      }

      if (!backendData.data || !backendData.data.tsx_code) {
        return {
          success: false,
          tsxCode: '',
          message: '响应数据格式错误',
          error: 'Invalid response format'
        };
      }

      return {
        success: true,
        tsxCode: backendData.data.tsx_code,
        message: backendData.message || 'TSX代码生成成功',
        error: undefined
      };
    } catch (error) {
      return {
        success: false,
        tsxCode: '',
        message: '网络请求失败',
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  }

  /**
   * 获取数据接口
   * @param userInput 用户输入
   * @returns Promise<BackendResponse<FetchDataResponse> | null>
   */
  async fetchData(userInput: string): Promise<BackendResponse<FetchDataResponse> | null> {
    try {
      // 直接发送POST请求，后端返回的就是标准格式
      const response = await httpClient.post<BackendResponse<FetchDataResponse>>('/fetch_data', {
        user_input: userInput
      });

      // 检查HTTP请求是否成功
      if (!response.success) {
        console.error('数据获取失败:', response.error);
        return null;
      }

      // response.data 就是 BackendResponse<FetchDataResponse> 格式
      const backendData = response.data as BackendResponse<FetchDataResponse>;

      // 检查业务状态码
      if (backendData.code !== 200) {
        console.error('数据获取失败:', backendData.message);
        return null;
      }

      // 验证响应数据格式
      if (!backendData.data || !backendData.data.operation_type) {
        console.error('响应数据格式错误: 缺少operation_type字段');
        return null;
      }

      return backendData;
    } catch (error) {
      console.error('数据获取请求失败:', error);
      return null;
    }
  }

  /**
   * 流式数据分析接口
   * @param userInput 用户输入的分析需求
   * @param conversationId 会话ID，默认为"global"
   * @param onMessage 消息回调函数
   */
  async streamDataAnalysis(
    userInput: string,
    onMessage: (message: StreamMessage) => void,
    conversationId: string = 'global'
  ): Promise<void> {
    try {
      await httpClient.streamPost(
        '/micro_output_stream',
        {
          user_input: userInput,
          conversation_id: conversationId
        },
        onMessage
      );
    } catch (error) {
      console.error('流式数据分析请求失败:', error);
      // 向回调函数发送错误消息
      onMessage({
        type: 'error',
        error_type: 'execution_error',
        message: error instanceof Error ? error.message : '未知错误',
        data: {}
      });
    }
  }

  /**
   * 重置代理状态
   * @param conversationId 会话ID，默认为"global"
   * @returns Promise<boolean>
   */
  async resetAgent(conversationId: string = 'global'): Promise<boolean> {
    try {
      const response = await httpClient.post('/reset', { conversation_id: conversationId });
      return response.success;
    } catch (error) {
      console.error('重置代理状态失败:', error);
      return false;
    }
  }
}

// 导出单例实例
export const apiService = new ApiService();
export default apiService;