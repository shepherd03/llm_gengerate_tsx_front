import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import { GlassCard } from '../Common/GlassContainer';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

interface CodePreviewProps {
  compiledCode: string;
  error?: string | null;
  className?: string;
}

/**
 * 代码预览组件
 * 动态执行编译后的TSX代码并渲染React组件
 */
export const CodePreview: React.FC<CodePreviewProps> = ({
  compiledCode,
  error,
  className = ''
}) => {
  const [processedCode, setProcessedCode] = useState<string>('');
  const [renderError, setRenderError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 处理编译后的代码，移除import和export语句
  const processCode = useCallback((code: string): string => {
    if (!code) return '';

    try {
      let processedCode = code;

      // 移除所有import语句（因为我们会通过scope提供依赖）
      processedCode = processedCode.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');

      // 检查是否有export default语句
      const exportDefaultMatch = processedCode.match(/export\s+default\s+(\w+);?/);
      if (exportDefaultMatch) {
        const componentName = exportDefaultMatch[1];
        processedCode = processedCode.replace(/export\s+default\s+\w+;?/, '');
        processedCode += `\nrender(<${componentName} />);`;
      } else {
        // 如果没有export default，抛出错误提示用户必须添加
        throw new Error('代码必须包含 "export default ComponentName" 语句才能正确渲染');
      }

      return processedCode;
    } catch (err) {
      console.error('处理代码时出错:', err);
      throw err;
    }
  }, []);

  // 创建react-live的scope，包含所有必要的依赖
  // 同时支持 React.useState 和直接使用 useState 两种写法
  const scope = useMemo(() => ({
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    useCallback: React.useCallback,
    useRef: React.useRef,
    useMemo: React.useMemo,
    useContext: React.useContext,
    useReducer: React.useReducer,
    echarts,
    ReactECharts,
  }), []);

  // 当编译代码变化时，使用防抖延迟处理代码
  useEffect(() => {
    // 清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!compiledCode) {
      setProcessedCode('');
      setRenderError(null);
      return;
    }

    // 设置防抖定时器，0.5秒后执行
    debounceTimerRef.current = setTimeout(() => {
      try {
        const processed = processCode(compiledCode);
        setProcessedCode(processed);
        setRenderError(null);
      } catch (err) {
        console.error('处理代码时出错:', err);
        setRenderError(err instanceof Error ? err.message : '代码处理失败');
        setProcessedCode('');
      }
    }, 500);

    // 清理函数
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [compiledCode, processCode]);

  // 如果有错误或没有编译代码，显示占位符
  if (error || renderError || !compiledCode || !processedCode) {
    return (
      <div className={`flex flex-col items-center justify-center h-full text-center ${className}`}>
        <GlassCard className="w-20 h-20 mx-auto mb-6 flex items-center justify-center" onHover>
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </GlassCard>
        <p className="text-gray-500 text-lg font-medium mb-2">
          {error || renderError || '等待代码编译...'}
        </p>
        <p className="text-gray-400 text-sm">
          {error || renderError ? '请检查代码是否正确' : '编译完成后将显示预览'}
        </p>
      </div>
    );
  }

  // 使用react-live渲染动态组件
  return (
    <div className={`h-full w-full relative ${className}`}>
      <LiveProvider
        code={processedCode}
        scope={scope}
        noInline={true}
      >
        <LivePreview className="w-full h-full" />
        {/* 错误信息覆盖层 - 显示在容器正中间 */}
        <LiveError className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          {({ error }) => (
            error ? (
              <div className="text-center p-6 max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">代码执行错误</h3>
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200 whitespace-pre-wrap">
                  {error.toString()}
                </p>
              </div>
            ) : null
          )}
        </LiveError>
      </LiveProvider>
    </div>
  );
};
export default CodePreview;