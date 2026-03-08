import axios from 'axios';
import type {
  User,
  Employee,
  Reimbursement,
  Voucher,
  PayrollBatch,
  PayrollItem,
  SocialInsuranceInput,
  SocialInsuranceResult,
  TaxInput,
  TaxResult,
  TaxFilingTask,
  ChatMessage,
  AuditLog,
  DashboardStats,
  PaginatedResponse,
  ApiResponse,
} from '@/types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (username: string, password: string) =>
    api.post<ApiResponse<User>>('/auth/login', { username, password }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get<ApiResponse<User>>('/auth/profile'),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),
};

// Employees API
export const employeesAPI = {
  list: (page = 1, pageSize = 10, search?: string) =>
    api.get<PaginatedResponse<Employee>>('/employees', {
      params: { page, pageSize, search },
    }),
  get: (id: string) => api.get<ApiResponse<Employee>>(`/employees/${id}`),
  create: (data: Partial<Employee>) =>
    api.post<ApiResponse<Employee>>('/employees', data),
  update: (id: string, data: Partial<Employee>) =>
    api.put<ApiResponse<Employee>>(`/employees/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/employees/${id}`),
};

// Reimbursements API
export const reimbursementsAPI = {
  list: (page = 1, pageSize = 10, status?: string) =>
    api.get<PaginatedResponse<Reimbursement>>('/reimbursements', {
      params: { page, pageSize, status },
    }),
  get: (id: string) => api.get<ApiResponse<Reimbursement>>(`/reimbursements/${id}`),
  create: (data: Partial<Reimbursement>) =>
    api.post<ApiResponse<Reimbursement>>('/reimbursements', data),
  update: (id: string, data: Partial<Reimbursement>) =>
    api.put<ApiResponse<Reimbursement>>(`/reimbursements/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/reimbursements/${id}`),
  approve: (id: string, comment?: string) =>
    api.post<ApiResponse>(`/reimbursements/${id}/approve`, { comment }),
  reject: (id: string, comment?: string) =>
    api.post<ApiResponse>(`/reimbursements/${id}/reject`, { comment }),
};

// Accounting API
export const accountingAPI = {
  list: (page = 1, pageSize = 10, status?: string) =>
    api.get<PaginatedResponse<Voucher>>('/vouchers', {
      params: { page, pageSize, status },
    }),
  get: (id: string) => api.get<ApiResponse<Voucher>>(`/vouchers/${id}`),
  create: (data: Partial<Voucher>) =>
    api.post<ApiResponse<Voucher>>('/vouchers', data),
  update: (id: string, data: Partial<Voucher>) =>
    api.put<ApiResponse<Voucher>>(`/vouchers/${id}`, data),
  confirm: (id: string) => api.post<ApiResponse>(`/vouchers/${id}/confirm`),
};

// Payroll API
export const payrollAPI = {
  list: (page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<PayrollBatch>>('/payroll/batches', {
      params: { page, pageSize },
    }),
  get: (id: string) => api.get<ApiResponse<PayrollBatch>>(`/payroll/batches/${id}`),
  getItems: (batchId: string, page = 1, pageSize = 10) =>
    api.get<PaginatedResponse<PayrollItem>>(`/payroll/batches/${batchId}/items`, {
      params: { page, pageSize },
    }),
  createBatch: (month: string) =>
    api.post<ApiResponse<PayrollBatch>>('/payroll/batches', { month }),
  calculate: (batchId: string) =>
    api.post<ApiResponse>(`/payroll/batches/${batchId}/calculate`),
  confirm: (batchId: string) =>
    api.post<ApiResponse>(`/payroll/batches/${batchId}/confirm`),
};

// Social Insurance API
export const socialInsuranceAPI = {
  calculate: (data: SocialInsuranceInput) =>
    api.post<ApiResponse<SocialInsuranceResult>>('/social-insurance/calculate', data),
  getCities: () => api.get<ApiResponse<string[]>>('/social-insurance/cities'),
};

// Tax API
export const taxAPI = {
  calculate: (data: TaxInput) =>
    api.post<ApiResponse<TaxResult>>('/tax/calculate', data),
  getFilingTasks: (type?: string, status?: string) =>
    api.get<PaginatedResponse<TaxFilingTask>>('/tax/filing-tasks', {
      params: { type, status },
    }),
  generateFilingData: (period: string, type: string) =>
    api.post<ApiResponse>(`/tax/filing/${period}/generate`, { type }),
  submitFiling: (period: string, type: string) =>
    api.post<ApiResponse>(`/tax/filing/${period}/submit`, { type }),
};

// AI Assistant API
export const aiAPI = {
  chat: (message: string, history?: ChatMessage[]) =>
    api.post<ApiResponse<ChatMessage>>('/ai/chat', { message, history }),
  getHistory: () => api.get<ApiResponse<ChatMessage[]>>('/ai/history'),
  clearHistory: () => api.post('/ai/clear'),
};

// Audit Logs API
export const logsAPI = {
  list: (page = 1, pageSize = 10, operator?: string) =>
    api.get<PaginatedResponse<AuditLog>>('/logs', {
      params: { page, pageSize, operator },
    }),
};

export default api;