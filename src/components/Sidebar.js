
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaTachometerAlt,
  FaWrench,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-20 bg-black text-white flex flex-col justify-between items-center py-6 z-50 shadow-lg">

      <nav className="flex flex-col items-center gap-8 mt-4">
        <SidebarIcon icon={<FaHome size={22} />} to="/home" title="Home" />
        <SidebarIcon icon={<FaTachometerAlt size={22} />} to="/dashboard" title="Dashboard" />
        <SidebarIcon icon={<FaWrench size={22} />} to="/customize" title="Customize" />
      </nav>

      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-600 transition-transform transform hover:scale-110"
          title="Logout"
        >
          <FaSignOutAlt size={22} />
        </button>
      </div>
    </aside>
  );
};

const SidebarIcon = ({ icon, to, title }) => (
  <Link
    to={to}
    title={title}
    className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
  >
    {icon}
  </Link>
);

export default Sidebar;
