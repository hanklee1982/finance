# Finance AI Agent System

## Overview
A comprehensive finance management system with AI assistant capabilities, including employee management, reimbursement, payroll, social insurance, tax calculation, and AI-powered financial assistance.

## Completed Modules

### Priority 1 (Core Business Modules)

#### Employee Management
- **API**: `GET /api/employees`, `POST /api/employees`, `PUT /api/employees/:id`, `DELETE /api/employees/:id`
- **Frontend**: `EmployeeList`, `EmployeeDetail`, `EmployeeCreate`, `EmployeeEdit`
- **Features**: Pagination, search, department filtering, employment status filtering

#### Reimbursement Management
- **API**: `GET /api/reimbursements`, `POST /api/reimbursements`, `PUT /api/reimbursements/:id`, `POST /api/reimbursements/:id/approve`
- **Frontend**: `ReimbursementList`, `ReimbursementCreate`, `ReimbursementDetail`
- **Features**: Attachment upload support

#### Payroll Management
- **API**: `POST /api/payroll/batch/create`, `GET /api/payroll/batch/list`, `GET /api/payroll/batch/:id`
- **Frontend**: `PayrollBatchList`, `PayrollBatchDetail`
- **Features**: Integrates with `socialInsuranceEngine` and `taxEngine` to calculate gross pay, social insurance, personal income tax, net pay, and company labor costs

### Priority 2 (Calculation Modules)

#### Social Insurance Calculation
- **Frontend**: `SocialInsurance` page
- **Features**: Input salary, city, insurance tier; outputs company contribution, personal contribution, and detailed insurance items

#### Personal Income Tax Calculation
- **Frontend**: `TaxCalculation` page
- **Features**: Input salary, special deductions, additional deductions; outputs tax rate, personal income tax, and detailed breakdown

### Priority 3 (AI Assistant)

#### AI Chat Assistant
- **Frontend**: `AIAssistant` page (similar to ChatGPT)
- **API**: `POST /api/ai/chat`
- **Features**: Uses VolcEngine model for financial data explanation, report summarization, and financial Q&A

### Priority 4 (Tax Filing)

#### Tax Filing Module
- **Features**: `TaxFilingTask` for monthly and quarterly tax filing
- **Output**: Generates filing data and export files (no real filing integration)

### Priority 5 (Audit Logs)

#### Audit Logs Page
- **Frontend**: `AuditLogs` page
- **Features**: Reads from `audit_logs` and displays operator, operation type, time, and details

## Technology Stack
- **Backend**: Node.js + Express
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **AI**: VolcEngine Large Model
- **Calculation Engines**: `socialInsuranceEngine`, `taxEngine`

## Development Status
✅ All modules completed and ready for review

## GitHub Repository
[https://github.com/hanklee1982/finance](https://github.com/hanklee1982/finance)