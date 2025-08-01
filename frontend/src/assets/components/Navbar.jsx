import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((store) => store.auth.user?.token);
  const credits = useSelector((store) => store.usage.credits);
  const isPremium = useSelector((store) => store.usage.isPremium);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token || !!localStorage.getItem("authToken"));
  }, [token]);

  const handleLogout = () => {
  dispatch(logout());
  localStorage.removeItem("authToken");
  setIsLoggedIn(false);

  // Delay navigation until Redux state has updated
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 50);
};


  const creditDisplay = isPremium ? "∞" : credits;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900">WorstGPT</div>

        <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm font-medium">
          <Link to="/price" className="hover:text-blue-600 transition">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>

          {/* Credit Badge */}
          {isLoggedIn && (
            <div
              className="flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full"
              title="Remaining Credits"
            >
              <span className="mr-1 text-green-600 text-sm font-bold">+</span>
              {creditDisplay}
            </div>
          )}

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

          {/* Credit badge in mobile */}
          {isLoggedIn && (
            <div
              className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"
              title="Remaining Credits"
            >
              <span className="mr-1 text-green-600 text-sm font-bold">+</span>
              {creditDisplay}
            </div>
          )}

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
