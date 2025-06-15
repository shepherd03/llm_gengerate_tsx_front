import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

interface CompilerResult {
  success: boolean;
  code?: string;
  error?: string;
}

interface UseCodeCompilerOptions {
  debounceMs?: number;
  autoCompile?: boolean;
}

interface UseCodeCompilerReturn {
  compiledCode: string;
  error: string | null;
  isCompiling: boolean;
  compile: (code: string) => void;
  clearError: () => void;
}

/**
 * 代码编译器Hook
 * 管理TSX代码的编译状态和逻辑
 */
export const useCodeCompiler = ({
  debounceMs = 500,
  autoCompile = true
}: UseCodeCompilerOptions = {}): UseCodeCompilerReturn => {
  const [compiledCode, setCompiledCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const debounceTimerRef = useRef<number | null>(null);
  const compileRequestIdRef = useRef(0);

  // Babel配置（使用useMemo避免重复创建）
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

  // 编译函数
  const compileInternal = useCallback(async (code: string): Promise<CompilerResult> => {
    if (!code.trim()) {
      setCompiledCode('');
      setError(null);
      setIsCompiling(false);
      return { success: true, code: '' };
    }

    const requestId = ++compileRequestIdRef.current;
    setIsCompiling(true);
    setError(null);

    try {
      // 模拟异步编译过程
      await new Promise(resolve => setTimeout(resolve, 100));

      // 检查请求是否已过期
      if (requestId !== compileRequestIdRef.current) {
        return { success: false, error: '编译请求已取消' };
      }

      if (typeof window === 'undefined' || !(window as any).Babel) {
        throw new Error('Babel未加载，无法编译TSX代码');
      }

      const result = (window as any).Babel.transform(code, babelConfig);
      const compiled = result.code;

      // 再次检查请求是否已过期
      if (requestId === compileRequestIdRef.current) {
        setCompiledCode(compiled);
        setError(null);
        setIsCompiling(false);
      }

      return { success: true, code: compiled };
    } catch (err: any) {
      const errorMessage = err.message || '编译失败';

      // 检查请求是否已过期
      if (requestId === compileRequestIdRef.current) {
        setError(errorMessage);
        setCompiledCode('');
        setIsCompiling(false);
      }

      return { success: false, error: errorMessage };
    }
  }, [babelConfig]);

  // 同步编译函数（供外部调用）
  const compile = useCallback((code: string) => {
    compileInternal(code);
  }, [compileInternal]);

  // 防抖编译函数
  const debouncedCompile = useCallback((code: string) => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    // 立即设置编译状态，提供即时反馈
    if (code.trim()) {
      setIsCompiling(true);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      compileInternal(code);
    }, debounceMs);
  }, [compileInternal, debounceMs]);

  // 清除错误
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    compiledCode,
    error,
    isCompiling,
    compile: autoCompile ? debouncedCompile : compile,
    clearError
  };
};

export default useCodeCompiler;