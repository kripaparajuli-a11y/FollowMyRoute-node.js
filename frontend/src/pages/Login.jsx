import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      // Login successful
      navigate("/dashboard");
    } else {
      // Login failed
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

          {/* Logo */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
              🚌
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-500">
              Login to continue using FollowMyRoute
            </p>

          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

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

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && <FiArrowRight />}

            </button>

          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create an account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
