import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';

import Loading from '../components/Loading/Loading';
import { AuthContext } from '../Context/AuthContext';

const PrivateRouter = ({ children }) => {

    
    const { user, loading } = use(AuthContext);

    
    //   console.log(user);
    const location = useLocation();


    if (loading) {
        return <Loading></Loading>;
    }
    console.log(user);
    

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={{ from: location }} replace to="/auth/login"></Navigate>;
};

export default PrivateRouter;