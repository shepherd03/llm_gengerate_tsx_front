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

      // 处理export default语句，转换为render调用
      const exportDefaultMatch = processedCode.match(/export\s+default\s+(\w+);?/);
      if (exportDefaultMatch) {
        const componentName = exportDefaultMatch[1];
        processedCode = processedCode.replace(/export\s+default\s+\w+;?/, '');
        processedCode += `\nrender(<${componentName} />);`;
      } else {
        // 如果没有export default，尝试查找最后定义的组件
        const patterns = [
          /function\s+(\w+)\s*\(/,  // function MyComponent()
          /const\s+(\w+)\s*=\s*\(/,  // const MyComponent = ()
          /const\s+(\w+)\s*:\s*React\.FC/,  // const MyComponent: React.FC
          /const\s+(\w+)\s*=\s*React\.memo/  // const MyComponent = React.memo
        ];

        let componentName = null;
        for (const pattern of patterns) {
          const match = processedCode.match(pattern);
          if (match) {
            componentName = match[1];
            break;
          }
        }

        if (componentName) {
          processedCode += `\nrender(<${componentName} />);`;
        }
      }

      return processedCode;
    } catch (err) {
      console.error('处理代码时出错:', err);
      throw err;
    }
  }, []);

  // 创建react-live的scope，包含所有必要的依赖
  const scope = useMemo(() => ({
    React: {
      ...React,
      useState: React.useState,
      useEffect: React.useEffect,
      useCallback: React.useCallback,
      useRef: React.useRef,
      useMemo: React.useMemo,
    },
    useState: React.useState,
    useEffect: React.useEffect,
    useCallback: React.useCallback,
    useRef: React.useRef,
    useMemo: React.useMemo,
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
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center">
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
      </div>
    );
  }

  // 使用react-live渲染动态组件
  return (
    <div className={`h-full overflow-auto ${className}`}>
      <div className="min-h-full p-4">
        <LiveProvider
          code={processedCode}
          scope={scope}
          noInline={true}
        >
          <LivePreview className="min-h-full" />
          <LiveError className="text-red-500 p-4 bg-red-50 rounded-md mt-4" />
        </LiveProvider>
      </div>
    </div>
  );
};
export default CodePreview;