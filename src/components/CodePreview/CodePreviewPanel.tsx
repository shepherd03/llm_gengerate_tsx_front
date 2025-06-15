import React from 'react';
import { GlassPanel } from '../Common/GlassContainer';
import WindowHeader from '../Common/WindowHeader';
import CodePreview from './CodePreview';

interface CodePreviewPanelProps {
  compiledCode: string;
  error?: string | null;
  isCompiling?: boolean;
  className?: string;
  title?: string;
}

/**
 * 代码预览面板组件
 * 包含预览区域、标题栏和状态显示
 */
export const CodePreviewPanel: React.FC<CodePreviewPanelProps> = ({
  compiledCode,
  error,
  isCompiling = false,
  className = '',
  title = '实时预览'
}) => {
  // 确定副标题
  const getSubtitle = () => {
    if (isCompiling) return '编译中...';
    if (error) return '编译失败';
    if (compiledCode) return '运行中';
    return '等待编译';
  };

  // 确定状态颜色
  const getStatusVariant = () => {
    if (isCompiling) return 'warning';
    if (error) return 'error';
    if (compiledCode) return 'success';
    return 'default';
  };

  return (
    <GlassPanel className={`flex flex-col ${className}`}>
      {/* 标题栏 */}
      <WindowHeader
        title={title}
        subtitle={getSubtitle()}
        variant="gradient"
        showDots={false}
        status={getStatusVariant()}
      />

      {/* 预览容器 */}
      <div className="flex-1 p-6 overflow-hidden">
        {isCompiling ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-lg font-semibold mb-2 text-gray-700">编译中</p>
              <p className="text-sm text-gray-600">正在处理您的代码...</p>
            </div>
          </div>
        ) : (
          <CodePreview
            compiledCode={compiledCode}
            error={error}
            className="h-full"
          />
        )}
      </div>
    </GlassPanel>
  );
};

export default CodePreviewPanel;