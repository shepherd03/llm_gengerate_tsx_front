/**
 * 默认的TSX示例代码
 * 展示TypeScript接口、React组件、状态管理和Tailwind CSS样式
 */
export const DEFAULT_TSX_CODE = `interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105';
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function MyComponent() {
  const [count, setCount] = React.useState<number>(0);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  return (
    <div className={\`min-h-screen p-8 transition-colors duration-300 \${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }\`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            TSX + Tailwind 示例
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            支持TypeScript类型和Tailwind CSS样式
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            点击次数: <span className="text-blue-500">{count}</span>
          </p>
          
          <div className="space-y-3">
            <Button onClick={() => setCount(count + 1)}>
              增加计数 (+1)
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={() => setCount(Math.max(0, count - 1))}
            >
              减少计数 (-1)
            </Button>
            
            <Button 
              variant={theme === 'light' ? 'primary' : 'secondary'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              切换主题 ({theme === 'light' ? '🌙' : '☀️'})
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          这是一个使用TSX语法和Tailwind CSS的动态组件
        </div>
      </div>
    </div>
  );
}`;

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
}`
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
}`
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
}`
  }
};

export default DEFAULT_TSX_CODE;