import React, { useRef, useMemo, useEffect } from 'react';
import { GlassCard } from './GlassContainer';

interface CodePreviewProps {
  compiledCode: string;
  error?: string | null;
  className?: string;
}

/**
 * 代码预览组件
 * 负责在iframe中渲染编译后的TSX代码
 */
export const CodePreview: React.FC<CodePreviewProps> = ({
  compiledCode,
  error,
  className = ''
}) => {
  const previewRef = useRef<HTMLIFrameElement>(null);

  // 生成iframe的HTML内容
  const generateIframeContent = useMemo(() => {
    if (!compiledCode) return '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>TSX + Tailwind Preview</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- React -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        
        <!-- ECharts 和相关库 -->
        <script src="https://unpkg.com/echarts@5.4.3/dist/echarts.min.js"></script>
        <script src="https://unpkg.com/echarts-for-react@3.0.2/lib/index.js"></script>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                animation: {
                  'bounce-slow': 'bounce 2s infinite',
                  'pulse-slow': 'pulse 3s infinite'
                }
              }
            }
          }
        </script>
        
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
          #root {
            min-height: 100vh;
            width: 100%;
          }
          .error-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            padding: 2rem;
          }
          .error-card {
            max-width: 32rem;
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border: 1px solid #fecaca;
            padding: 1.5rem;
          }
          .error-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }
          .error-icon {
            width: 2rem;
            height: 2rem;
            background: #ef4444;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .error-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #991b1b;
            margin: 0;
          }
          .error-message {
            font-size: 0.875rem;
            color: #dc2626;
            background: #fef2f2;
            padding: 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #fecaca;
            overflow: auto;
            white-space: pre-wrap;
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            line-height: 1.5;
            margin: 0;
          }
          .error-footer {
            margin-top: 1rem;
            font-size: 0.75rem;
            color: #6b7280;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          // 将 echarts-for-react 暴露为全局变量
          if (typeof window.EchartsForReact !== 'undefined') {
            window.ReactECharts = window.EchartsForReact.default || window.EchartsForReact;
          }
          
          try {
            ${compiledCode}
            
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(MyComponent));
          } catch (error) {
            console.error('渲染错误:', error);
            document.getElementById('root').innerHTML = 
              '<div class="error-container">' +
              '<div class="error-card">' +
              '<div class="error-header">' +
              '<div class="error-icon">' +
              '<span style="color: white; font-weight: bold; font-size: 0.875rem;">!</span>' +
              '</div>' +
              '<h3 class="error-title">渲染错误</h3>' +
              '</div>' +
              '<pre class="error-message">' + error.message + '</pre>' +
              '<div class="error-footer">' +
              '请检查TSX语法和TypeScript类型定义' +
              '</div>' +
              '</div>' +
              '</div>';
          }
        </script>
      </body>
      </html>
    `;
  }, [compiledCode]);

  // 当编译代码变化时，更新iframe内容
  useEffect(() => {
    if (previewRef.current && generateIframeContent) {
      previewRef.current.srcdoc = generateIframeContent;
    }
  }, [generateIframeContent]);

  // 如果有错误或没有编译代码，显示占位符
  if (error || !compiledCode) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center">
          <GlassCard className="w-20 h-20 mx-auto mb-6 flex items-center justify-center" onHover>
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </GlassCard>
          <p className="text-lg font-semibold mb-2 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
            {error ? '编译失败' : '开始编码'}
          </p>
          <p className="text-sm text-gray-600 max-w-md leading-relaxed">
            {error ? '请修复代码中的错误' : '在左侧编辑器中输入 TSX 代码，实时预览将在此处显示'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={previewRef}
      srcDoc={generateIframeContent}
      className={`w-full h-full border-none rounded-lg ${className}`}
      title="TSX Preview"
      sandbox="allow-scripts"
    />
  );
};

export default CodePreview;