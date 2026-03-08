import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, DollarSign, Users, Check, Download, RefreshCw } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { payrollAPI } from '@/services/api';
import type { PayrollBatch } from '@/types';

const Payroll = () => {
  const [payrollBatches, setPayrollBatches] = useState<PayrollBatch[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['payrollBatches', page, pageSize, searchTerm],
    queryFn: () => payrollAPI.list(page, pageSize).then(res => res.data),
  });

  // Calculate mutation
  const calculateMutation = useMutation({
    mutationFn: (batchId: string) => payrollAPI.calculate(batchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payrollBatches'] });
    },
  });

  // Confirm mutation
  const confirmMutation = useMutation({
    mutationFn: (batchId: string) => payrollAPI.confirm(batchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payrollBatches'] });
    },
  });

  useEffect(() => {
    if (data?.data) {
      setPayrollBatches(data.data);
    }
  }, [data]);

  // Mock data for demo
  const [mockPayrollBatches] = useState<PayrollBatch[]>([
    {
      id: '1',
      month: '2024-03',
      totalGrossSalary: 1250000,
      socialInsurance: 280000,
      tax: 95000,
      totalNetSalary: 875000,
      employeeCount: 50
    },
    {
      id: '2',
      month: '2024-02',
      totalGrossSalary: 1150000,
      socialInsurance: 260000,
      tax: 97000,
      totalNetSalary: 793000,
      employeeCount: 48
    },
    {
      id: '3',
      month: '2024-01',
      totalGrossSalary: 1100000,
      socialInsurance: 250000,
      tax: 98000,
      totalNetSalary: 752000,
      employeeCount: 47
    },
  ]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setPage(1);
  };

  const handleCreateBatch = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    if (window.confirm(`确定要创建${currentMonth}月的工资批次吗？`)) {
      // payrollAPI.createBatch(currentMonth);
      alert('工资批次创建成功');
    }
  };

  const handleCalculate = (batchId: string) => {
    if (window.confirm('确定要计算该批次工资吗？')) {
      calculateMutation.mutate(batchId);
    }
  };

  const handleConfirm = (batchId: string) => {
    if (window.confirm('确定要确认该批次工资吗？确认后将无法修改！')) {
      confirmMutation.mutate(batchId);
    }
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">工资管理</h1>
          <p className="text-gray-600 mt-1">管理月度工资批次与员工工资计算</p>
        </div>
        <button
          onClick={handleCreateBatch}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">创建工资批次</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索月份</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索月份 (如: 2024-03)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              搜索
            </button>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              重置
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm text-gray-500">共 {mockPayrollBatches.length} 个工资批次</span>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工资批次</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">员工数量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">应发工资</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社保成本</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">代扣个税</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实发工资</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockPayrollBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Calendar size={20} className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{batch.month}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {batch.month.split('-')[0]}年{batch.month.split('-')[1]}月
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{batch.employeeCount} 人</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{formatCurrency(batch.totalGrossSalary)}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-blue-500" />
                      <span className="text-sm text-gray-900">{formatCurrency(batch.socialInsurance)}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-red-500" />
                      <span className="text-sm text-gray-900">{formatCurrency(batch.tax)}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-green-500" />
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(batch.totalNetSalary)}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        to={`/payroll/batches/${batch.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        查看明细
                      </Link>
                      <button
                        onClick={() => handleCalculate(batch.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                      >
                        <RefreshCw size={16} />
                        <span>计算</span>
                      </button>
                      <button
                        onClick={() => handleConfirm(batch.id)}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-900"
                      >
                        <Check size={16} />
                        <span>确认</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Data */}
        {mockPayrollBatches.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">暂无工资批次</h3>
            <p className="text-gray-500 mb-4">请点击上方按钮创建新的工资批次</p>
            <button
              onClick={handleCreateBatch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              创建工资批次
            </button>
          </div>
        )}

        {/* Pagination */}
        {mockPayrollBatches.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              显示第 1 到 {mockPayrollBatches.length} 条，共 {mockPayrollBatches.length} 个批次
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700">{page}</span>
              <button
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;