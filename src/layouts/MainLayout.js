
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />


      <main className="ml-20 w-full px-4 sm:px-8 py-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
