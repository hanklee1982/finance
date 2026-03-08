// User & Authentication
export interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Dashboard
export interface DashboardStats {
  totalSalary: number;
  socialInsuranceCost: number;
  taxAmount: number;
  pendingReimbursements: number;
  pendingTaxTasks: number;
  laborCost: number;
  monthOverMonthChange: number;
}

export interface KpiCard {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

// Employee
export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  hireDate: string;
  salaryStructure: {
    base: number;
    performance: number;
    bonus: number;
    subsidies: number;
  };
  socialInsuranceStatus: string;
  status: string;
}

// Reimbursement
export interface Reimbursement {
  id: string;
  employeeName: string;
  amount: number;
  category: string;
  submitDate: string;
  status: string;
  description?: string;
}

// Accounting
export interface Voucher {
  id: string;
  voucherNumber: string;
  date: string;
  summary: string;
  debit: number;
  credit: number;
  status: string;
}

// Payroll
export interface PayrollBatch {
  id: string;
  month: string;
  totalGrossSalary: number;
  socialInsurance: number;
  tax: number;
  totalNetSalary: number;
  employeeCount: number;
}

export interface PayrollItem {
  id: string;
  employeeName: string;
  baseSalary: number;
  performancePay: number;
  bonus: number;
  subsidies: number;
  socialInsurance: number;
  tax: number;
  netSalary: number;
}

// Social Insurance
export interface SocialInsuranceInput {
  salary: number;
  city: string;
  level: string;
}

export interface SocialInsuranceResult {
  baseAmount: number;
  pension: { company: number; personal: number };
  medical: { company: number; personal: number };
  unemployment: { company: number; personal: number };
  injury: { company: number; personal: number };
  maternity: { company: number; personal: number };
  total: { company: number; personal: number };
}

// Tax
export interface TaxInput {
  salary: number;
  specialDeductions: number;
  additionalDeductions: {
    children: number;
    education: number;
    housing: number;
    elderly: number;
    medical: number;
  };
}

export interface TaxResult {
  taxableIncome: number;
  taxAmount: number;
  cumulativeTax: number;
  taxBracket: string;
  details: any[];
}

// Tax Filing
export interface TaxFilingTask {
  id: string;
  type: 'individual' | 'company';
  period: string;
  status: 'pending' | 'submitted' | 'completed';
  amount: number;
  deadline: string;
}

// AI Assistant
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

// Audit Logs
export interface AuditLog {
  id: string;
  operator: string;
  operationType: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

// API Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}