import React, { useState, useCallback } from 'react';
import { GlassPanel } from './GlassContainer';
import WindowHeader from './WindowHeader';
import CodeEditor from './CodeEditor';
import ErrorDisplay from './ErrorDisplay';

interface CodeEditorPanelProps {
  value: string;
  onChange: (code: string) => void;
  error?: string | null;
  className?: string;
  title?: string;
  subtitle?: string;
}

/**
 * 代码编辑器面板组件
 * 包含编辑器、标题栏和错误显示
 */
export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  value,
  onChange,
  error,
  className = '',
  title = '代码编辑器',
  subtitle = 'TSX + TypeScript'
}) => {
  const [isErrorDismissed, setIsErrorDismissed] = useState(false);

  // 处理代码变化
  const handleCodeChange = useCallback((newCode: string) => {
    onChange(newCode);
    // 当代码变化时，重新显示错误（如果有的话）
    if (isErrorDismissed) {
      setIsErrorDismissed(false);
    }
  }, [onChange, isErrorDismissed]);

  // 处理错误关闭
  const handleErrorDismiss = useCallback(() => {
    setIsErrorDismissed(true);
  }, []);

  // 确定是否显示错误
  const shouldShowError = error && !isErrorDismissed;

  return (
    <GlassPanel className={`flex flex-col ${className}`}>
      {/* 标题栏 */}
      <WindowHeader
        title={title}
        subtitle={subtitle}
        variant="gradient"
        showDots={false}
      />

      {/* 编辑器容器 */}
      <div className="flex-1 relative overflow-hidden">
        <CodeEditor
          value={value}
          onChange={handleCodeChange}
          language="typescriptreact"
          className="h-full"
          fontSize={14}
        />

        {/* 错误提示 */}
        {shouldShowError && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <ErrorDisplay
              error={error}
              title="编译错误"
              onDismiss={handleErrorDismiss}
            />
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default CodeEditorPanel;