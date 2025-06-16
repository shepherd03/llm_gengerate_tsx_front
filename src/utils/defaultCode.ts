/**
 * 默认的TSX示例代码
 * 展示TypeScript接口、React组件、状态管理和Tailwind CSS样式
 */
export const DEFAULT_TSX_CODE = `function MyComponent() {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = React.useState<any>();

  React.useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      setChartInstance(chart);

      const option = {
        title: {
          text: 'Sample Chart',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        series: [
          {
            name: 'Sales',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#0077e6' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
      <div ref={chartRef} className="w-full h-80"></div>
    </div>
  );
}

export default MyComponent;`;

/**
 * 其他示例代码模板
 */
export const CODE_TEMPLATES = {
  basic: {
    name: '基础组件',
    description: '简单的React组件示例',
    code: `function MyComponent() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Hello, TSX!
      </h1>
      <p className="text-gray-600">
        这是一个基础的TSX组件
      </p>
    </div>
  );
}

export default MyComponent;`
  },

  interactive: {
    name: '交互组件',
    description: '包含状态和事件处理的组件',
    code: `function MyComponent() {
  const [message, setMessage] = React.useState('点击按钮改变我！');
  const [count, setCount] = React.useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    setMessage(\`你已经点击了 \${count + 1} 次！\`);
  };
  
  return (
    <div className="p-8 text-center space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        交互式组件
      </h1>
      <p className="text-lg text-blue-600">{message}</p>
      <button 
        onClick={handleClick}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        点击我 ({count})
      </button>
    </div>
  );
}

export default MyComponent;`
  },

  form: {
    name: '表单组件',
    description: '包含表单输入和验证的组件',
    code: `function MyComponent() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h2 className="text-xl font-bold mb-2">提交成功！</h2>
          <p>姓名: {name}</p>
          <p>邮箱: {email}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        用户信息表单
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            邮箱
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          提交
        </button>
      </form>
    </div>
  );
}

export default MyComponent;`
  },

  echarts: {
    name: 'ECharts图表',
    description: '使用ECharts创建交互式图表',
    code: `function MyComponent() {
  const [chartType, setChartType] = React.useState('bar');
  
  // 柱状图配置
  const barOption = {
    title: {
      text: '销售数据统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '销售额',
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      itemStyle: {
        color: '#3b82f6'
      }
    }]
  };
  
  // 饼图配置
  const pieOption = {
    title: {
      text: '产品占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '产品',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '产品A' },
        { value: 735, name: '产品B' },
        { value: 580, name: '产品C' },
        { value: 484, name: '产品D' },
        { value: 300, name: '产品E' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  
  // 折线图配置
  const lineOption = {
    title: {
      text: '趋势分析',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '访问量',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#10b981'
      }
    }]
  };
  
  const getOption = () => {
    switch(chartType) {
      case 'pie': return pieOption;
      case 'line': return lineOption;
      default: return barOption;
    }
  };
  
  return (
    <div className="p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ECharts 图表示例
        </h1>
        <div className="space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={\`px-4 py-2 rounded-lg transition-colors \${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}\`}
          >
            柱状图
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={\`px-4 py-2 rounded-lg transition-colors \${chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}\`}
          >
            饼图
          </button>
          <button
            onClick={() => setChartType('line')}
            className={\`px-4 py-2 rounded-lg transition-colors \${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}\`}
          >
            折线图
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4">
        <ReactECharts
          option={getOption()}
          style={{ height: '400px', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        点击上方按钮切换不同类型的图表
      </div>
    </div>
  );
}

export default MyComponent;`
  }
};

export default DEFAULT_TSX_CODE;