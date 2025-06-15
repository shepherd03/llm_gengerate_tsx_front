import React, { useState, useRef, type KeyboardEvent } from 'react';
import type { ChatInputProps } from '../types';

/**
 * 聊天输入组件
 * 用于用户输入消息和发送请求
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 处理发送消息
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage('');
      // 重置textarea高度
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 自动调整textarea高度
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // 自动调整高度
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 120; // 最大高度约5行
    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
  };

  return (
    <div className="border-t border-white/30 glass-effect px-6 py-5">
      <div className="">
        <div className="flex items-end space-x-4">
          {/* 输入框 */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="输入您的需求，我将为您生成TSX代码..."
              className="w-full resize-none rounded-2xl border border-white/40 glass-strong px-5 py-4 pr-14 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:glass-strong transition-all duration-300 text-sm leading-relaxed shadow-glass placeholder:text-gray-500"
              style={{ minHeight: '52px', maxHeight: '120px' }}
              disabled={isLoading}
            />

            {/* 字符计数 */}
            {message.length > 0 && (
              <div className="absolute bottom-3 right-14 text-xs text-gray-500 bg-white/70 rounded-full px-2 py-1">
                {message.length}
              </div>
            )}
          </div>

          {/* 发送按钮 */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 shadow-lg transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;