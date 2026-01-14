import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl font-bold tracking-wide text-white hover:text-blue-100 transition duration-300"
            onClick={closeMenu}
          >
            ClinicPro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-700"
            >
              Home
            </Link>

            {user ? (
              <>
                {user.role === "doctor" && (
                  <Link
                    to="/doctor-profile"
                    className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-700"
                  >
                    My Profile
                  </Link>
                )}
                {user.role === "patient" && (
                  <Link
                    to="/patient-profile"
                    className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-700"
                  >
                    My Profile
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-blue-100 bg-blue-700 px-3 py-1 rounded-full">
                    {user.email} <span className="text-xs font-semibold">({user.role})</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-100 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
              aria-expanded="false"
              aria-label="Main menu"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-blue-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
            onClick={closeMenu}
          >
            Home
          </Link>

          {user ? (
            <>
              {user.role === "doctor" && (
                <Link
                  to="/doctor-profile"
                  className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
                  onClick={closeMenu}
                >
                  My Profile
                </Link>
              )}
              {user.role === "patient" && (
                <Link
                  to="/patient-profile"
                  className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
                  onClick={closeMenu}
                >
                  My Profile
                </Link>
              )}
              <div className="px-3 py-2">
                <span className="text-sm text-blue-100 bg-blue-800 px-3 py-1 rounded-full block mb-2">
                  {user.email} <span className="text-xs font-semibold">({user.role})</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg w-full"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-white text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition duration-300 shadow-md hover:shadow-lg mx-3"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
