import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaArrowLeft,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 lg:flex lg:flex-col lg:justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                <FaLock className="text-xl" />
              </div>

              <h1 className="mt-8 text-4xl font-extrabold leading-tight text-white">
                Don't worry.
                <span className="block text-blue-200">
                  We've got you.
                </span>
              </h1>

              <p className="mt-5 max-w-md leading-7 text-blue-100">
                Enter your email address and we'll help you get back into
                your FollowMyRoute account.
              </p>

            </div>

            <div className="text-sm text-blue-200">
              FollowMyRoute · Travel smarter
            </div>

          </div>


          {/* ================= RIGHT ================= */}
          <div className="p-6 sm:p-10">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <FaArrowLeft />
              Back to Login
            </Link>


            {!submitted ? (

              <div className="mt-10">

                <div className="mb-8">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FaEnvelope className="text-xl" />
                  </div>

                  <h2 className="text-3xl font-extrabold text-slate-900">
                    Forgot your password?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter the email address associated with your account.
                  </p>

                </div>


                <form onSubmit={handleSubmit}>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>


                  <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                  >
                    Send Reset Instructions
                  </button>

                </form>

              </div>

            ) : (

              <div className="mt-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <FaCheckCircle className="text-3xl" />
                </div>

                <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
                  Check your email
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  If an account exists for{" "}
                  <span className="font-semibold text-slate-700">
                    {email}
                  </span>
                  , password reset instructions will be sent there.
                </p>

                <Link
                  to="/login"
                  className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Return to Login
                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;