import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Message, BackendResponse, FetchDataResponse } from '../types';

interface UseApiServiceReturn {
  isOnline: boolean;
  isLoading: boolean;
  sendMessage: (content: string, messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => Promise<void>;
  fetchData: (userInput: string) => Promise<BackendResponse<FetchDataResponse> | null>;
}

/**
 * API服务Hook
 * 管理API连接状态和消息发送逻辑
 */
export const useApiService = (): UseApiServiceReturn => {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 检查API服务状态
  useEffect(() => {
    const checkApiHealth = async () => {
      const health = await apiService.checkHealth();
      setIsOnline(health);
    };

    checkApiHealth();
    // 每20秒检查一次服务状态
    const interval = setInterval(checkApiHealth, 20000);

    return () => clearInterval(interval);
  }, []);

  // 发送消息处理函数
  const sendMessage = useCallback(async (
    content: string,
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 调用API获取TSX代码
      const response = await apiService.generateTsxCode(content);
      console.log(response.tsxCode)
      // 添加AI回复消息
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.message || '已为您生成TSX代码：',
        tsxCode: response.tsxCode,
        timestamp: Date.now()
      };

      if (!response.success) {
        aiMessage.content = response.error || '生成代码时出现错误，请重试';
        aiMessage.tsxCode = '';
      }

      setMessages(prev => [...prev, aiMessage]);
    } catch (_error) {
      // 添加错误消息
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '抱歉，服务暂时不可用，请稍后重试',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 获取数据处理函数
  const fetchData = useCallback(async (userInput: string): Promise<BackendResponse<FetchDataResponse> | null> => {
    return await apiService.fetchData(userInput);
  }, []);

  return {
    isOnline,
    isLoading,
    sendMessage,
    fetchData
  };
};

export default useApiService;