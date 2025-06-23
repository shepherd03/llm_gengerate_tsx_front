import { useEffect } from 'react';
import ChatSection from '../components/ChatSection';
import { CodePreviewPanel } from '../components/CodePreview/CodePreviewPanel';
import { useAppState } from '../utils/useAppState';
import { useApiService } from '../utils/useApiService';
import { useCodeCompiler } from '../utils/useCodeCompiler';

function ChatPage() {
  const {
    messages,
    currentTsxCode,
    setMessages,
    updateTsxCode
  } = useAppState();

  const { isLoading, sendMessage } = useApiService();
  const { compiledCode, error: compileError, isCompiling, compile } = useCodeCompiler();

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

  // 监听TSX代码变化，自动编译
  useEffect(() => {
    if (currentTsxCode) {
      compile(currentTsxCode);
    }
  }, [currentTsxCode, compile]);

  return (
    <div className="flex-1 flex p-6 overflow-hidden">
      <ChatSection
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
      <CodePreviewPanel
        compiledCode={compiledCode}
        error={compileError}
        isCompiling={isCompiling}
        className="w-1/2 h-full ml-3"
        title="TSX 代码预览"
      />
    </div>
  );
}

export default ChatPage;