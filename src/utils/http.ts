import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

// 服务端点配置
enum ServiceEndpoint {
  DATA_AGENT = 'DATA_AGENT',
  TSX_GENERATOR = 'TSX_GENERATOR'
}

// 服务端点URL映射
const SERVICE_URLS: Record<ServiceEndpoint, string> = {
  [ServiceEndpoint.DATA_AGENT]: 'http://localhost:5000',
  [ServiceEndpoint.TSX_GENERATOR]: 'http://localhost:5001'
};

// 默认服务端点
const DEFAULT_SERVICE = ServiceEndpoint.DATA_AGENT;

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
  private instances: Map<ServiceEndpoint, AxiosInstance> = new Map();
  private defaultService: ServiceEndpoint;

  constructor(defaultService: ServiceEndpoint = DEFAULT_SERVICE) {
    this.defaultService = defaultService;

    // 初始化所有服务端点的axios实例
    this.initializeServices();
  }

  /**
   * 初始化所有服务的axios实例
   */
  private initializeServices(): void {
    Object.entries(SERVICE_URLS).forEach(([service, baseURL]) => {
      const instance = axios.create({
        baseURL,
        timeout: 60000, // 默认60秒超时
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 为每个实例设置拦截器
      this.setupRequestInterceptor(instance, service as ServiceEndpoint);
      this.setupResponseInterceptor(instance, service as ServiceEndpoint);

      this.instances.set(service as ServiceEndpoint, instance);
    });
  }

  /**
   * 获取指定服务的axios实例
   */
  private getInstance(service?: ServiceEndpoint): AxiosInstance {
    const targetService = service || this.defaultService;
    const instance = this.instances.get(targetService);

    if (!instance) {
      throw new Error(`服务端点 ${targetService} 未找到`);
    }

    return instance;
  }

  /**
   * 设置请求拦截器
   */
  private setupRequestInterceptor(instance: AxiosInstance, service: ServiceEndpoint): void {
    instance.interceptors.request.use(
      (config) => {
        // 在请求发送前做一些处理
        console.log(`[${service}] ${config.method?.toUpperCase()} ${config.url}`);

        // 可以在这里添加token等认证信息
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
      },
      (error: AxiosError) => {
        console.error(`[${service} Request Error]`, error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 设置响应拦截器
   */
  private setupResponseInterceptor(instance: AxiosInstance, service: ServiceEndpoint): void {
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[${service}] ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        console.error(`[${service} Response Error]`, error);

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
   * 设置默认服务端点
   */
  setDefaultService(service: ServiceEndpoint): void {
    this.defaultService = service;
  }

  /**
   * 获取当前默认服务端点
   */
  getDefaultService(): ServiceEndpoint {
    return this.defaultService;
  }

  /**
   * 获取所有可用的服务端点
   */
  getAvailableServices(): ServiceEndpoint[] {
    return Object.values(ServiceEndpoint);
  }

  /**
   * GET请求
   */
  async get<T = any>(url: string, config?: HttpConfig & { service?: ServiceEndpoint }): Promise<ApiResponse<T>> {
    try {
      const { service, ...axiosConfig } = config || {};
      const instance = this.getInstance(service);
      const response = await instance.get(url, axiosConfig);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * POST请求
   */
  async post<T = any>(url: string, data?: any, config?: HttpConfig & { service?: ServiceEndpoint }): Promise<ApiResponse<T>> {
    try {
      const { service, ...axiosConfig } = config || {};
      const instance = this.getInstance(service);
      const response = await instance.post(url, data, axiosConfig);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * PUT请求
   */
  async put<T = any>(url: string, data?: any, config?: HttpConfig & { service?: ServiceEndpoint }): Promise<ApiResponse<T>> {
    try {
      const { service, ...axiosConfig } = config || {};
      const instance = this.getInstance(service);
      const response = await instance.put(url, data, axiosConfig);
      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * DELETE请求
   */
  async delete<T = any>(url: string, config?: HttpConfig & { service?: ServiceEndpoint }): Promise<ApiResponse<T>> {
    try {
      const { service, ...axiosConfig } = config || {};
      const instance = this.getInstance(service);
      const response = await instance.delete(url, axiosConfig);
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
   * 流式请求处理
   * @param url 请求URL
   * @param data 请求数据
   * @param onMessage 消息回调函数
   * @param config 请求配置
   */
  async streamPost(
    url: string,
    data: any,
    onMessage: (message: any) => void,
    config?: HttpConfig & { service?: ServiceEndpoint }
  ): Promise<void> {
    try {
      const { service, ...restConfig } = config || {};
      const targetService = service || this.defaultService;
      const baseURL = SERVICE_URLS[targetService];

      const response = await fetch(`${baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(restConfig?.headers as Record<string, string> || {}),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // 保留最后一行（可能不完整）
        buffer = lines.pop() || '';

        // 处理完整的行
        for (const line of lines) {
          if (line.trim()) {
            try {
              const message = JSON.parse(line);
              onMessage(message);
            } catch (error) {
              console.warn('解析流式消息失败:', line, error);
            }
          }
        }
      }

      // 处理最后的缓冲区内容
      if (buffer.trim()) {
        try {
          const message = JSON.parse(buffer);
          onMessage(message);
        } catch (error) {
          console.warn('解析最后的流式消息失败:', buffer, error);
        }
      }
    } catch (error) {
      console.error('流式请求失败:', error);
      throw error;
    }
  }

  /**
   * 获取axios实例（用于特殊需求）
   */
  getAxiosInstance(service?: ServiceEndpoint): AxiosInstance {
    return this.getInstance(service);
  }
}

// 创建并导出HTTP客户端实例
export const httpClient = new HttpClient();

// 便捷的服务特定客户端
export const dataAgentClient = {
  get: <T = any>(url: string, config?: HttpConfig) =>
    httpClient.get<T>(url, { ...config, service: ServiceEndpoint.DATA_AGENT }),
  post: <T = any>(url: string, data?: any, config?: HttpConfig) =>
    httpClient.post<T>(url, data, { ...config, service: ServiceEndpoint.DATA_AGENT }),
  put: <T = any>(url: string, data?: any, config?: HttpConfig) =>
    httpClient.put<T>(url, data, { ...config, service: ServiceEndpoint.DATA_AGENT }),
  delete: <T = any>(url: string, config?: HttpConfig) =>
    httpClient.delete<T>(url, { ...config, service: ServiceEndpoint.DATA_AGENT }),
  streamPost: (url: string, data: any, onMessage: (message: any) => void, config?: HttpConfig) =>
    httpClient.streamPost(url, data, onMessage, { ...config, service: ServiceEndpoint.DATA_AGENT })
};

export const tsxGeneratorClient = {
  get: <T = any>(url: string, config?: HttpConfig) =>
    httpClient.get<T>(url, { ...config, service: ServiceEndpoint.TSX_GENERATOR }),
  post: <T = any>(url: string, data?: any, config?: HttpConfig) =>
    httpClient.post<T>(url, data, { ...config, service: ServiceEndpoint.TSX_GENERATOR }),
  put: <T = any>(url: string, data?: any, config?: HttpConfig) =>
    httpClient.put<T>(url, data, { ...config, service: ServiceEndpoint.TSX_GENERATOR }),
  delete: <T = any>(url: string, config?: HttpConfig) =>
    httpClient.delete<T>(url, { ...config, service: ServiceEndpoint.TSX_GENERATOR }),
  streamPost: (url: string, data: any, onMessage: (message: any) => void, config?: HttpConfig) =>
    httpClient.streamPost(url, data, onMessage, { ...config, service: ServiceEndpoint.TSX_GENERATOR })
};

// 导出类型和实例
export { ServiceEndpoint };
export type { HttpConfig, ApiResponse };
export default httpClient;