import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Switch from "../Switch/Switch";
import userIcon from "../../assets/user.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signoutUserFunc, loading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Update HTML theme and localStorage
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Theme toggle handler
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // Logout handler
  const handleLogOut = () => {
    signoutUserFunc()
      .then(() => setIsOpen(false))
      .catch((error) => console.error(error));
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/all-products", label: "All Products" },
    { path: "/my-exports", label: "My Exports" },
    { path: "/my-imports", label: "My Imports" },
    { path: "/add-export", label: "Add Export" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] z-50 backdrop-blur-md border rounded-2xl shadow-xl transition-all duration-500 bg-white/30 dark:bg-gray-800/70 border-white/40 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex flex-wrap items-center justify-between py-3 px-4 sm:px-6 lg:px-8 gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-md text-primary dark:text-white"
        >
          TradeShift
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-3">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-normal transition-all ${
                  isActive
                    ? "bg-[#00AEEF] text-white shadow-md"
                    : "hover:bg-[#00AEEF]/20 hover:text-white text-gray-700 dark:text-gray-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* User & Theme */}
        <div className="hidden sm:flex items-center gap-3">
          <Switch
            checked={theme === "light"}
            onChange={(e) => handleTheme(!e.target.checked)}
          />

          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* Avatar with Tooltip */}
              <div className="relative group">
                <img
                  src={user?.photoURL || userIcon}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary cursor-pointer transition"
                />
                <span className="absolute bottom-full left-1/2 -top-6  -translate-x-1/2 mb-2
                                  text-gray-600 text-sm md:text-base font-semibold
                                 px-3 py-1 rounded shadow-lg
                                 opacity-0 group-hover:opacity-100
                                 transition-opacity duration-300 whitespace-nowrap">
                  {user.displayName}
                </span>
              </div>

              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                LogOut
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-3xl font-bold ml-auto"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center p-4 gap-3 rounded-b-2xl border-t bg-white/40 dark:bg-gray-800/80 border-white/30 dark:border-gray-700 text-gray-900 dark:text-white">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `w-full text-center px-4 py-2 font-normal transition-all rounded-lg ${
                  isActive
                    ? "bg-[#00AEEF] text-white shadow-md"
                    : "hover:bg-[#00AEEF]/20 hover:text-white text-gray-700 dark:text-gray-200"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Theme Switch in Mobile */}
          <div className="w-full flex justify-center">
            <Switch
              checked={theme === "light"}
              onChange={(e) => handleTheme(!e.target.checked)}
            />
          </div>

          {/* User/Login in Mobile */}
          {user ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex flex-col items-center gap-1">
                <img
                  src={user?.photoURL || userIcon}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-transparent cursor-pointer"
                />
                <span className="text-sm md:text-base font-semibold text-white bg-blue-500 px-3 py-1 rounded shadow-lg">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleLogOut}
                className="w-full px-4 py-2 rounded-lg font-semibold bg-primary hover:bg-primary/90 text-white"
              >
                LogOut
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-lg font-semibold bg-primary hover:bg-primary/90 text-white"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
