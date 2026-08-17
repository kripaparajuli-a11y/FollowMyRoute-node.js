import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaLock, FaArrowLeft, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("This reset link is missing its token. Please request a new one.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <FaArrowLeft />
            Back to Login
          </Link>

          {!success ? (
            <>
              <div className="mt-8 mb-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaLock className="text-xl" />
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900">
                  Set a new password
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Choose a new password for your FollowMyRoute account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 pr-12 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 pr-12 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((visible) => !visible)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {error && <p className="text-sm font-medium text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          ) : (
            <div className="mt-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                <FaCheckCircle className="text-3xl" />
              </div>

              <h2 className="mt-6 text-xl font-extrabold text-slate-900">
                Password reset
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Redirecting you to login...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
