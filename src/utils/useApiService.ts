import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Message, ResponseData, FetchDataResponse } from '../types';

interface UseApiServiceReturn {
  isOnline: boolean;
  isLoading: boolean;
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
      setIsOnline(health.data.status == 'healthy');
    };

    checkApiHealth();
    // 每20秒检查一次服务状态
    const interval = setInterval(checkApiHealth, 20000);

    return () => clearInterval(interval);
  }, []);

  return {
    isOnline,
    isLoading,
  };
};

export default useApiService;