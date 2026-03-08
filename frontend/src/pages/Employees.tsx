import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Users, Calendar, DollarSign, Check, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { employeesAPI } from '@/services/api';
import type { Employee } from '@/types';

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['employees', page, pageSize, searchTerm, departmentFilter, statusFilter],
    queryFn: () => employeesAPI.list(page, pageSize, searchTerm).then(res => res.data),
  });

  useEffect(() => {
    if (data?.data) {
      setEmployees(data.data);
    }
  }, [data]);

  // Mock data for demo
  const [mockEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: '张三',
      department: '技术部',
      position: '前端工程师',
      hireDate: '2022-01-15',
      salaryStructure: { base: 15000, performance: 3000, bonus: 0, subsidies: 1000 },
      socialInsuranceStatus: '正常参保',
      status: '在职',
    },
    {
      id: '2',
      name: '李四',
      department: '财务部',
      position: '会计',
      hireDate: '2021-03-22',
      salaryStructure: { base: 12000, performance: 2000, bonus: 500, subsidies: 800 },
      socialInsuranceStatus: '正常参保',
      status: '在职',
    },
    {
      id: '3',
      name: '王五',
      department: '人力资源部',
      position: 'HR专员',
      hireDate: '2023-05-10',
      salaryStructure: { base: 10000, performance: 1500, bonus: 0, subsidies: 800 },
      socialInsuranceStatus: '正常参保',
      status: '在职',
    },
    {
      id: '4',
      name: '赵六',
      department: '技术部',
      position: '后端工程师',
      hireDate: '2020-09-01',
      salaryStructure: { base: 18000, performance: 4000, bonus: 1000, subsidies: 1000 },
      socialInsuranceStatus: '正常参保',
      status: '在职',
    },
  ]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setStatusFilter('');
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">员工管理</h1>
          <p className="text-gray-600 mt-1">管理公司员工信息与薪资结构</p>
        </div>
        <Link
          to="/employees/new"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">新增员工</span>
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
                placeholder="搜索员工姓名"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">部门筛选</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">所有部门</option>
              <option value="技术部">技术部</option>
              <option value="财务部">财务部</option>
              <option value="人力资源部">人力资源部</option>
              <option value="市场部">市场部</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">所有状态</option>
              <option value="在职">在职</option>
              <option value="离职">离职</option>
              <option value="试用期">试用期</option>
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
            <span className="text-sm text-gray-500">共 {mockEmployees.length} 名员工</span>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">员工信息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门/岗位</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">入职时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工资结构</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社保状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                    <div className="text-sm text-gray-500">{employee.position}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{employee.hireDate}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <div className="text-sm text-gray-900">
                        基本工资: ¥{employee.salaryStructure.base.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      绩效: ¥{employee.salaryStructure.performance} | 补贴: ¥{employee.salaryStructure.subsidies}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-900">{employee.socialInsuranceStatus}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === '在职'
                        ? 'bg-green-100 text-green-800'
                        : employee.status === '离职'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        to={`/employees/${employee.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        查看
                      </Link>
                      <Link
                        to={`/employees/${employee.id}/edit`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        编辑
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        禁用
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Data */}
        {mockEmployees.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">暂无员工数据</h3>
            <p className="text-gray-500 mb-4">请点击上方按钮新增员工</p>
            <Link
              to="/employees/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              新增员工
            </Link>
          </div>
        )}

        {/* Pagination */}
        {mockEmployees.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              显示第 1 到 {mockEmployees.length} 条，共 {mockEmployees.length} 条
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

export default Employees;