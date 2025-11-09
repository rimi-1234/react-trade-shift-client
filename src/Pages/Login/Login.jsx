import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login | ToyVerse");
  const [show, setShow] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState("");

  const { signInWithEmailAndPasswordFunc, signInWithGoogleFunc, setUser, user, setLoading } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
    const [Error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    
        if (!passwordRegex.test(password)) {
          toast.error("Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.");
          setError('Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.')
          return;
        }
        setError('');
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("LogIn successful");
        navigate(from, { replace: true });

      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false);
      });
  };


  const handleGoogleSignin = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("Google Sign-in successful!");
      })
      .catch((e) => {
     
        toast.error(e.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl bg-base-100 py-6 px-4 sm:px-6 rounded-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSignin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label flex justify-items-start font-semibold text-base-content">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmailInputValue(e.target.value)}
              className="input input-bordered w-full text-base-content placeholder-base-content/50"
              required
            />
          </div>

          {/* Password */}
             <div className="relative">
                   <label className="label flex justify-items-start font-semibold text-base-content">
                     Password
                   </label>
                   <input
                     type={show ? "text" : "password"}
                     name="password"
                     placeholder="Enter your password"
                     className="input input-bordered w-full pr-10 text-base-content placeholder-base-content/50"
                     required
                   />
                   <span
                     onClick={() => setShow((prev) => !prev)}
                     className="absolute right-[8px] top-[40px]  transform -translate-y-[20%] cursor-pointer text-base-content/70 hover:text-primary transition-colors z-10"
                   >
                     {show ? <FaEye /> : <IoEyeOff />}
                   </span>
                 </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link className="link text-secondary hover:text-primary text-sm sm:text-base"  to="/auth/forgot-password"
  state={{ email: emailInputValue }} >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full mt-2 sm:mt-4">
            Login
          </button>
             {Error && <p className="text-xs text-error">{Error}</p>}

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-px w-16 sm:w-20 bg-base-content/20"></div>
            <span className="text-sm sm:text-base text-base-content/50">or</span>
            <div className="h-px w-16 sm:w-20 bg-base-content/20"></div>
          </div>

          {/* Google Signin */}
          <button onClick={handleGoogleSignin}
            type="button"
            className="flex items-center justify-center gap-3 w-full py-2 sm:py-3 px-5 bg-pink-100 text-gray-800 rounded-lg font-semibold hover:bg-pink-200 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center font-semibold mt-5 text-sm sm:text-base text-base-content">
            Don’t have an account?{" "}
            <Link className="text-secondary hover:text-primary font-bold" to="/auth/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default Login;
