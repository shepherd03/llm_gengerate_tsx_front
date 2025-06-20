import React from 'react';

interface AppHeaderProps {
  currentPage: 'chat' | 'demo' | 'editor';
  onPageChange: (page: 'chat' | 'demo' | 'editor') => void;
  isOnline: boolean;
}

/**
 * 应用头部导航组件
 * 提供页面切换和状态显示功能
 */
const AppHeader: React.FC<AppHeaderProps> = ({ currentPage, onPageChange, isOnline }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'editor':
        return { 
          title: '动态代码编辑器', 
          subtitle: '在线编辑TSX代码并实时预览效果（支持 TypeScript + Tailwind CSS）' 
        };
      default:
        return { 
          title: 'TSX 代码生成器', 
          subtitle: '智能生成React TSX组件代码' 
        };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* 页面切换按钮 */}
          <div className="flex items-center space-x-2 bg-white/50 rounded-full p-1 backdrop-blur-sm">
            <button
              onClick={() => onPageChange('chat')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === 'chat'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              智能对话
            </button>
            <button
              onClick={() => onPageChange('editor')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === 'editor'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              代码编辑器
            </button>
          </div>

          {/* 状态指示器 */}
          <div className="flex items-center space-x-3 bg-white/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              isOnline ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-red-400 shadow-red-400/50'
            } shadow-lg`}></div>
            <span className={`text-sm font-medium ${
              isOnline ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {isOnline ? '服务正常' : '服务离线'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;