import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  FaBus,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa"

function Footer() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <footer className="bg-gray-950 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <FaBus className="text-white" />
              </div>

              <span className="text-xl font-bold">
                FollowMyRoute
              </span>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Making public transportation around Kathmandu Valley
              easier to understand, plan and use.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaTwitter />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/routes"
                className="text-gray-400 hover:text-white transition"
              >
                Find a Route
              </Link>


              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Account */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Your Account
            </h3>

            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-fit text-left text-gray-400 transition hover:text-white"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Get in Touch
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />

                <p className="text-gray-400">
                  Kathmandu Valley, Nepal
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />

                <p className="text-gray-400">
                  hello@followmyroute.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" />

                <p className="text-gray-400">
                  +977 98XXXXXXXX
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-sm text-gray-500">
              © 2026 FollowMyRoute. All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Built for Kathmandu Valley travellers.
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer
