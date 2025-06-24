import React from 'react';

interface WindowHeaderProps {
  title: string;
  subtitle?: string | React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'gradient';
  showDots?: boolean;
  customDots?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  headerClassName?: string;
  onTitleClick?: () => void;
  onSubtitleClick?: () => void;
  status?: 'default' | 'success' | 'warning' | 'error';
}

/**
 * 窗口头部组件
 * 统一的窗口头部样式，支持多种自定义参数
 * - 支持动态副标题内容（字符串或React节点）
 * - 支持自定义样式类名
 * - 支持点击事件处理
 * - 支持自定义圆点显示
 */
const WindowHeader: React.FC<WindowHeaderProps> = ({
  title,
  subtitle,
  actions,
  variant = 'default',
  showDots = false,
  customDots,
  titleClassName = '',
  subtitleClassName = '',
  headerClassName = '',
  onTitleClick,
  onSubtitleClick,
  status = 'default'
}) => {
  const baseClasses = "px-6 py-4 border-b border-white/30 rounded-t-2xl backdrop-blur-sm";
  const variantClasses = {
    default: "bg-gray-50 border-gray-200",
    gradient: "bg-gradient-to-r from-white/20 to-blue-50/30"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${headerClassName}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* 圆点区域 */}
          {showDots && (
            <div className="flex items-center space-x-2">
              {customDots ? (
                customDots
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </>
              )}
            </div>
          )}

          {/* 标题区域 */}
          <div className={`${showDots ? 'ml-4' : ''}`}>
            <span
              className={`text-sm font-semibold text-gray-700 ${onTitleClick ? 'cursor-pointer hover:text-gray-900' : ''} ${titleClassName}`}
              onClick={onTitleClick}
            >
              {title}
            </span>
            {subtitle && (
              <div className="flex items-center ml-2">
                {/* 状态指示器 */}
                {status !== 'default' && (
                  <div className={`w-2 h-2 rounded-full mr-2 ${status === 'success' ? 'bg-green-500' :
                    status === 'warning' ? 'bg-yellow-500' :
                      status === 'error' ? 'bg-red-500' : ''
                    }`}></div>
                )}
                <span
                  className={`text-xs ${status === 'success' ? 'text-green-600' :
                    status === 'warning' ? 'text-yellow-600' :
                      status === 'error' ? 'text-red-600' : 'text-gray-500'
                    } ${onSubtitleClick ? 'cursor-pointer hover:opacity-80' : ''} ${subtitleClassName}`}
                  onClick={onSubtitleClick}
                >
                  {subtitle}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 操作按钮区域 */}
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default WindowHeader;