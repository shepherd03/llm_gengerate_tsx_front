import React from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  variant?: 'light' | 'medium' | 'strong' | 'ultra';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'glass' | 'glass-strong';
  border?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onHover?: boolean;
}

/**
 * 通用毛玻璃容器组件
 * 提供多种毛玻璃效果变体，统一管理所有容器的视觉效果
 */
const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  variant = 'medium',
  rounded = 'xl',
  shadow = 'glass',
  border = true,
  className = '',
  style,
  onClick,
  onHover = false
}) => {
  // 毛玻璃效果变体
  const glassVariants = {
    light: 'bg-white/5 backdrop-blur-sm',
    medium: 'bg-white/10 backdrop-blur-md',
    strong: 'bg-white/15 backdrop-blur-lg',
    ultra: 'bg-white/20 backdrop-blur-xl'
  };

  // 圆角变体
  const roundedVariants = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  };

  // 阴影变体
  const shadowVariants = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    glass: 'shadow-glass',
    'glass-strong': 'shadow-glass-strong'
  };

  // 边框样式
  const borderClass = border ? 'border border-white/20' : '';

  // 悬停效果
  const hoverClass = onHover ? 'transform hover:scale-[1.02] transition-all duration-300' : '';

  // 点击效果
  const clickableClass = onClick ? 'cursor-pointer active:scale-[0.98]' : '';

  // 组合所有样式类
  const combinedClasses = [
    glassVariants[variant],
    roundedVariants[rounded],
    shadowVariants[shadow],
    borderClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={combinedClasses}
      style={{
        WebkitBackdropFilter: 'blur(20px)',
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassContainer;

// 预设的常用组合
export const GlassCard: React.FC<Omit<GlassContainerProps, 'variant' | 'rounded' | 'shadow'>> = (props) => (
  <GlassContainer variant="medium" rounded="xl" shadow="glass" {...props} />
);

export const GlassPanel: React.FC<Omit<GlassContainerProps, 'variant' | 'rounded' | 'shadow'>> = (props) => (
  <GlassContainer variant="strong" rounded="2xl" shadow="glass-strong" {...props} />
);

export const GlassButton: React.FC<Omit<GlassContainerProps, 'variant' | 'rounded' | 'shadow' | 'onHover'>> = (props) => (
  <GlassContainer variant="light" rounded="lg" shadow="md" onHover={true} {...props} />
);

export const GlassModal: React.FC<Omit<GlassContainerProps, 'variant' | 'rounded' | 'shadow'>> = (props) => (
  <GlassContainer variant="ultra" rounded="2xl" shadow="glass-strong" {...props} />
);