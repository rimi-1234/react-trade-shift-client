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
    { path: "/my-exports", label: "My Exports" },
    ...(user
      ? [
          { path: "/my-imports", label: "My Imports" },
          { path: "/add-export", label: "Add Export" },
        ]
      : []),
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-50 backdrop-blur-md border rounded-2xl shadow-xl transition-all duration-500 bg-white/30 dark:bg-gray-800/70 border-white/40 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex flex-wrap items-center justify-between py-3 px-4 sm:px-6 lg:px-8 gap-2">
        {/* Left: Logo + Navigation */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-white"
          >
            TradeShift
          </Link>

          {/* Navigation Links (tablet+desktop) */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm md:text-base font-normal transition-all ${
                    isActive
                      ? "bg-[#00AEEF] text-white shadow-md"
                      : "hover:bg-[#00AEEF]/20 hover:text-white text-gray-700 dark:text-gray-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Theme + User (tablet+desktop) */}
        <div className="sm:flex hidden flex-wrap justify-center md:justify-end items-center gap-4 mt-2 md:mt-0">
          <Switch
            checked={theme === "light"}
            onChange={(e) => handleTheme(!e.target.checked)}
          />
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="relative group">
                <img
                  src={user?.photoURL || userIcon}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary cursor-pointer transition"
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Login/Register
            </Link>
          )}
        </div>

        {/* Mobile / Tablet Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-3xl font-bold text-gray-900 dark:text-white p-2"
        >
          ☰
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center gap-2 p-4 bg-white/40 dark:bg-gray-800/80 rounded-b-2xl border-t border-white/30 dark:border-gray-700">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-full text-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#00AEEF] text-white"
                    : "hover:bg-[#00AEEF]/20 text-gray-800 dark:text-gray-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Switch
            checked={theme === "light"}
            onChange={(e) => handleTheme(!e.target.checked)}
          />

          {user ? (
            <div className="flex flex-col items-center gap-2 mt-2 w-full">
              <img
                src={user?.photoURL || userIcon}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm text-white bg-blue-500 px-3 py-1 rounded">
                {user.displayName}
              </span>
              <button
                onClick={handleLogOut}
                className="w-full px-4 py-2 rounded-lg font-semibold bg-primary hover:bg-primary/90 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-lg font-semibold bg-primary hover:bg-primary/90 text-white"
            >
             Login/Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
