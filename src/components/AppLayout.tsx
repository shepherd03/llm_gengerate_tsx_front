import React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useApiService } from '../utils/useApiService';

interface AppLayoutProps {
  className?: string;
}

/**
 * 应用布局组件
 * 提供统一的背景和基础布局结构，集成路由导航
 */
const AppLayout: React.FC<AppLayoutProps> = ({ className = '' }) => {
  const location = useLocation();
  const { isOnline } = useApiService();

  // 根据当前路径确定页面类型
  const getCurrentPage = () => {
    if (location.pathname.includes('/editor')) {
      return 'editor';
    }
    if (location.pathname.includes('/onestop')) {
      return 'onestop';
    }
    if (location.pathname.includes('/analysis')) {
      return 'analysis';
    }
    return 'chat';
  };

  return (
    <div className={`h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col ${className}`}>
      <AppHeader
        currentPage={getCurrentPage()}
        isOnline={isOnline}
      />
      <Outlet />
    </div>
  );
};

export default AppLayout;