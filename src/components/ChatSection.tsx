import React from 'react';
import MessageList from './MessageContainer';
import ChatInput from './ChatInput';
import { GlassPanel } from './Common/GlassContainer';
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
    <GlassPanel className="w-1/2 h-full flex flex-col mr-3">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </GlassPanel>
  );
};

export default ChatSection;