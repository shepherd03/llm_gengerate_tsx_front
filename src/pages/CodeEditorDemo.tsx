import React, { useState, useEffect } from 'react';
import CodeEditorPanel from '../components/CodeEditorPanel';
import CodePreviewPanel from '../components/CodePreviewPanel';
import { useCodeCompiler } from '../utils/useCodeCompiler';
import { DEFAULT_TSX_CODE } from '../utils/defaultCode';

/**
 * 优化后的动态代码编辑器页面
 * 采用组件化架构：
 * - 左侧：代码编辑面板
 * - 右侧：实时预览面板
 * - 使用自定义Hook管理编译状态
 * - 组件化的错误处理和状态显示
 */
const CodeEditorDemo: React.FC = () => {
  const [code, setCode] = useState('');

  // 使用编译器Hook管理编译状态
  const {
    compiledCode,
    error,
    isCompiling,
    compile,
    clearError
  } = useCodeCompiler({
    debounceMs: 100,
    autoCompile: true
  });

  // 初始化默认代码
  useEffect(() => {
    if (!code) {
      setCode(DEFAULT_TSX_CODE);
    }
  }, [code]);

  // 处理代码变化
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // 自动编译（通过Hook的防抖机制）
    compile(newCode);
  };

  // 初始编译
  useEffect(() => {
    if (code) {
      compile(code);
    }
  }, [code, compile]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 主要内容区域 - 左右分栏 */}
      <div className="flex-1 flex p-6 gap-6 overflow-hidden">
        {/* 左侧：代码编辑面板 */}
        <CodeEditorPanel
          value={code}
          onChange={handleCodeChange}
          error={error}
          className="w-1/2"
          title="代码编辑器"
          subtitle="TSX + TypeScript"
        />

        {/* 右侧：预览面板 */}
        <CodePreviewPanel
          compiledCode={compiledCode}
          error={error}
          isCompiling={isCompiling}
          className="w-1/2"
          title="实时预览"
        />
      </div>
    </div>
  );
};

export default CodeEditorDemo;