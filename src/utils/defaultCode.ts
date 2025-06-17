/**
 * 默认的TSX示例代码
 * 展示TypeScript接口、React组件、状态管理和Tailwind CSS样式
 */
export const DEFAULT_TSX_CODE = `function MyComponent() { 
   const chartRef = React.useRef(null); 
   React.useEffect(() => { 
     if (!chartRef.current) return; 
     const chart = echarts.init(chartRef.current); 
     const option = { 
       title: { 
         text: '2022年邯郸市的缺陷电线杆分布', 
         left: 'center', 
         textStyle: { fontFamily: 'Segoe UI', fontSize: 18 } 
       }, 
       tooltip: { trigger: 'axis' }, 
       legend: { 
         data: ['断裂数', '倾斜数', '腐蚀数', '总缺陷数'], 
         top: 40, 
         textStyle: { fontFamily: 'Segoe UI' } 
       }, 
       toolbox: { 
         feature: { 
           saveAsImage: {}, 
           magicType: { type: ['line', 'bar', 'stack'] } 
         }, 
         top: 40, 
         right: 20 
       }, 
       grid: { top: 100, bottom: 100, left: 60, right: 60 }, 
       xAxis: { 
         type: 'category', 
         data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], 
         axisLabel: { fontFamily: 'Segoe UI' } 
       }, 
       yAxis: { type: 'value', axisLabel: { fontFamily: 'Segoe UI' } }, 
       dataZoom: [{ type: 'slider' }], 
       series: [ 
         { 
           name: '断裂数', 
           type: 'line', 
           smooth: true, 
           data: [12, 15, 8, 22, 18, 25, 30, 28, 20, 16, 10, 5], 
           areaStyle: { opacity: 0.4 }, 
           lineStyle: { width: 3 } 
         }, 
         { 
           name: '倾斜数', 
           type: 'line', 
           smooth: true, 
           data: [8, 10, 12, 15, 20, 18, 22, 25, 18, 12, 8, 4], 
           areaStyle: { opacity: 0.4 }, 
           lineStyle: { width: 3 } 
         }, 
         { 
           name: '腐蚀数', 
           type: 'line', 
           smooth: true, 
           data: [5, 8, 10, 12, 15, 20, 25, 22, 18, 15, 12, 8], 
           areaStyle: { opacity: 0.4 }, 
           lineStyle: { width: 3 } 
         }, 
         { 
           name: '总缺陷数', 
           type: 'line', 
           smooth: true, 
           data: [25, 33, 30, 49, 53, 63, 77, 75, 56, 43, 30, 17], 
           lineStyle: { type: 'dashed', width: 3 } 
         } 
       ] 
     }; 
     chart.setOption(option); 
     return () => chart.dispose(); 
   }, []); 
 
   return <div style={{ padding: '16px', width: '100%', height: '100%' }}> 
     <div ref={chartRef} style={{ width: '100%', height: '100%', background: 'white' }} /> 
   </div>; 
 } 
 export default MyComponent;`;

export default DEFAULT_TSX_CODE;