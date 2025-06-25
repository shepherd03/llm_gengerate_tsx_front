import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types';
import { GlassCard } from './Common/GlassContainer';
import TypingIndicator from './Common/TypingIndicator';

interface MessageContainerProps {
  messages: Message[];
  chatTip?: string;
  isLoading?: boolean;
}

/**
 * 消息列表组件
 * 用于展示对话历史和TSX代码
 */
const MessageList: React.FC<MessageContainerProps> = (
  {
    messages,
    chatTip = "输入您的需求，我将为您生成相应的TSX代码组件",
    isLoading = false,
  }
) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 格式化时间显示
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">开始对话</p>
          <p className="text-sm text-center max-w-md text-gray-600 leading-relaxed">
            {chatTip}
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={message.id} className={`message-enter flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-start space-x-4 max-w-3xl">
              {message.type === 'user' ? (
                // 用户消息
                <>
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl px-5 py-4 max-w-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-blue-100 mt-3 opacity-80">{formatTime(message.timestamp)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </>
              ) : (
                // AI助手消息
                <>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <GlassCard className="flex-1 bg-white/80 p-4">
                    <TypingIndicator text={message.content} showAnimation={isLoading && index === messages.length - 1} />
                  </GlassCard>
                </>
              )}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;