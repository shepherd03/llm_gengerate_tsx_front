import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import ChatPage from '../pages/ChatPage';
import CodeEditorPreview from '../pages/CodeEditorPreview';
import DataAnalysisPage from '../pages/DataAnalysisPage';

/**
 * 应用路由配置
 * 使用React Router v6的createBrowserRouter创建路由
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'editor',
        element: <CodeEditorPreview />
      },
      {
        path: 'analysis',
        element: <DataAnalysisPage />
      }
    ]
  }
]);

export default router;