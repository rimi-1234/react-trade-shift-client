import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaUserShield } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login | TradeShift");
  const [show, setShow] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState(""); // Added state for password

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

  // --- Auto-fill Function ---
  const handleDemoLogin = () => {
    const demoEmail = "zfarhana156@gmail.com";
    const demoPass = "123@Abc";
    
    setEmailInputValue(demoEmail);
    setPasswordInputValue(demoPass);
    toast.info("Credentials auto-filled!");
  };

  const handleSignin = (e) => {
    e.preventDefault();
    // Use state values directly to ensure auto-fill works correctly
    const email = emailInputValue;
    const password = passwordInputValue;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    
    if (!passwordRegex.test(password)) {
      const errMsg = "Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.";
      toast.error(errMsg);
      setError(errMsg);
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
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
          role: 'trader',
          createdAt: new Date().toISOString()
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then(res => res.json())
          .then(data => {
            setUser(result.user);
            setLoading(false);
            toast.success("Google Sign-in successful!");
            navigate(from, { replace: true });
          })
          .catch(error => {
            setUser(result.user);
            setLoading(false);
          });
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center pt-24 sm:pt-52 md:pt-52 lg:pt-40 items-center min-h-screen bg-base-200 px-4 pb-10">
      <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl bg-base-100 py-6 px-4 sm:px-6 rounded-lg border border-primary/10">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary mb-2">
          Login to your account
        </h2>
        <p className="text-center text-base-content/60 text-sm mb-6">Welcome back! Please enter your details.</p>

        {/* --- Demo Credential Button --- */}
        <div className="mb-6 p-3 bg-primary/5 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FaUserShield />
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase">Quick Access</p>
              <p className="text-[10px] text-base-content/70">Login with Demo Admin account</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-sm btn-primary btn-outline normal-case rounded-lg"
          >
            Fill Credentials
          </button>
        </div>

        <form onSubmit={handleSignin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label font-semibold text-base-content">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={emailInputValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
              className="input input-bordered w-full text-base-content placeholder-base-content/30 focus:border-primary transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label font-semibold text-base-content">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={passwordInputValue}
              onChange={(e) => setPasswordInputValue(e.target.value)}
              className="input input-bordered w-full pr-10 text-base-content placeholder-base-content/30 focus:border-primary transition-all"
              required
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-[50px] cursor-pointer text-base-content/50 hover:text-primary transition-colors z-10"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          <div className="text-right">
            <Link className="link link-primary no-underline text-xs sm:text-sm font-medium" to="/auth/forgot-password">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full shadow-lg shadow-primary/20">
            Login
          </button>
          {Error && <p className="text-xs text-error font-medium mt-1">⚠️ {Error}</p>}

          <div className="divider text-base-content/30 text-xs">OR</div>

          {/* Google Signin */}
          <button onClick={handleGoogleSignin}
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 px-5 border border-base-content/10 bg-base-100 text-base-content rounded-lg font-semibold hover:bg-base-200 transition-all duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center font-medium mt-6 text-sm text-base-content">
            Don’t have an account?{" "}
            <Link className="text-primary hover:underline font-bold" to="/auth/register">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;