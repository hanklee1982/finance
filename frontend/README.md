# Finance AI - Frontend

企业财务数字人系统前端应用

## 快速开始

### 安装依赖
```bash
cd frontend
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5173

### 生产构建
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **TailwindCSS** - 样式框架
- **React Router** - 路由管理
- **React Query** - 数据请求
- **Axios** - HTTP客户端
- **Recharts** - 图表库
- **Lucide React** - 图标库

## 项目结构

```
frontend/
├── src/
│   ├── components/       # 通用组件
│   ├── pages/            # 页面组件
│   ├── layout/           # 布局组件
│   ├── services/         # API服务
│   ├── hooks/            # 自定义Hooks
│   ├── types/            # TypeScript类型定义
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 应用入口
│   ├── main.tsx          # 渲染入口
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── index.html           # HTML模板
├── vite.config.ts       # Vite配置
├── tailwind.config.js   # Tailwind配置
├── tsconfig.json        # TypeScript配置
└── package.json         # 项目配置
```

## 页面功能

### 1. Dashboard
- 财务数据概览
- KPI指标卡片
- 趋势图表
- 待处理任务

### 2. Employees
- 员工列表管理
- 新增/编辑员工
- 员工详情查看

### 3. Reimbursement
- 报销单列表
- 提交新报销
- 审批状态跟踪

### 4. Accounting
- 凭证管理
- 查看凭证明细
- 确认入账

### 5. Payroll
- 工资批次管理
- 员工工资表
- 社保个税计算

### 6. Social Insurance
- 社保测算工具
- 多城市多档次支持
- 费用明细展示

### 7. Tax
- 个税计算器
- 专项扣除配置
- 计算明细说明

### 8. Tax Filing
- 税务申报任务
- 状态跟踪
- 历史记录

### 9. AI Assistant
- 自然语言交互
- 财务数据查询
- 智能分析

### 10. Audit Logs
- 操作日志记录
- 搜索与筛选
- 详情查看

## 开发规范

### 代码风格
- 使用TypeScript强类型
- 函数式编程风格
- 组件单一职责原则
- 语义化命名

### 提交规范
- `feat:` 添加新功能
- `fix:` 修复bug
- `refactor:` 代码重构
- `docs:` 文档更新
- `style:` 样式调整
- `test:` 测试相关

### Git分支
- `main` 主分支
- `develop` 开发分支
- `feature/*` 功能分支
- `hotfix/*` 紧急修复分支

## 环境变量

```env
VITE_API_URL=http://localhost:3000/api
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## License

MIT