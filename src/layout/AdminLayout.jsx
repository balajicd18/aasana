// src/layouts/AdminLayout.jsx
import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';


const AdminLayout = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true }); // Redirect to login if no token
    }
  }, [navigate]);
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className='bg-[#ED7D7D] min-h-[100vh] w-72 hidden md:block text-white'>
        <Sidebar />
      </aside>
      <main className="flex-1 bg-[#f0f3fb] min-h-screen p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
