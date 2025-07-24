import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-gray-900">
          WorstGPT
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm font-medium">
          <a href="#pricing" className="hover:text-blue-600 transition">
            Pricing
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="" className="hover:text-blue-600 transition">
            Sign up
          </a>
          <a href="/login" className="hover:text-blue-600 transition">
            Login
          </a>
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
          <a href="#features" className="block py-2 hover:text-blue-600">
            Features
          </a>
          <a href="#pricing" className="block py-2 hover:text-blue-600">
            Pricing
          </a>
          <a href="#about" className="block py-2 hover:text-blue-600">
            About
          </a>
          <a href="/login" className="block py-2 hover:text-blue-600">
            Login
          </a>
        </div>
      )}
    </nav>
  );
}
