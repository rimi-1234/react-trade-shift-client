import React, { useEffect } from 'react';
import errorImg from '../../assets/error-404.png'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';
import useTitle from '../../hooks/useTitle';



const ErrorPages = () => {
    
    useTitle("ErrorPages | ToyVerse");
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);


    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <img
                src={errorImg}  // your error image in `public/` folder
                alt="Error"
                className="w-96 h-96 mb-6"
            />
            <h2 className="text-5xl font-bold  mb-2">Oops, page not found!</h2>
            <p className="text-gray-500 text-xl py-2">The page you are looking for is not available.</p>
            <button onClick={() => navigate(-1)} className="btn mr-3 mt-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white"><span></span>Go Back!</button>
        </div>
    );
};

export default ErrorPages;