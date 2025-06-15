import type { ApiResponse, BackendResponse, TsxGenerationData, HealthCheckData } from '../types';
import { httpClient } from '../utils/http';

/**
 * API服务类
 * 处理与后端的通信
 */
class ApiService {
  /**
   * 发送消息到后端并获取TSX代码
   * @param message 用户输入的消息
   * @returns Promise<ApiResponse>
   */
  async generateTsxCode(message: string): Promise<ApiResponse> {
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
   * @returns Promise<ApiResponse>
   */
  async generateTsxWithData(data: any, customPrompt?: string): Promise<ApiResponse> {
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
}

// 导出单例实例
export const apiService = new ApiService();
export default apiService;