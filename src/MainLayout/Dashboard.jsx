import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => { 
    return (
        <div className='relative min-h-screen md:flex'>
            {/* Sidebar Component */}
            <Sidebar />
            <div className='flex-1  md:ml-64'>
                <div className='p-5'>
                    {/* Outlet for dynamic contents */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;