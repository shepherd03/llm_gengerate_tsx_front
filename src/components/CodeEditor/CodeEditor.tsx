import React from 'react';
import { Editor, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

// 配置Monaco Editor加载器
loader.config({ monaco });

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: 'vs-dark' | 'light' | 'vs';
  height?: string | number;
  readOnly?: boolean;
  className?: string;
  fontSize?: number;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'typescriptreact',
  theme = 'light',
  height = '100%',
  readOnly = false,
  className = '',
  fontSize = 14
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Editor
        height={height}
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme={theme}
        options={{
          fontSize,
          fontFamily: 'Monaco, Menlo, "Fira Code", monospace',
          lineHeight: 1.5,
          tabSize: 2,
          automaticLayout: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          readOnly,
          formatOnPaste: true,
          formatOnType: true,
          bracketPairColorization: { enabled: true },
          padding: { top: 8, bottom: 8 },
          // 隐藏滚动条但保持滚动功能
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 0,
            verticalSliderSize: 0,
            horizontalSliderSize: 0
          }
        }}
        onMount={(editor: any, monaco: any) => {
          // 配置TypeScript和JSX语言支持以确保代码高亮
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.Latest,
            jsx: monaco.languages.typescript.JsxEmit.React,
            allowJs: true,
            esModuleInterop: true
          });
        }}
      />
    </div>
  );
};

export default CodeEditor;