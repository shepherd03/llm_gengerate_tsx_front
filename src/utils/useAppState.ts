import { useState, useCallback } from 'react';
import type { Message } from '../types';

interface UseAppStateReturn {
  messages: Message[];
  currentTsxCode: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  updateTsxCode: (code: string) => void;
  clearMessages: () => void;
}

/**
 * 应用状态管理Hook
 * 集中管理应用的核心状态（不包括页面状态，由路由管理）
 */
export const useAppState = (): UseAppStateReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTsxCode, setCurrentTsxCode] = useState('');

  // 更新TSX代码
  const updateTsxCode = useCallback((code: string) => {
    setCurrentTsxCode(code);
  }, []);

  // 清空消息
  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentTsxCode('');
  }, []);

  return {
    messages,
    currentTsxCode,
    setMessages,
    updateTsxCode,
    clearMessages
  };
};

export default useAppState;