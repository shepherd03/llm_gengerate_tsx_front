import React from 'react';
import { GlassPanel } from '../Common/GlassContainer';

interface StatisticalAnalysisProps {
  title: string;
  data: any[];
  source?: string;
  className?: string;
}

/**
 * 统计分析组件
 * 用于显示statistical_analysis类型的数据
 */
const StatisticalAnalysisComponent: React.FC<StatisticalAnalysisProps> = ({
  title,
  data,
  source,
  className = ''
}) => {
  const displayData = data.slice(0, 10); // 显示前10条
  const totalCount = data.length;

  // 计算统计信息
  const getStatistics = () => {
    if (data.length === 0) return null;

    const numericColumns = Object.keys(data[0]).filter(key => {
      return typeof data[0][key] === 'number';
    });

    return numericColumns.map(column => {
      const values = data.map(item => item[column]).filter(val => typeof val === 'number');
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = values.length > 0 ? sum / values.length : 0;
      const max = Math.max(...values);
      const min = Math.min(...values);

      return {
        column,
        sum: sum.toFixed(2),
        avg: avg.toFixed(2),
        max: max.toFixed(2),
        min: min.toFixed(2),
        count: values.length
      };
    });
  };

  const statistics = getStatistics();

  return (
    <GlassPanel className={`p-4 mb-4 ${className}`}>
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-sm text-gray-600">
          统计分析结果 - 共 <span className="font-medium text-blue-600">{totalCount}</span> 条数据
        </div>
        {source && (
          <div className="text-xs text-gray-500 mt-1">
            生成脚本: {source}
          </div>
        )}
      </div>

      {/* 统计摘要 */}
      {statistics && statistics.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">统计摘要</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white p-2 rounded border">
                <div className="font-medium text-gray-700">{stat.column}</div>
                <div className="text-gray-600">
                  总计: {stat.sum} | 平均: {stat.avg} | 最大: {stat.max} | 最小: {stat.min}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 数据表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {displayData.length > 0 && Object.keys(displayData[0]).map((key) => (
                <th key={key} className="text-left py-2 px-3 font-medium text-gray-700 bg-gray-50">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                {Object.values(item).map((value, valueIndex) => (
                  <td key={valueIndex} className="py-2 px-3 text-gray-800">
                    {typeof value === 'number' ? Number(value).toFixed(2) : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalCount > 10 && (
        <div className="mt-3 text-xs text-gray-500 text-center">
          显示前 10 条，还有 {totalCount - 10} 条数据
        </div>
      )}
    </GlassPanel>
  );
};

export default StatisticalAnalysisComponent;