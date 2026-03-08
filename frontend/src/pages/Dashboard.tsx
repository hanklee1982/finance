import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { dashboardAPI } from '@/services/api';
import type { DashboardStats } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardAPI.getStats().then(res => res.data),
  });

  useEffect(() => {
    if (data?.data) {
      setStats(data.data);
    }
  }, [data]);

  // Mock data for demo
  const [kpiCards] = useState([
    { title: '本月工资总额', value: '¥1,250,000', change: 8.5, icon: <TrendingUp size={24} />, color: 'blue' },
    { title: '社保成本', value: '¥280,000', change: 5.2, icon: <TrendingUp size={24} />, color: 'green' },
    { title: '代扣个税', value: '¥95,000', change: -2.3, icon: <ArrowDownRight size={24} />, color: 'red' },
    { title: '待审批报销', value: '12', change: 3, icon: <AlertCircle size={24} />, color: 'yellow' },
    { title: '待处理税务', value: '3', change: 0, icon: <Calendar size={24} />, color: 'purple' },
    { title: '人工成本总额', value: '¥1,625,000', change: 6.8, icon: <ArrowUpRight size={24} />, color: 'indigo' },
  ]);

  const [monthlyData] = useState([
    { month: '1月', salary: 1100000, insurance: 260000, tax: 98000 },
    { month: '2月', salary: 1150000, insurance: 270000, tax: 97000 },
    { month: '3月', salary: 1250000, insurance: 280000, tax: 95000 },
  ]);

  const [reimbursementData] = useState([
    { category: '办公费', amount: 12000 },
    { category: '差旅费', amount: 25000 },
    { category: '招待费', amount: 8000 },
    { category: '交通费', amount: 6000 },
    { category: '通讯费', amount: 3000 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your financial overview for this month.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-${card.color}-100 text-${card.color}-600`}
              >
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {card.change > 0 ? (
                <ArrowUpRight size={16} className="text-green-500 mr-1" />
              ) : card.change < 0 ? (
                <ArrowDownRight size={16} className="text-red-500 mr-1" />
              ) : null}
              <span
                className={`text-sm font-medium ${card.change > 0
                  ? 'text-green-600'
                  : card.change < 0
                  ? 'text-red-600'
                  : 'text-gray-500'
                }`}
              >
                {card.change !== 0 ? `${Math.abs(card.change)}%` : '0%'} vs last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
              />
              <Bar dataKey="salary" fill="#3b82f6" name="工资" />
              <Bar dataKey="insurance" fill="#10b981" name="社保" />
              <Bar dataKey="tax" fill="#ef4444" name="个税" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Category Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">报销费用分布</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reimbursementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
              />
              <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">待处理任务</h2>
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">5 项任务</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">审批报销单 #20240301</p>
                <p className="text-sm text-gray-500">提交人: John Doe</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-800 rounded-full">待审批</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">确认3月工资批次</p>
                <p className="text-sm text-gray-500">包含: 50名员工</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-800 rounded-full">待确认</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">个税申报截止日期</p>
                <p className="text-sm text-gray-500">剩余: 3天</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-800 rounded-full">紧急</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;