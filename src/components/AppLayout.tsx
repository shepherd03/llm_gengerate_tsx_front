import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 应用布局组件
 * 提供统一的背景和基础布局结构
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col ${className}`}>
      {children}
    </div>
  );
};

export default AppLayout;