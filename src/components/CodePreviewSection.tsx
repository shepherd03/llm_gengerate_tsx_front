import React from 'react';
import WindowHeader from './Common/WindowHeader';
import { GlassCard, GlassPanel } from './Common/GlassContainer';

interface CodePreviewSectionProps {
  tsxCode: string;
}

/**
 * 代码预览区域组件
 * 显示生成的TSX代码
 */
const CodePreviewSection: React.FC<CodePreviewSectionProps> = ({ tsxCode }) => {
  return (
    <GlassPanel className="w-1/2 h-full ml-3 flex flex-col">
      <WindowHeader
        title="TSX 代码预览"
        variant="gradient"
      />

      {/* 代码内容区域 */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        {tsxCode ? (
          <GlassCard className="p-6 overflow-x-auto border border-white/20">
            <pre className="text-sm font-mono leading-relaxed">
              <code className="text-gray-800">{tsxCode}</code>
            </pre>
          </GlassCard>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <GlassCard className="w-20 h-20 mb-6 flex items-center justify-center" onHover>
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
              </svg>
            </GlassCard>
            <p className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">暂无代码</p>
            <p className="text-sm text-center max-w-md text-gray-600 leading-relaxed">
              发送消息生成TSX代码后，将在此处显示
            </p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default CodePreviewSection;