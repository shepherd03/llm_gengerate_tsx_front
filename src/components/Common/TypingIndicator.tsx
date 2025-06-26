import React from 'react';
import LoadingDots from './LoadingDots';

interface TypingIndicatorProps {
  /** 显示的文本 */
  text?: string;
  /** 是否显示加载动画 */
  showAnimation?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * 打字指示器组件 - 显示AI正在生成回复的状态
 */
const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  text = '正在思考中',
  showAnimation = true,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 text-gray-600 ${className}`}>
      <span className="text-sm font-medium">{text}</span>
      {showAnimation && (
        <LoadingDots size="sm" color="purple" />
      )}
    </div>
  );
};

export default TypingIndicator;