import React, { useState, useEffect } from 'react';
import { GlassPanel } from '../components/Common/GlassContainer';
import WindowHeader from '../components/Common/WindowHeader';
import ChatInput from '../components/ChatInput';
import MessageContainer from '../components/MessageContainer';
import DataDisplayComponent from '../components/DataDisplay/DataDisplayComponent';
import StatisticalAnalysisComponent from '../components/StatisticalAnalysis/StatisticalAnalysisComponent';
import CodePreviewPanel from '../components/CodePreview/CodePreviewPanel';
import { apiService } from '../services/api';
import { MockDataService } from '../services/mockData';
import type { Message, FetchDataResponse, MultiStepResponse, CompleteBackendResponse } from '../types';

interface RenderedComponent {
  id: string;
  type: 'data_display' | 'statistical_analysis' | 'visualization';
  title: string;
  data: any;
  chartType?: string;
  source?: string;
  timestamp: number;
}

function DataAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renderedComponents, setRenderedComponents] = useState<RenderedComponent[]>([]);
  const [isProcessingMultiStep, setIsProcessingMultiStep] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [useMockData, setUseMockData] = useState(false);
  const [multiStepData, setMultiStepData] = useState<FetchDataResponse[]>([]);

  // 处理发送消息
  const handleSendMessage = async (content: string) => {
    if (isLoading || isProcessingMultiStep) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // 添加AI正在处理的消息
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '正在请求...',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, aiMessage]);

    try {
      let response;

      if (useMockData) {
        // 使用模拟数据
        response = await MockDataService.fetchData(content);
      } else {
        try {
          // 尝试使用真实API
          response = await apiService.fetchData(content);
        } catch (apiError) {
          console.warn('API连接失败，切换到模拟数据模式:', apiError);
          setUseMockData(true);
          response = await MockDataService.fetchData(content);
        }
      }

      if (!response) {
        // 更新AI消息为错误状态
        setMessages(prev => prev.map(msg =>
          msg.id === aiMessage.id
            ? { ...msg, content: '请求失败，请稍后重试' }
            : msg
        ));
        return;
      }

      console.log(response)
      // 检查是否为多步任务
      const isMultiStep = 'results' in response.data;

      if (isMultiStep) {
        // 多步任务处理
        const multiStepResponse = response.data as MultiStepResponse;
        setMultiStepData(multiStepResponse.results);
        setIsProcessingMultiStep(true);
        setCurrentStepIndex(0);

        // 更新AI消息
        setMessages(prev => prev.map(msg =>
          msg.id === aiMessage.id
            ? { ...msg, content: `检测到多步任务，共${multiStepResponse.results.length}个步骤，开始执行...` }
            : msg
        ));

        // 开始分步执行
        await executeMultiStepTasks(multiStepResponse.results);
      } else {
        // 单步任务处理
        const singleStepResponse = response.data as FetchDataResponse;

        // 更新AI消息
        setMessages(prev => prev.map(msg =>
          msg.id === aiMessage.id
            ? { ...msg, content: singleStepResponse.message || response.message }
            : msg
        ));

        // 渲染组件
        renderComponent(singleStepResponse);
      }
    } catch (error) {
      console.error('请求失败:', error);
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessage.id
          ? { ...msg, content: '请求失败，请检查网络连接' }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // 执行多步任务
  const executeMultiStepTasks = async (steps: FetchDataResponse[]) => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);

      // 添加步骤提示消息
      const stepMessage: Message = {
        id: `step-${Date.now()}-${i}`,
        type: 'assistant',
        content: `正在执行第${i + 1}步: ${steps[i].title}...`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, stepMessage]);

      // 模拟处理时间
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 更新步骤完成消息
      setMessages(prev => prev.map(msg =>
        msg.id === stepMessage.id
          ? { ...msg, content: steps[i].message || `第${i + 1}步完成: ${steps[i].title}` }
          : msg
      ));

      // 渲染当前步骤的组件
      renderComponent(steps[i]);

      // 短暂延迟，让用户看到渲染效果
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 多步任务完成
    setIsProcessingMultiStep(false);
    setCurrentStepIndex(0);
    const completionMessage: Message = {
      id: `completion-${Date.now()}`,
      type: 'assistant',
      content: `多步任务执行完成，共完成${steps.length}个步骤`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, completionMessage]);
  };

  // 渲染组件
  const renderComponent = (data: FetchDataResponse) => {
    const newComponent: RenderedComponent = {
      id: `component-${Date.now()}-${Math.random()}`,
      type: data.operation_type,
      title: data.title,
      data: data.result,
      chartType: data.type,
      source: data.source,
      timestamp: Date.now()
    };

    setRenderedComponents(prev => [...prev, newComponent]);
  };

  // 生成图表代码
  const generateChartCode = (data: any, chartType: string): string => {
    // 根据数据类型动态生成图表配置
    const generateChartOption = () => {
      if (!data || !Array.isArray(data)) return null;

      // 柱状图配置
      if (chartType === 'bar') {
        const categories = data.map(item => item.地市 || item.月份 || item.停电原因 || Object.keys(item)[0]);
        const values = data.map(item => {
          const numericKeys = Object.keys(item).filter(key => typeof item[key] === 'number');
          return item[numericKeys[0]] || 0;
        });
        const seriesName = Object.keys(data[0]).find(key => typeof data[0][key] === 'number') || '数值';

        return {
          title: {
            text: '数据分析图表',
            left: 'center',
            textStyle: { fontFamily: 'Segoe UI', fontSize: 18 }
          },
          tooltip: { trigger: 'axis' },
          toolbox: {
            feature: {
              saveAsImage: {},
              magicType: { type: ['line', 'bar'] }
            },
            top: 40,
            right: 20
          },
          grid: { top: 100, bottom: 100, left: 60, right: 60 },
          xAxis: {
            type: 'category',
            data: categories,
            axisLabel: { fontFamily: 'Segoe UI', rotate: 45 }
          },
          yAxis: { type: 'value', axisLabel: { fontFamily: 'Segoe UI' } },
          dataZoom: [{ type: 'slider' }],
          series: [{
            name: seriesName,
            type: 'bar',
            data: values,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              }
            }
          }]
        };
      }

      // 折线图配置
      if (chartType === 'line') {
        const categories = data.map(item => item.月份 || item.季度 || item.地市 || Object.keys(item)[0]);
        const numericKeys = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');

        const series = numericKeys.map((key, index) => ({
          name: key,
          type: 'line',
          smooth: true,
          data: data.map(item => item[key]),
          areaStyle: { opacity: 0.4 },
          lineStyle: { width: 3 }
        }));

        return {
          title: {
            text: '趋势分析图表',
            left: 'center',
            textStyle: { fontFamily: 'Segoe UI', fontSize: 18 }
          },
          tooltip: { trigger: 'axis' },
          legend: {
            data: numericKeys,
            top: 40,
            textStyle: { fontFamily: 'Segoe UI' }
          },
          toolbox: {
            feature: {
              saveAsImage: {},
              magicType: { type: ['line', 'bar', 'stack'] }
            },
            top: 40,
            right: 20
          },
          grid: { top: 100, bottom: 100, left: 60, right: 60 },
          xAxis: {
            type: 'category',
            data: categories,
            axisLabel: { fontFamily: 'Segoe UI' }
          },
          yAxis: { type: 'value', axisLabel: { fontFamily: 'Segoe UI' } },
          dataZoom: [{ type: 'slider' }],
          series
        };
      }

      // 饼图配置
      if (chartType === 'pie') {
        const pieData = data.map(item => {
          const name = item.停电原因 || item.地市 || Object.values(item)[0];
          const value = Object.values(item).find(v => typeof v === 'number') || 0;
          return { name, value };
        });

        return {
          title: {
            text: '分布占比图表',
            left: 'center',
            textStyle: { fontFamily: 'Segoe UI', fontSize: 18 }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: { fontFamily: 'Segoe UI' }
          },
          toolbox: {
            feature: { saveAsImage: {} },
            top: 40,
            right: 20
          },
          series: [{
            name: '数据分布',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
      }

      // 默认柱状图
      return {
        title: {
          text: '数据图表',
          left: 'center',
          textStyle: { fontFamily: 'Segoe UI', fontSize: 18 }
        },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['暂无数据'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [0] }]
      };
    };

    const option = generateChartOption();

    return `
function MyComponent() {
  const chartRef = React.useRef(null);
  React.useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const option = ${JSON.stringify(option, null, 2)};
    chart.setOption(option);
    return () => chart.dispose();
  }, []);

  return <div style={{ padding: '16px', width: '100%', height: '500px' }}>
    <div ref={chartRef} style={{ width: '100%', height: '100%', background: 'white' }} />
  </div>;
}
export default MyComponent;`;
  };

  // 渲染右侧组件
  const renderRightPanelComponent = (component: RenderedComponent) => {
    const commonProps = {
      title: component.title,
      className: 'animate-fadeIn'
    };

    switch (component.type) {
      case 'data_display':
        return (
          <DataDisplayComponent
            key={component.id}
            {...commonProps}
            data={component.data}
          />
        );
      case 'statistical_analysis':
        return (
          <StatisticalAnalysisComponent
            key={component.id}
            {...commonProps}
            data={component.data}
            source={component.source}
          />
        );
      case 'visualization':
        // 生成图表的TSX代码
        const chartCode = generateChartCode(component.data, component.chartType || 'bar');
        return (
          <CodePreviewPanel
            key={component.id}
            title={component.title}
            compiledCode={chartCode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex p-6 overflow-hidden">
      {/* 左侧聊天区域 */}
      <GlassPanel className="w-1/2 h-full flex flex-col mr-3">
        <WindowHeader
          title="智能对话"
          subtitle={
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${useMockData ? 'bg-orange-400' : 'bg-green-400'} animate-pulse`}></div>
              <span>{useMockData ? '测试模式' : '实时数据模式'}</span>
            </div>
          }
          actions={
            <button
              onClick={() => setUseMockData(!useMockData)}
              className="px-3 py-1 text-xs bg-white/80 hover:bg-white rounded-full transition-colors"
            >
              切换模式
            </button>
          }
          variant="gradient"
          status={useMockData ? 'warning' : 'success'}
        />

        {/* 示例提示词 */}
        {useMockData && (
          <div className="mx-6 mb-4 p-3 bg-blue-50/50 rounded-lg border border-blue-200/50">
            <p className="text-xs text-gray-600 mb-2">示例提示词：</p>
            <div className="flex flex-wrap gap-1">
              {MockDataService.getExamplePrompts().map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-xs transition-colors"
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          <MessageContainer messages={messages} chatTip="输入您的需求" />
        </div>
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading || isProcessingMultiStep}
        />
      </GlassPanel>

      {/* 右侧组件渲染区域 */}
      <GlassPanel className="w-1/2 h-full flex flex-col ml-3">
        <WindowHeader
          title="分析结果"
          subtitle={
            renderedComponents.length === 0
              ? '发送消息开始数据分析'
              : `已展示 ${renderedComponents.length} 个组件`
          }
          variant="gradient"
          status={renderedComponents.length > 0 ? 'success' : 'default'}
        />

        {/* 渲染所有组件 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {renderedComponents.map(component => renderRightPanelComponent(component))}
        </div>

        {/* 多步任务进度指示 */}
        {isProcessingMultiStep && (
          <div className="p-4 border-t border-white/20">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                多步任务执行中... ({currentStepIndex + 1}/{multiStepData.length})
              </div>
              <div className="mt-2 bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStepIndex + 1) / multiStepData.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </GlassPanel>
    </div>
  );
}

export default DataAnalysisPage;