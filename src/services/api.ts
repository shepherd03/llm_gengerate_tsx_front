import {
  dataAgentClient,
  httpClient,
  tsxGeneratorClient,
} from '../utils/http';
import type {
  ResponseData,
  StreamMessage,
} from '../types';

// TSX生成接口的数据结构
interface TsxGenerationData {
  tsxCode: string;
}

// 健康检查数据结构
interface HealthCheckData {
  service: string;
  version: string;
  status: string;
  environment: string;
  timestamp: string;
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
  async generateTsxCode(message: string): Promise<ResponseData<TsxGenerationData>> {
    const response = await tsxGeneratorClient.post<TsxGenerationData>('/generate_tsx', {
      data: message.trim(),
      prompt: undefined // 使用默认提示词
    });

    return response
  }

  /**
   * 检查API服务状态
   * @returns Promise<boolean>
   */
  async checkHealth(): Promise<ResponseData<HealthCheckData>> {
    const response = await httpClient.get<HealthCheckData>('/health_check');
    return response;
  }

  /**
   * 生成TSX代码（支持自定义提示词）
   * @param data 要渲染的数据
   * @param customPrompt 可选的自定义提示词
   * @returns Promise<TsxGenerationResponse>
   */
  async generateTsxWithData(data: any, customPrompt?: string): Promise<ResponseData<TsxGenerationData>> {
    const response = await httpClient.post<TsxGenerationData>('/generate_tsx', {
      data: data,
    });
    return response;
  }

  async generateChart(data: Record<string, any>, demand: string = ''): Promise<ResponseData<TsxGenerationData>> {
    const response = await tsxGeneratorClient.post<TsxGenerationData>('/generate_chart', {
      data: data,
      demand: demand
    });
    return response
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
      await dataAgentClient.streamPost(
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
        error_type: 'common',
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
  async resetAgent(conversationId: string = 'global'): Promise<ResponseData<boolean>> {
    const response = await httpClient.post('/reset', { conversation_id: conversationId });
    return response;
  }
}

// 导出单例实例
export const apiService = new ApiService();
export default apiService;