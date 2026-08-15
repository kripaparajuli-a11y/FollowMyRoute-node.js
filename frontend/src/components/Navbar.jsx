import { Link } from "react-router-dom";
import { FaBus, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaBus className="text-2xl text-blue-600" />

            <span className="text-xl font-bold text-gray-900">
              FollowMyRoute
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            <Link
              to="/"
              className="text-gray-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/routes"
              className="text-gray-700 transition hover:text-blue-600"
            >
              Routes
            </Link>

            <Link
              to="/fares"
              className="text-gray-700 transition hover:text-blue-600"
            >
              Fares
            </Link>

            <Link
              to="/about"
              className="text-gray-700 transition hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 transition hover:text-blue-600"
            >
              Contact
            </Link>

          </div>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-3 md:flex">

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  {user?.name || "Profile"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xl text-gray-700 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 transition hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/routes"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 transition hover:text-blue-600"
              >
                Routes
              </Link>

              <Link
                to="/fares"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 transition hover:text-blue-600"
              >
                Fares
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 transition hover:text-blue-600"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 transition hover:text-blue-600"
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 transition hover:text-blue-600"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 transition hover:text-blue-600"
                  >
                    {user?.name || "Profile"}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-center text-white transition hover:bg-blue-700"
                >
                  Login
                </Link>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;