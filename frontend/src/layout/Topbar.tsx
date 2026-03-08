import { useState } from 'react';
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Menu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New reimbursement', message: 'John submitted a new reimbursement', time: '10 minutes ago' },
    { id: 2, title: 'Payroll ready', message: 'March payroll has been calculated', time: '1 hour ago' },
    { id: 3, title: 'Tax deadline', message: 'Monthly tax filing deadline is approaching', time: '3 hours ago' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            <button className="p-2 rounded-md">
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees, reimbursements..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">John Smith</span>
            </button>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={() => navigate('/settings')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={18} className="text-gray-600" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={18} className="text-gray-600" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;