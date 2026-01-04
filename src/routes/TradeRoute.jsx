import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import useRole from '../hooks/useRole';

const TradeRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    // 1. Wait for Auth and Role checks to finish
    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    // 2. Check if user exists AND is a trader
    if (user && role === 'trader') {
        return children;
    }

    // 3. If not a trader, kick them back to login or home
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default TradeRoute;