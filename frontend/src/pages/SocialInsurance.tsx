import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Calculator, DollarSign, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { socialInsuranceAPI } from '@/services/api';
import type { SocialInsuranceInput, SocialInsuranceResult } from '@/types';

const SocialInsurance = () => {
  const [input, setInput] = useState<SocialInsuranceInput>({
    salary: 15000,
    city: '深圳',
    level: '一档'
  });
  const [result, setResult] = useState<SocialInsuranceResult | null>(null);
  const [showDetails, setShowDetails] = useState(true);

  const calculateMutation = useMutation({
    mutationFn: (data: SocialInsuranceInput) => socialInsuranceAPI.calculate(data).then(res => res.data),
    onSuccess: (data) => {
      if (data.data) {
        setResult(data.data);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCalculate = () => {
    calculateMutation.mutate(input);
  };

  // Mock calculation for demo
  const mockCalculate = () => {
    const baseAmount = Math.max(2360, Math.min(input.salary, 33768));
    
    const result: SocialInsuranceResult = {
      baseAmount,
      pension: {
        company: Number((baseAmount * 0.14).toFixed(2)),
        personal: Number((baseAmount * 0.08).toFixed(2))
      },
      medical: {
        company: Number((baseAmount * 0.062).toFixed(2)),
        personal: Number((baseAmount * 0.02).toFixed(2))
      },
      unemployment: {
        company: Number((baseAmount * 0.007).toFixed(2)),
        personal: Number((baseAmount * 0.003).toFixed(2))
      },
      injury: {
        company: Number((baseAmount * 0.0014).toFixed(2)),
        personal: 0
      },
      maternity: {
        company: Number((baseAmount * 0.0045).toFixed(2)),
        personal: 0
      },
      total: {
        company: Number((
          baseAmount * 0.14 +
          baseAmount * 0.062 +
          baseAmount * 0.007 +
          baseAmount * 0.0014 +
          baseAmount * 0.0045
        ).toFixed(2)),
        personal: Number((
          baseAmount * 0.08 +
          baseAmount * 0.02 +
          baseAmount * 0.003
        ).toFixed(2))
      }
    };
    
    setResult(result);
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">社保测算</h1>
        <p className="text-gray-600 mt-1">计算员工社保缴费金额与公司成本</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">月工资</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign size={20} className="text-gray-400" />
              </div>
              <input
                type="number"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
                min="0"
                step="100"
                placeholder="输入月工资"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">范围: ¥2,360 - ¥33,768</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">城市</label>
            <select
              name="city"
              value={input.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="深圳">深圳</option>
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="广州">广州</option>
              <option value="杭州">杭州</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">社保档次</label>
            <select
              name="level"
              value={input.level}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="一档">一档</option>
              <option value="二档">二档</option>
              <option value="三档">三档</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={mockCalculate}
            disabled={calculateMutation.isPending}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Calculator size={20} />
            <span className="font-medium">开始测算</span>
          </button>
        </div>
      </div>

      {/* Result Summary */}
      {result && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">社保缴费基数</h3>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {input.city} - {input.level}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(result.baseAmount)}</div>
              <p className="text-sm text-gray-500 mt-2">
                基于工资 {formatCurrency(input.salary)} 计算
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">个人承担</h3>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(result.total.personal)}</div>
              <p className="text-sm text-gray-500 mt-2">
                每月从工资中扣除
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">公司承担</h3>
              <div className="text-3xl font-bold text-red-600">{formatCurrency(result.total.company)}</div>
              <p className="text-sm text-gray-500 mt-2">
                公司每月额外成本
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div
              className="flex items-center justify-between px-6 py-4 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <h3 className="text-lg font-semibold text-gray-900">各险种明细</h3>
              <button className="text-gray-500 hover:text-gray-700">
                {showDetails ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
            </div>

            {showDetails && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pension */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 font-bold">养</span>
                          </div>
                          <span className="font-medium text-gray-900">养老保险</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(result.pension.company + result.pension.personal)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">公司承担</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(result.pension.company)} (14%)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">个人承担</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(result.pension.personal)} (8%)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold">医</span>
                          </div>
                          <span className="font-medium text-gray-900">医疗保险</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(result.medical.company + result.medical.personal)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">公司承担</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(result.medical.company)} (6.2%)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">个人承担</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(result.medical.personal)} (2%)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Unemployment */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold">失</span>
                          </div>
                          <span className="font-medium text-gray-900">失业保险</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(result.unemployment.company + result.unemployment.personal)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">公司承担</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(result.unemployment.company)} (0.7%)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">个人承担</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(result.unemployment.personal)} (0.3%)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Injury */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold">工</span>
                          </div>
                          <span className="font-medium text-gray-900">工伤保险</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(result.injury.company)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(result.injury.company)} (0.14%) - 公司全额承担
                      </div>
                    </div>

                    {/* Maternity */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600 font-bold">生</span>
                          </div>
                          <span className="font-medium text-gray-900">生育保险</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(result.maternity.company)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(result.maternity.company)} (0.45%) - 公司全额承担
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="bg-blue-50 rounded-lg p-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">总费用</h3>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      月度总计
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
