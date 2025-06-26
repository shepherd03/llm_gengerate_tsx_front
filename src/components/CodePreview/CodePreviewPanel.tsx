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
  showStatus?: boolean;
  /** 预览容器高度，可以是像素值(如 400)或CSS值(如 '50vh', '100%') */
  height?: number | string;
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
  title = '实时预览',
  showStatus = false,
  height = "500px"
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

  // 处理高度样式
  const containerStyle = height ? {
    height: typeof height === 'number' ? `${height}px` : height
  } : {};

  return (
    <GlassPanel
      className={`flex flex-col ${className}`}
      style={containerStyle}
    >
      {/* 标题栏 */}
      <WindowHeader
        title={title}
        subtitle={showStatus ? getSubtitle() : ''}
        variant="gradient"
        showDots={false}
        status={getStatusVariant()}
      />

      {/* 预览容器 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto scrollbar-hide">
          <CodePreview
            compiledCode={compiledCode}
            error={error}
            isCompiling={isCompiling}
            className="h-full"
          />
        </div>
      </div>
    </GlassPanel>
  );

};

export default CodePreviewPanel;