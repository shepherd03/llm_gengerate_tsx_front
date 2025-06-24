import React from 'react';
import { GlassPanel } from '../Common/GlassContainer';

interface DataDisplayProps {
  title: string;
  data: any[];
  className?: string;
}

/**
 * 数据展示组件
 * 用于显示data_display类型的数据
 */
const DataDisplayComponent: React.FC<DataDisplayProps> = ({ title, data, className = '' }) => {
  const displayData = data.slice(0, 10); // 只显示前10条
  const totalCount = data.length;

  return (
    <GlassPanel className={`p-4 mb-4 ${className}`}>
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-sm text-gray-600">
          共 <span className="font-medium text-blue-600">{totalCount}</span> 条数据，显示前 {Math.min(10, totalCount)} 条
        </div>
      </div>

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
                    {String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalCount > 10 && (
        <div className="mt-3 text-xs text-gray-500 text-center">
          还有 {totalCount - 10} 条数据未显示
        </div>
      )}
    </GlassPanel>
  );
};

export default DataDisplayComponent;