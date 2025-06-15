import { useState, useCallback } from 'react';
import type { Message } from '../types';

type PageType = 'chat' | 'demo' | 'editor';

interface UseAppStateReturn {
  currentPage: PageType;
  messages: Message[];
  currentTsxCode: string;
  setCurrentPage: (page: PageType) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  updateTsxCode: (code: string) => void;
  clearMessages: () => void;
}

/**
 * 应用状态管理Hook
 * 集中管理应用的核心状态
 */
export const useAppState = (): UseAppStateReturn => {
  const [currentPage, setCurrentPage] = useState<PageType>('chat');
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
    currentPage,
    messages,
    currentTsxCode,
    setCurrentPage,
    setMessages,
    updateTsxCode,
    clearMessages
  };
};

export default useAppState;