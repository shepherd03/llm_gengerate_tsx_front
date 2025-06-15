import React, { useState } from 'react';
import type { CodeDisplayProps } from '../types';

/**
 * 代码展示组件
 * 用于展示和渲染TSX代码
 */
const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  // 复制代码到剪贴板
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 简单的语法高亮处理
  const highlightCode = (code: string) => {
    return code
      .replace(/(import|export|const|let|var|function|return|if|else|for|while|class|interface|type)/g,
        '<span class="keyword">$1</span>')
      .replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* 代码头部 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 text-sm text-gray-600 font-medium">{language.toUpperCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>已复制</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* 代码内容 */}
      <div className="code-block">
        <pre className="text-sm leading-relaxed">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightCode(code)
            }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;