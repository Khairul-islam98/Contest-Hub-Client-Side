import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Fotter';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;