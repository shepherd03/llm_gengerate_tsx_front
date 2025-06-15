import React, { useCallback, useMemo } from 'react';

interface CompilerResult {
  success: boolean;
  code?: string;
  error?: string;
}

interface TsxCompilerProps {
  onCompile: (result: CompilerResult) => void;
}

export interface TsxCompilerRef {
  compile: (tsxCode: string) => CompilerResult;
}

/**
 * TSX编译器组件
 * 负责将TSX代码编译为可执行的JavaScript代码
 */
export const TsxCompiler = React.forwardRef<TsxCompilerRef, TsxCompilerProps>(
  ({ onCompile }, ref) => {
    // Babel配置
    const babelConfig = useMemo(() => ({
      presets: [
        ['react', { runtime: 'classic' }],
        ['typescript', {
          isTSX: true,
          allExtensions: true,
          allowNamespaces: true
        }],
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        ['transform-typescript', { isTSX: true }]
      ],
      filename: 'component.tsx'
    }), []);

    // 编译TSX代码
    const compile = useCallback((tsxCode: string): CompilerResult => {
      try {
        if (typeof window === 'undefined' || !(window as any).Babel) {
          const error = 'Babel未加载，无法编译TSX代码';
          onCompile({ success: false, error });
          return { success: false, error };
        }

        const result = (window as any).Babel.transform(tsxCode, babelConfig);
        const compiledCode = result.code;

        onCompile({ success: true, code: compiledCode });
        return { success: true, code: compiledCode };
      } catch (err: any) {
        const error = err.message || '编译失败';
        onCompile({ success: false, error });
        return { success: false, error };
      }
    }, [babelConfig, onCompile]);

    // 暴露编译方法
    React.useImperativeHandle(ref, () => ({
      compile
    }), [compile]);

    return null; // 这是一个逻辑组件，不渲染UI
  }
);

TsxCompiler.displayName = 'TsxCompiler';

export default TsxCompiler;