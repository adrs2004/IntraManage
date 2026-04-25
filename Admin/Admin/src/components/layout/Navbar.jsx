import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative bg-white shadow-md border-b border-gray-200 overflow-hidden z-50">
      {/* 🎨 Geometric Background Shapes - Extended (Admin Purple Theme) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute -top-4 right-10 w-28 h-28 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute bottom-0 left-1/3 w-44 h-44 bg-violet-200 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute top-10 right-0 w-24 h-24 bg-indigo-300 rounded-full mix-blend-multiply opacity-20 z-0"></div>

      {/* 🟣 Additional Admin Theme Circles */}
      <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-purple-100 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-purple-400 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute top-2/3 left-10 w-24 h-24 bg-indigo-100 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-indigo-400 rounded-full mix-blend-multiply opacity-20 z-0"></div>
      <div className="absolute top-0 left-1/2 w-32 h-32 bg-violet-300 rounded-full mix-blend-multiply opacity-20 z-0"></div>

      {/* 🔧 Existing Navbar Content */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3">
          <Link to="/dashboard">
            <img src="/chitkara.avif" alt="Brand Icon" className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer" />
          </Link>
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text hidden sm:inline animate-pulse">
            Admin Portal
          </span>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              <span className="text-gray-800 font-semibold hover:text-purple-600 transition-colors">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 relative z-10">
          <div className="flex flex-col space-y-2">
            {user && (
              <>
                <span className="text-gray-800 font-semibold hover:text-purple-600">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;