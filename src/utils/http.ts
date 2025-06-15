import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

// API基础配置
const API_BASE_URL = 'http://localhost:5000';

/**
 * HTTP请求配置接口
 */
interface HttpConfig extends AxiosRequestConfig {
  showError?: boolean; // 是否显示错误信息
  timeout?: number; // 请求超时时间
}

/**
 * 统一响应格式
 */
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * HTTP请求封装类
 */
class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    // 创建axios实例
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 默认10秒超时
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 设置请求拦截器
    this.setupRequestInterceptor();

    // 设置响应拦截器
    this.setupResponseInterceptor();
  }

  /**
   * 设置请求拦截器
   */
  private setupRequestInterceptor(): void {
    this.instance.interceptors.request.use(
      (config) => {
        // 在请求发送前做一些处理
        console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url}`);

        // 可以在这里添加token等认证信息
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
      },
      (error: AxiosError) => {
        console.error('[HTTP Request Error]', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 设置响应拦截器
   */
  private setupResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[HTTP Response] ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        console.error('[HTTP Response Error]', error);

        // 统一错误处理
        const errorMessage = this.handleError(error);

        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  /**
   * 统一错误处理
   */
  private handleError(error: AxiosError): string {
    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return '请求参数错误';
        case 401:
          return '未授权，请重新登录';
        case 403:
          return '拒绝访问';
        case 404:
          return '请求的资源不存在';
        case 500:
          return '服务器内部错误';
        case 502:
          return '网关错误';
        case 503:
          return '服务不可用';
        default:
          return (data as any)?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      return '网络连接失败，请检查网络';
    } else {
      // 其他错误
      return error.message || '请求失败';
    }
  }

  /**
   * GET请求
   */
  async get<T = any>(url: string, config?: HttpConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get(url, config);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * POST请求
   */
  async post<T = any>(url: string, data?: any, config?: HttpConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post(url, data, config);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * PUT请求
   */
  async put<T = any>(url: string, data?: any, config?: HttpConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put(url, data, config);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * DELETE请求
   */
  async delete<T = any>(url: string, config?: HttpConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete(url, config);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * 格式化成功响应
   */
  private formatResponse<T>(response: AxiosResponse): ApiResponse<T> {
    const { data } = response;

    // 如果后端返回的数据已经是标准格式
    if (data && typeof data === 'object' && 'success' in data) {
      return data;
    }

    // 否则包装成标准格式
    return {
      success: true,
      data: data,
      message: 'success'
    };
  }

  /**
   * 格式化错误响应
   */
  private formatErrorResponse(error: any): ApiResponse {
    return {
      success: false,
      error: error instanceof Error ? error.message : '请求失败，请检查网络连接'
    };
  }

  /**
   * 获取axios实例（用于特殊需求）
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// 创建并导出HTTP客户端实例
export const httpClient = new HttpClient();
export default httpClient;

// 导出类型
export type { HttpConfig, ApiResponse };