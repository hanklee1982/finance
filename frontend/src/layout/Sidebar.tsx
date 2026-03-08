import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Book,
  DollarSign,
  Briefcase,
  FileDown,
  MessageSquare,
  Clock,
  Settings,
  Menu,
  X,
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { label: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { label: 'Reimbursement', icon: <FileText size={20} />, path: '/reimbursement' },
    { label: 'Accounting', icon: <Book size={20} />, path: '/accounting' },
    { label: 'Payroll', icon: <DollarSign size={20} />, path: '/payroll' },
    { label: 'Social Insurance', icon: <Briefcase size={20} />, path: '/social-insurance' },
    { label: 'Tax', icon: <FileDown size={20} />, path: '/tax' },
    { label: 'AI Assistant', icon: <MessageSquare size={20} />, path: '/ai' },
    { label: 'Logs', icon: <Clock size={20} />, path: '/logs' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === path) return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen">
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white border-r transition-transform duration-300 ease-in-out ${isActive}
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <DollarSign size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">FinanceAI</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${isActive(item.path)}
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div
                className={`${isActive(item.path)}
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-blue-600'
                }`}
              >
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">JS</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Smith</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;