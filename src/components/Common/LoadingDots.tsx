import React from 'react';

interface LoadingDotsProps {
    /** 自定义类名 */
    className?: string;
    /** 点的大小 */
    size?: 'sm' | 'md' | 'lg';
    /** 点的颜色 */
    color?: 'blue' | 'purple' | 'gray';
}

/**
 * 三个小点循环动画
 */
const LoadingDots: React.FC<LoadingDotsProps> = ({
    className = '',
    size = 'md',
    color = 'blue'
}) => {
    const sizeClasses = {
        sm: 'w-1 h-1',
        md: 'w-2 h-2',
        lg: 'w-3 h-3'
    };

    const colorClasses = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        gray: 'bg-gray-500'
    };

    const dotClass = `${sizeClasses[size]} ${colorClasses[color]} rounded-full`;

    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            <div
                className={`${dotClass} animate-pulse`}
                style={{
                    animationDelay: '0ms',
                    animationDuration: '1.4s'
                }}
            />
            <div
                className={`${dotClass} animate-pulse`}
                style={{
                    animationDelay: '200ms',
                    animationDuration: '1.4s'
                }}
            />
            <div
                className={`${dotClass} animate-pulse`}
                style={{
                    animationDelay: '400ms',
                    animationDuration: '1.4s'
                }}
            />
        </div>
    );
};

export default LoadingDots;