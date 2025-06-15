import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import type { Message } from '../types';

interface ChatSectionProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
}

/**
 * 聊天区域组件
 * 包含消息列表和输入框
 */
const ChatSection: React.FC<ChatSectionProps> = ({ messages, isLoading, onSendMessage }) => {
  return (
    <div className="w-1/2 flex flex-col glass-strong rounded-2xl shadow-glass-strong mr-3">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatSection;