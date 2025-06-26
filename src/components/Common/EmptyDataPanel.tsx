import React from 'react';
import GlassPanel from './GlassContainer';

interface EmptyDataPanelProps {
  title?: string;
  message?: string;
  className?: string;
}

/**
 * 空数据异常组件
 * 当数据为空时显示的提示组件
 */
const EmptyDataPanel: React.FC<EmptyDataPanelProps> = ({
  title = '数据可视化',
  message = '暂无数据，无法生成图表',
  className = 'flex flex-col h-[500px] p-4'
}) => {
  return (
    <GlassPanel className={className}>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm">
          {message}
        </p>
      </div>
    </GlassPanel>
  );
};

export default EmptyDataPanel;