import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Reimbursement from './pages/Reimbursement';
import Accounting from './pages/Accounting';
import Payroll from './pages/Payroll';
import SocialInsurance from './pages/SocialInsurance';
import Tax from './pages/Tax';
import AIAssistant from './pages/AIAssistant';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import Login from './pages/Login';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="reimbursement" element={<Reimbursement />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="social-insurance" element={<SocialInsurance />} />
        <Route path="tax" element={<Tax />} />
        <Route path="ai" element={<AIAssistant />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;