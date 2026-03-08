import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, FileText, DollarSign, User, Calendar, Check, X, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reimbursementsAPI } from '@/services/api';
import type { Reimbursement } from '@/types';

const Reimbursement = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['reimbursements', page, pageSize, searchTerm, statusFilter, categoryFilter],
    queryFn: () => reimbursementsAPI.list(page, pageSize, statusFilter).then(res => res.data),
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => reimbursementsAPI.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reimbursements'] });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: (id: string) => reimbursementsAPI.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reimbursements'] });
    },
  });

  useEffect(() => {
    if (data?.data) {
      setReimbursements(data.data);
    }
  }, [data]);

  // Mock data for demo
  const [mockReimbursements] = useState<Reimbursement[]>([
    {
      id: '1',
      employeeName: '张三',
      amount: 1256.50,
      category: '差旅费',
      submitDate: '2024-03-08 09:30',
      status: '待审批',
      description: '客户拜访差旅费用'
    },
    {
      id: '2',
      employeeName: '李四',
      amount: 890.00,
      category: '办公费',
      submitDate: '2024-03-07 14:20',
      status: '已通过',
      description: '办公用品采购'
    },
    {
      id: '3',
      employeeName: '王五',
      amount: 567.80,
      category: '招待费',
      submitDate: '2024-03-06 11:15',
      status: '已驳回',
      description: '客户招待费用'
    },
    {
      id: '4',
      employeeName: '赵六',
      amount: 2345.00,
      category: '差旅费',
      submitDate: '2024-03-05 16:45',
      status: '待审批',
      description: '项目出差费用'
    },
    {
      id: '5',
      employeeName: '钱七',
      amount: 432.75,
      category: '通讯费',
      submitDate: '2024-03-04 08:30',
      status: '已通过',
      description: '手机通讯补贴'
    },
  ]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    setPage(1);
  };

  const handleApprove = (id: string) => {
    if (window.confirm('确定要审批通过这条报销单吗？')) {
      approveMutation.mutate(id);
    }
  };

  const handleReject = (id: string) => {
    if (window.confirm('确定要驳回这条报销单吗？')) {
      rejectMutation.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待审批':
        return 'bg-yellow-100 text-yellow-800';
      case '已通过':
        return 'bg-green-100 text-green-800';
      case '已驳回':
        return 'bg-red-100 text-red-800';
      case '已付款':
        return 'bg-blue-100 text-blue-800';
      case '已记账':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '待审批':
        return <Clock size={16} />;
      case '已通过':
        return <Check size={16} />;
      case '已驳回':
        return <X size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">报销管理</h1>
          <p className="text-gray-600 mt-1">管理员工报销申请与审批流程</p>
        </div>
        <Link
          to="/reimbursements/new"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">新建报销</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索报销单或员工"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">所有状态</option>
              <option value="待审批">待审批</option>
              <option value="已通过">已通过</option>
              <option value="已驳回">已驳回</option>
              <option value="已付款">已付款</option>
              <option value="已记账">已记账</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">类别筛选</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">所有类别</option>
              <option value="差旅费">差旅费</option>
              <option value="办公费">办公费</option>
              <option value="招待费">招待费</option>
              <option value="通讯费">通讯费</option>
              <option value="交通费">交通费</option>
              <option value="福利费">福利费</option>
            </select>
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
            <span className="text-sm text-gray-500">共 {mockReimbursements.length} 条报销单</span>
          </div>
        </div>
      </div>

      {/* Reimbursement Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">报销单信息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockReimbursements.map((reimbursement) => (
                <tr key={reimbursement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <FileText size={20} className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">#{reimbursement.id.padStart(8, '0')}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {reimbursement.category} - {reimbursement.description || '无备注'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{reimbursement.employeeName}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-green-500" />
                      <span className="text-sm font-bold text-gray-900">¥{reimbursement.amount.toLocaleString()}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{reimbursement.submitDate}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reimbursement.status)}`}
                    >
                      {getStatusIcon(reimbursement.status)}
                      <span className="ml-1">{reimbursement.status}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        to={`/reimbursements/${reimbursement.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        查看
                      </Link>
                      {reimbursement.status === '待审批' && (
                        <> 

