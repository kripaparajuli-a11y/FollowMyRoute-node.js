import { Link } from "react-router-dom"
import { FaBus, FaBars, FaTimes } from "react-icons/fa"
import { useState } from "react"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaBus className="text-blue-600 text-2xl" />

            <span className="text-xl font-bold text-gray-900">
              FollowMyRoute
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/routes"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Routes
            </Link>

            <Link
              to="/fares"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Fares
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>

          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 text-xl"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </Link>

              <Link
                to="/routes"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Routes
              </Link>

              <Link
                to="/fares"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Fares
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </Link>

              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-center"
              >
                Login
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar