import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useTitle from "../../hooks/useTitle";
import { motion } from "framer-motion";

const Register = () => {
  useTitle("Register | TradeShift");
  const navigate = useNavigate();
  const { createUserWithEmailAndPasswordFunc, setUser, updateProfileFunc, setLoading, user } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) { navigate(from, { replace: true }); }
  }, [user, navigate, from]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value; // Will be "trader" by default

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must have at least 1 uppercase, 1 lowercase, and 6+ characters.');
      return;
    }
    setError("");

    try {
      const res = await createUserWithEmailAndPasswordFunc(email, password);
      const firebaseUser = res.user;

      // 1. Update Firebase Profile (Local Auth State)
      await updateProfileFunc({ displayName: name, photoURL: photo });

      // 2. Prepare User Object for Database
      const dbUser = {
        name,
        email,
        image: photo,
        role: role, 
        createdAt: new Date().toISOString()
      };

      // 3. Save to MongoDB
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dbUser)
      });

      if (response.ok) {
        setUser({ ...firebaseUser, displayName: name, photoURL: photo });
        toast.success(`Welcome to TradeShift, ${name}! Registered as ${role}.`);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-50 dark:bg-[#020617] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-white dark:bg-slate-900 w-full max-w-xl shadow-2xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5"
      >
        <h2 className="text-center text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase italic">
          Join <span className="text-blue-600">TradeShift</span>
        </h2>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Full Name</label>
            <input name="name" type="text" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none" placeholder="Enter Full Name" required />
          </div>

          {/* Role Selection - Defaulted to Global Trader */}
          <div className="md:col-span-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Account Role</label>
            <select name="role" className="select select-bordered w-full bg-slate-50 dark:bg-slate-800 border-none font-bold text-blue-600" required defaultValue="trader">
              <option value="trader">Global Trader</option>
            
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Avatar URL</label>
            <input name="photo" type="text" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none" placeholder="https://image-link.com" required />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Business Email</label>
            <input name="email" type="email" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none" placeholder="trader@company.com" required />
          </div>

          <div className="md:col-span-2 relative">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Secure Password</label>
            <input type={show ? "text" : "password"} name="password" placeholder="••••••••" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none pr-12" required />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-[38px] text-slate-400 hover:text-blue-500 transition-colors">
              {show ? <FaEye /> : <IoEyeOff />}
            </button>
          </div>

          {error && <p className="md:col-span-2 text-[10px] text-red-500 font-bold uppercase text-center">{error}</p>}

          <button type="submit" className="md:col-span-2 btn btn-primary h-14 rounded-xl text-white font-black uppercase tracking-widest shadow-lg shadow-blue-500/30">
            Create Trader Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
           <p className="text-center font-medium text-slate-500 text-sm">
             Already part of the network? <Link className="font-black text-blue-600 uppercase tracking-tighter hover:underline" to="/auth/login">Login</Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;