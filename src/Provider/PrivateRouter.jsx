import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../components/Loading/Loading';

const PrivateRouter = ({ children }) => {
    const { user, loading } = use(AuthContext);
    //   console.log(user);
    const location = useLocation();


    if (loading) {
        return <Loading></Loading>;
    }

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={{ from: location }} replace to="/auth/login"></Navigate>;
};

export default PrivateRouter;