import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // make sure logout action exists

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduxToken = useSelector((store) => store.auth.user?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const localStorageToken = localStorage.getItem("tokenHoYo");
      setIsLoggedIn(!!reduxToken || !!localStorageToken);
    };

    checkLogin();

    // Listen to localStorage changes from other tabs/windows
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, [reduxToken]);

  const handleLogout = () => {
    localStorage.removeItem("tokenHoYo");
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/"); // Redirect to homepage
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold text-gray-900">
          WorstGPT
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm font-medium">
          <Link to="/price" className="hover:text-blue-600 transition">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="hover:text-blue-600 transition">
                Sign up
              </Link>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 text-gray-700 text-sm font-medium">
          <Link to="/price" className="block py-2 hover:text-blue-600">
            Pricing
          </Link>
          <Link to="/about" className="block py-2 hover:text-blue-600">
            About
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="block py-2 hover:text-blue-600">
                Sign up
              </Link>
              <Link to="/login" className="block py-2 hover:text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block py-2 text-left w-full hover:text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
