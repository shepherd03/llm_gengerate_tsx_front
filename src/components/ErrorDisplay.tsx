import React from 'react';
import { GlassCard } from './GlassContainer';

interface ErrorDisplayProps {
  error: string;
  title?: string;
  className?: string;
  onDismiss?: () => void;
}

/**
 * 错误显示组件
 * 用于显示编译错误和其他错误信息
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = '编译错误',
  className = '',
  onDismiss
}) => {
  return (
    <GlassCard className={`bg-red-50/90 border-red-200/50 ${className}`}>
      <div className="flex items-start space-x-3 p-4">
        {/* 错误图标 */}
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5 shadow-lg flex-shrink-0">
          <span className="text-white text-xs font-bold">!</span>
        </div>

        {/* 错误内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-red-800">{title}</h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-100/50"
                aria-label="关闭错误提示"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <pre className="text-xs text-red-600 whitespace-pre-wrap leading-relaxed overflow-auto max-h-32">
            {error}
          </pre>
        </div>
      </div>
    </GlassCard>
  );
};

export default ErrorDisplay;