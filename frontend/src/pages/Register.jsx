import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const result = await register(name, email, password);

    setLoading(false);

    if (result.success) {
      // Registration successful
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">

      <div className="mx-auto w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">

          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white shadow-lg shadow-blue-200">
              🚌
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">
              Create your account
            </h1>

            <p className="mt-2 text-slate-500">
              Join FollowMyRoute and plan your journeys easily.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">

                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">

                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Password must contain at least 6 characters.
              </p>

            </div>

            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}

              {!loading && <FiArrowRight />}
            </button>

          </form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login here
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
