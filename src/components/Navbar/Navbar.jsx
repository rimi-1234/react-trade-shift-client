import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import userIcon from "../../assets/user.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signoutUserFunc, loading } = useContext(AuthContext);

  const handleLogOut = () => {
    signoutUserFunc()
      .then(() => toast.success("Logout Successful!"))
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] z-50 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl transition-all duration-500">
      <div className="flex flex-wrap items-center justify-between md:justify-between py-3 px-4 sm:px-6 lg:px-8 gap-3">
        {/* Left: Logo + Navigation */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold text-primary drop-shadow-md"
          >
            TradeShift
          </Link>

          {/* Desktop + Tablet Links */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            {links.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-normal transition-all ${
                    isActive
                      ? "bg-[#00AEEF] text-white shadow-md"
                      : "text-gray-500 hover:bg-[#00AEEF]/20 hover:text-[#00AEEF]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: User/Login */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto">
          {loading ? (
            <div className="flex items-center gap-2 text-primary">
              <span className="loading loading-spinner loading-md"></span>
              <p className="text-xs sm:text-sm md:text-base">Loading...</p>
            </div>
          ) : user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || userIcon}
                  alt="User"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-transparent hover:border-primary cursor-pointer transition-all duration-300"
                />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 sm:mb-2 bg-primary text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleLogOut}
                className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold shadow-md transition duration-200 text-xs sm:text-sm md:text-base"
              >
                LogOut
              </button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold shadow-md transition duration-200 text-xs sm:text-sm md:text-base"
            >
              Login 
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-3xl font-bold text-primary ml-auto"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-white/40 backdrop-blur-md border-t border-white/20 flex flex-col items-center p-4 gap-4 rounded-b-2xl">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `w-full text-center px-4 py-2 font-normal transition-all rounded-lg ${
                  isActive
                    ? "bg-[#00AEEF] text-white shadow-md"
                    : "text-gray-500 hover:bg-[#00AEEF]/20 hover:text-[#00AEEF]"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={handleLogOut}
              className="w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold shadow-md"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="w-full text-center px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold shadow-md"
              onClick={() => setIsOpen(false)}
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
