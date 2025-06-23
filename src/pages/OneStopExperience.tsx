import { useEffect, useState } from 'react';
import ChatSection from '../components/ChatSection';
import { CodePreviewPanel } from '../components/CodePreview/CodePreviewPanel';
import { useAppState } from '../utils/useAppState';
import { useApiService } from '../utils/useApiService';
import { useCodeCompiler } from '../utils/useCodeCompiler';
import { apiService } from '../services/api';
import type { Message } from '../types';

function OneStopExperience() {
  const {
    messages,
    currentTsxCode,
    setMessages,
    updateTsxCode
  } = useAppState();

  const { fetchData } = useApiService();
  const [isLoading, setIsLoading] = useState(false);
  const { compiledCode, error: compileError, isCompiling, compile } = useCodeCompiler();

  // 处理发送消息
  const handleSendMessage = async (content: string) => {
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
      // 第一步：调用fetchData获取数据
      const fetchDataResponse = await fetchData(content);

      if (!fetchDataResponse || fetchDataResponse.code !== 200) {
        // 添加错误消息
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: '数据获取失败，请重试',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }

      const fetchResult = fetchDataResponse.data!;

      console.log(`operation_type: ${fetchResult.operation_type}`)
      console.log(`title: ${fetchResult.title}`)
      console.log(`result:`, fetchResult.result) 

      const sendData = `操作类型：${fetchResult.operation_type}\n标题：${fetchResult.title}\n数据：${JSON.stringify(fetchResult.result, null, 2)}`
      // 第二步：使用获取的数据调用generateTsxWithData
      const tsxResponse = await apiService.generateTsxWithData(sendData);

      // 添加AI回复消息
      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: tsxResponse.message || '已为您生成TSX代码：',
        tsxCode: tsxResponse.tsxCode,
        timestamp: Date.now()
      };

      if (!tsxResponse.success) {
        aiMessage.content = tsxResponse.error || '生成代码时出现错误，请重试';
        aiMessage.tsxCode = '';
      }

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
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

export default OneStopExperience;