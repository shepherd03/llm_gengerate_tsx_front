import React from 'react';

interface ViewToggleProps {
  showPreview: boolean;
  onToggle: (showPreview: boolean) => void;
}

/**
 * 视图切换组件
 * 在代码视图和预览视图之间切换
 */
const ViewToggle: React.FC<ViewToggleProps> = ({ showPreview, onToggle }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onToggle(false)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${!showPreview
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
          }`}
      >
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>代码</span>
        </div>
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${showPreview
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
          }`}
      >
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>预览</span>
        </div>
      </button>
    </div>
  );
};

export default ViewToggle;