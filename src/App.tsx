import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/**
 * 应用根组件
 * 使用React Router进行路由管理
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
