import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Switch from "../Switch/Switch";
import userIcon from "../../assets/user.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signoutUserFunc, loading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogOut = () => {
    signoutUserFunc()
      .then(() => setIsOpen(false))
      .catch((error) => console.error(error));
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-products", label: "All Products" },
    { path: "/about", label: "About" },
    { path: "/insights", label: "Insights" },
    { path: "/contact", label: "Contact" },
   
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-50 backdrop-blur-md border rounded-2xl shadow-xl transition-all duration-500 bg-white/70 dark:bg-base-100/70 border-white/40 dark:border-white/10 text-base-content">
      <div className="flex items-center justify-between py-3 px-4 sm:px-8">
        
        {/* Left: Logo + Desktop Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tight text-primary">
            TradeShift
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg"
                      : "hover:bg-primary/10 text-base-content"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Theme + User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
             <Switch checked={theme === "light"} onChange={(e) => handleTheme(!e.target.checked)} />
          </div>

          {loading ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : user ? (
            /* --- ADVANCED DROPDOWN MENU --- */
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || userIcon} alt="Avatar" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300">
                <li className="menu-title text-primary">{user.displayName}</li>
                <li><Link to="/dashboard" className="justify-between">Dashboard <span className="badge badge-primary badge-outline text-[10px]">New</span></Link></li>
                <li><Link to="/dashboard/profile">Profile Settings</Link></li>
                <hr className="my-2 border-base-300" />
                <li><button onClick={handleLogOut} className="text-error font-bold">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-primary btn-sm md:btn-md rounded-lg text-white">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden btn btn-ghost btn-sm text-2xl">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden p-4 bg-base-100/95 border-t border-base-300 rounded-b-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-center font-semibold ${
                    isActive ? "bg-primary text-white" : "bg-base-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex justify-between items-center bg-base-200 p-4 rounded-xl mt-2">
              <span className="text-sm font-medium">Dark Mode</span>
              <Switch checked={theme === "light"} onChange={(e) => handleTheme(!e.target.checked)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;