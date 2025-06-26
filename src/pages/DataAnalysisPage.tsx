import React, { useState, useEffect } from 'react';
import DataDisplayComponent from '../components/DataDisplay/DataDisplayComponent';
import StatisticalAnalysisComponent from '../components/StatisticalAnalysis/StatisticalAnalysisComponent';
import CodePreviewPanel from '../components/CodePreview/CodePreviewPanel';
import { apiService } from '../services/api';

import type {
  Message,
  StreamMessage,
  StreamInfoMessage,
  StreamDataDisplayMessage,
  StreamStatisticalAnalysisMessage,
  StreamVisualizationMessage
} from '../types';
import ChatInput from '../components/ChatInput';
import { GlassPanel } from '../components/Common/GlassContainer';
import WindowHeader from '../components/Common/WindowHeader';
import EmptyDataPanel from '../components/Common/EmptyDataPanel';
import MessageContainer from '../components/MessageContainer';
import useCodeCompiler from '../utils/useCodeCompiler';


interface ChartGenerationState {
  [key: string]: {
    isGenerating: boolean;
    compiledCode?: string;
    error?: string;
  };
}

function DataAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rightPanelComponentInfo, setRightPanelComponentInfo] = useState<StreamMessage[]>([]);
  const [renderedComponents, setRenderedComponents] = useState<React.ReactNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chartStates, setChartStates] = useState<ChartGenerationState>({});
  const { compiledCode, compile } = useCodeCompiler();

  const handleDataAnalysisMessage = async (message: StreamMessage) => {
    console.log(message)
    switch (message.type) {
      case 'info':
      case 'error':
      case 'finish':
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: message.message,
          timestamp: Date.now()
        }]);
        setIsProcessing(false);
        break;
      case 'data_display':
      case 'statistical_analysis':
      case 'visualization':
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: message.message,
          timestamp: Date.now()
        }]);
        setRightPanelComponentInfo(prev => [...prev, message]);
        break;
    }
  };

  // 处理组件渲染的useEffect
  useEffect(() => {
    const renderComponents = async () => {
      const newComponents: React.ReactNode[] = [];

      for (let i = 0; i < rightPanelComponentInfo.length; i++) {
        const componentInfo = rightPanelComponentInfo[i];
        const key = `${componentInfo.type}-${i}`;

        switch (componentInfo.type) {
          case 'data_display':
            const dataDisplayInfo = componentInfo as StreamDataDisplayMessage;
            newComponents.push(
              <DataDisplayComponent
                key={key}
                title={dataDisplayInfo.data.title}
                data={dataDisplayInfo.data.result}
              />
            );
            break;
          case 'statistical_analysis':
            const statisticalAnalysisInfo = componentInfo as StreamStatisticalAnalysisMessage;
            newComponents.push(
              <StatisticalAnalysisComponent
                key={key}
                title={statisticalAnalysisInfo.title}
                data={statisticalAnalysisInfo.data}
                source={statisticalAnalysisInfo.source}
              />
            );
            break;
          case 'visualization':
            const visualizationInfo = componentInfo as StreamVisualizationMessage;

            // 检查数据是否为空
            if (!visualizationInfo.data ||
              (Array.isArray(visualizationInfo.data) && visualizationInfo.data.length === 0) ||
              (typeof visualizationInfo.data === 'object' && Object.keys(visualizationInfo.data).length === 0)) {
              // 数据为空，显示空数据组件
              newComponents.push(
                <EmptyDataPanel
                  key={key}
                  title={visualizationInfo.title || '数据可视化'}
                  message="暂无数据，无法生成图表"
                />
              );
              break;
            }

            const chartState = chartStates[key];
            if (!chartState) {
              // 初始化状态并开始生成
              setChartStates(prev => ({
                ...prev,
                [key]: { isGenerating: true }
              }));

              // 异步生成图表代码
              setTimeout(async () => {
                try {
                  const demand = `标题:${visualizationInfo.title} 类型:${visualizationInfo.vis_type}`
                  const response = await apiService.generateChart(visualizationInfo.data, demand);
                  compile(response.data.tsxCode);

                  setChartStates(prev => ({
                    ...prev,
                    [key]: {
                      isGenerating: false,
                      compiledCode: response.data.tsxCode
                    }
                  }));
                } catch (error) {
                  console.error('生成可视化代码失败:', error);
                  setChartStates(prev => ({
                    ...prev,
                    [key]: {
                      isGenerating: false,
                      error: '生成可视化组件失败'
                    }
                  }));
                }
              }, 100);

              newComponents.push(
                <GlassPanel key={key} className="flex flex-col h-[500px] p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {visualizationInfo.title || '数据可视化'}
                    </h3>
                  </div>
                  <div className="text-gray-500 text-sm">
                    正在生成图表代码，请稍候...
                  </div>
                </GlassPanel>
              );
            } else if (chartState.isGenerating) {
              // 仍在生成中，显示加载状态
              newComponents.push(
                <GlassPanel key={key} className="flex flex-col h-[500px] p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {visualizationInfo.title || '数据可视化'}
                    </h3>
                  </div>
                  <div className="text-gray-500 text-sm">
                    正在生成图表代码，请稍候...
                  </div>
                </GlassPanel>
              );
            } else if (chartState.error) {
              // 生成失败，显示错误信息
              newComponents.push(
                <GlassPanel key={key} className="flex flex-col h-[500px] p-4">
                  <h3 className="text-lg font-semibold text-red-700 mb-2">
                    {visualizationInfo.title || '数据可视化'}
                  </h3>
                  <p className="text-red-600">{chartState.error}</p>
                </GlassPanel>
              );
            } else if (chartState.compiledCode) {
              console.log(chartState.compiledCode)
              // 生成成功，显示图表组件
              newComponents.push(
                <CodePreviewPanel
                  key={key}
                  compiledCode={chartState.compiledCode}
                  title={visualizationInfo.title || '数据可视化'}
                />
              );
            }
            break;
          default:
            break;
        }
      }

      setRenderedComponents(newComponents);
    };

    renderComponents();
  }, [rightPanelComponentInfo, compiledCode, chartStates]);

  // 处理发送消息
  const handleSendMessage = async (content: string) => {
    if (isLoading || isProcessing) return;

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
      await apiService.streamDataAnalysis(content, handleDataAnalysisMessage)

      return;
    }
    catch (error) {
      console.error('请求失败:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: '请求失败，请检查网络连接',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex p-6 overflow-hidden">
      {/* 左侧聊天区域 */}
      <GlassPanel className="w-1/2 h-full flex flex-col mr-3">
        <WindowHeader
          title="智能对话"
          variant="gradient"
          status="success"
        />


        <MessageContainer
          messages={messages}
          chatTip="输入您的需求"
          isLoading={isLoading}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </GlassPanel>

      {/* 右侧组件渲染区域 */}
      <GlassPanel className="w-1/2 h-full flex flex-col ml-3">
        <WindowHeader
          title="分析结果"
          variant="gradient"
        />
        <div className="flex-1 overflow-y-auto p-4 space-y-6  ">
          {renderedComponents}
        </div>
      </GlassPanel>
    </div>
  );
}


export default DataAnalysisPage;