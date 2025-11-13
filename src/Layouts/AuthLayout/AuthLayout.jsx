import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const AuthLayout = () => {
    return (
        <div className="bg-base-200 min-h-screen">
            <header className="w-11/12 mx-auto py-4">
                <Navbar></Navbar>
            </header>
            <main className="w-11/12 mx-auto py-5">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;