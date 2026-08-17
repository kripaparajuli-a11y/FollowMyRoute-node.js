import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaArrowLeft,
  FaRoute,
  FaEdit,
  FaCheck,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Profile() {
  const { user, updateStoredUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      const res = await api.put(`/users/${user.id}`, {
        name: name.trim(),
        email: email.trim(),
      });
      updateStoredUser({ ...user, ...res.data.data });
      setEditing(false);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">

      {/* Header */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

          <Link
            to="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-paper-200 transition hover:text-marigold-400"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-4xl font-bold text-blue-600 shadow-xl">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="mt-5 sm:ml-6 sm:mt-0">
              <p className="text-sm font-medium text-marigold-400">
                FollowMyRoute account
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-white">
                {user?.name || "User"}
              </h1>

              <p className="mt-2 text-paper-200">
                Manage your account information
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Profile Content */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Account Card */}
          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Account information
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                    Your profile
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Your account details are shown below.
                  </p>
                </div>

                {!editing && (
                  <button
                    onClick={() => {
                      setEditing(true);
                      setSuccess(false);
                      setName(user?.name || "");
                      setEmail(user?.email || "");
                    }}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>

              {success && (
                <div className="mb-5 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  <FaCheck /> Profile updated
                </div>
              )}

              {editing ? (
                <form onSubmit={handleSave} className="mb-5 rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Full name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  <label className="mb-2 mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </form>
              ) : (

              /* Name */
              <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <FaUser />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Full name
                    </p>

                    <p className="mt-1 truncate font-semibold text-slate-900">
                      {user?.name || "Not available"}
                    </p>
                  </div>

                </div>

              </div>
              )}


              {/* Email */}
              <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <FaEnvelope />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Email address
                    </p>

                    <p className="mt-1 truncate font-semibold text-slate-900">
                      {user?.email || "Not available"}
                    </p>
                  </div>

                </div>

              </div>


              {/* Role */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Account role
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="font-semibold capitalize text-slate-900">
                        {user?.role || "user"}
                      </span>

                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>

                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Side Card */}
          <div>

            <div className="rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-200">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <FaRoute className="text-xl" />
              </div>

              <h2 className="text-xl font-bold">
                Keep exploring
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Find bus routes, compare fares and plan your next journey
                with FollowMyRoute.
              </p>

              <Link
                to="/routes"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Explore Routes
                <FaRoute />
              </Link>

            </div>


            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-4 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;
