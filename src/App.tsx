import React, { useEffect } from 'react';
import AppLayout from './components/AppLayout';
import AppHeader from './components/AppHeader';
import ChatSection from './components/ChatSection';
import CodePreviewSection from './components/CodePreviewSection';
import CodeEditorPreview from './pages/CodeEditorPreview';
import { useAppState } from './utils/useAppState';
import { useApiService } from './utils/useApiService';

function App() {
  const {
    currentPage,
    messages,
    currentTsxCode,
    setCurrentPage,
    setMessages,
    updateTsxCode
  } = useAppState();

  const { isOnline, isLoading, sendMessage } = useApiService();

  // 处理发送消息
  const handleSendMessage = async (content: string) => {
    await sendMessage(content, messages, setMessages);
  };

  // 监听消息变化，更新TSX代码
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage?.tsxCode) {
      updateTsxCode(latestMessage.tsxCode);
    }
  }, [messages, updateTsxCode]);



  return (
    <AppLayout>
      <AppHeader
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOnline={isOnline}
      />

      {/* 主要内容区域 */}
      {currentPage === 'editor' ? (
        <CodeEditorPreview />
      ) : (
        <div className="h-full flex p-6 ">
          <ChatSection
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
          <CodePreviewSection tsxCode={currentTsxCode} />
        </div>
      )}
    </AppLayout>
  );
}

export default App;
