import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, Calendar, DollarSign, Building, Phone, Mail, IDCard, Bank, Check, X, ArrowLeft, Edit, Print, Download } from 'lucide-react';
import { employeesAPI } from '@/services/api';
import type { Employee } from '@/types';

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('profile');

  const { data, isLoading, error } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeesAPI.get(id!).then(res => res.data),
  });

  // Mock employee data
  const employee: Employee = {
    id: '1',
    name: '张三',
    department: '技术部',
    position: '前端工程师',
    hireDate: '2022-01-15',
    salaryStructure: {
      base: 15000,
      performance: 3000,
      bonus: 0,
      subsidies: 1000
    },
    socialInsuranceStatus: '正常参保',
    status: '在职'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/employees"
            className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">员工详情</h1>
            <p className="text-gray-600 mt-1">查看与编辑员工完整信息</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to={`/employees/${employee.id}/edit`}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit size={20} />
            <span className="font-medium">编辑员工</span>
          </Link>
        </div>
      </div>

      {/* Employee Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Users size={40} className="text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Building size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">{employee.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">前端工程师</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${employee.status === '在职'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.status === '在职' ? <Check size={14} /> : <X size={14} />}
                    <span>{employee.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              个人信息
            </button>
            <button
              onClick={() => setActiveTab('salary')}
              className={`px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'salary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              工资结构
            </button>
            <button
              onClick={() => setActiveTab('socialInsurance')}
              className={`px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'socialInsurance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              社保信息
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'payroll'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              工资记录
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                      <p className="text-sm text-gray-900">{employee.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">部门</label>
                      <p className="text-sm text-gray-900">{employee.department}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">岗位</label>
                      <p className="text-sm text-gray-900">{employee.position}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">入职日期</label>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <p className="text-sm text-gray-900">{employee.hireDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">工作状态</label>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === '在职'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {employee.status === '在职' ? <Check size={14} /> : <X size={14} />}
                        <span className="ml-1">{employee.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">联系方式</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-400" />
                        <p className="text-sm text-gray-900">13800138000</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-400" />
                        <p className="text-sm text-gray-900">zhangsan@company.com</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">身份证号码</label>
                      <div className="flex items-center space-x-2">
                        <IDCard size={16} className="text-gray-400" />
                        <p className="text-sm text-gray-900">11010119900101****</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">银行卡号</label>
                      <div className="flex items-center space-x-2">
                        <Bank size={16} className="text-gray-400" />
                        <p className="text-sm text-gray-900">622202************7890</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'salary' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">工资结构</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3">固定收入</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">基本工资</span>
                        <span className="text-sm font-medium text-gray-900">¥{employee.salaryStructure.base.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">绩效工资</span>
                        <span className="text-sm font-medium text-gray-900">¥{employee.salaryStructure.performance.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">住房补贴</span>
                        <span className="text-sm font-medium text-gray-900">¥{employee.salaryStructure.subsidies.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3">可变收入</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">季度奖金</span>
                        <span className="text-sm font-medium text-gray-900">¥0</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">年终奖金</span>
                        <span className="text-sm font-medium text-gray-900">¥0</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">其他补贴</span>
                        <span className="text-sm font-medium text-gray-900">¥0</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">应发工资总额</span>
                    <span className="text-lg font-bold text-gray-900">
                      ¥{(employee.salaryStructure.base + employee.salaryStructure.performance + employee.salaryStructure.subsidies).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-3">社保扣除</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">养老保险</span>
                      <span className="text-sm font-medium text-gray-900">¥{Math.round(employee.salaryStructure.base * 0.08).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">医疗保险</span>
                      <span className="text-sm font-medium text-gray-900">¥{Math.round(employee.salaryStructure.base * 0.02).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">失业保险</span>
                      <span className="text-sm font-medium text-gray-900">¥{Math.round(employee.salaryStructure.base * 0.003).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-3">个税扣除</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">专项扣除</span>
                      <span className="text-sm font-medium text-gray-900">¥{Math.round(employee.salaryStructure.base * 0.05).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">个税</span>
                      <span className="text-sm font-medium text-gray-900">¥{(employee.salaryStructure.base > 5000 ? 100 : 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">实发工资</span>
