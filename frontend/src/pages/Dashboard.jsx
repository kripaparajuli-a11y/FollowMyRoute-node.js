import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBus,
  FaRoute,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaUser,
  FaHeart,
  FaHistory,
  FaExchangeAlt,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const RECENT_SEARCH_LIMIT = 5;

function Dashboard() {
  const { user } = useAuth();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [recentSearches, setRecentSearches] = useState([]);
  const [showAllRecentSearches, setShowAllRecentSearches] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loadingPersonal, setLoadingPersonal] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/me/search-history"),
      api.get("/me/favorites"),
    ])
      .then(([searchesRes, favoritesRes]) => {
        setRecentSearches(searchesRes.data.data);
        setFavorites(favoritesRes.data.data);
      })
      .catch((err) => console.error("Failed to load personal data:", err))
      .finally(() => setLoadingPersonal(false));
  }, []);

  const removeFavorite = async (routeId) => {
    try {
      await api.delete(`/me/favorites/${routeId}`);
      setFavorites((prev) => prev.filter((f) => f.route?._id !== routeId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  const searchUrl = (f, t) => `/routes?from=${encodeURIComponent(f)}&to=${encodeURIComponent(t)}`;

  return (
    <div className="min-h-screen bg-paper">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-marigold-400">
                Your travel dashboard
              </p>

              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Welcome back, {user?.name || "Traveler"} 👋
              </h1>

              <p className="mt-3 max-w-xl text-paper-200">
                Plan your next journey, explore bus routes and check fares
                around Kathmandu.
              </p>
            </div>

            <Link
              to="/profile"
              className="inline-flex items-center gap-3 self-start rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur-sm transition hover:bg-white/20 md:self-auto"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600">
                <FaUser />
              </div>

              <div className="text-left">
                <p className="text-xs text-blue-200">
                  Account
                </p>

                <p className="font-semibold">
                  View Profile
                </p>
              </div>
            </Link>

          </div>

        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Journey Planner */}
        <section className="mb-10">

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

            <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-8 sm:px-8">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Plan your journey
                  </h2>

                  <p className="text-sm text-slate-300">
                    Find the best route for your trip.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-6 sm:p-8">

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Starting point
                  </p>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Where are you starting?"
                      className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Destination
                  </p>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-red-500" />
                    <input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Where are you going?"
                      className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

              </div>

              <Link
                to={from.trim() && to.trim() ? searchUrl(from, to) : "/routes"}
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Search Bus Routes
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>

        {/* Recent searches + favorites */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">

          {/* Recent searches */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaHistory />
              </div>
              <h2 className="font-bold text-slate-900">Recent searches</h2>
            </div>

            {loadingPersonal ? (
              <p className="text-sm text-slate-400">Loading...</p>
            ) : recentSearches.length === 0 ? (
              <p className="text-sm text-slate-400">
                Your recent trip searches will show up here.
              </p>
            ) : (
              <>
              <ul className="divide-y divide-slate-100">
                {(showAllRecentSearches
                  ? recentSearches
                  : recentSearches.slice(0, RECENT_SEARCH_LIMIT)
                ).map((s) => (
                  <li key={s._id} className="py-3">
                    <Link
                      to={searchUrl(s.from, s.to)}
                      className="flex items-center justify-between gap-3 text-sm hover:text-blue-600"
                    >
                      <span className="flex items-center gap-2 font-medium text-slate-700">
                        {s.from}
                        <FaExchangeAlt className="text-xs text-slate-300" />
                        {s.to}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          s.resultType === "direct"
                            ? "bg-green-50 text-green-600"
                            : s.resultType === "transfer"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {s.resultType === "none" ? "No route" : s.resultType}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {recentSearches.length > RECENT_SEARCH_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAllRecentSearches((showAll) => !showAll)}
                  className="mt-4 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  {showAllRecentSearches
                    ? "View less"
                    : `View ${recentSearches.length - RECENT_SEARCH_LIMIT} more`}
                </button>
              )}
              </>
            )}
          </section>

          {/* Favorites */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <FaHeart />
              </div>
              <h2 className="font-bold text-slate-900">Favorite routes</h2>
            </div>

            {loadingPersonal ? (
              <p className="text-sm text-slate-400">Loading...</p>
            ) : favorites.length === 0 ? (
              <p className="text-sm text-slate-400">
                Save routes from your search results and they'll show up here.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {favorites.map((fav) => (
                  <li key={fav._id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {fav.route?.routeNumber} · {fav.route?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {fav.route?.startPoint} → {fav.route?.destination}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFavorite(fav.route?._id)}
                      className="text-slate-300 hover:text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">

          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Quick access
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What would you like to do?
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Routes */}
            <Link
              to="/routes"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaRoute className="text-xl" />
              </div>

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold text-slate-900">
                    Find a Route
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Search available bus routes
                  </p>
                </div>

                <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />

              </div>
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FaUser className="text-xl" />
              </div>

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold text-slate-900">
                    My Profile
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage your account
                  </p>
                </div>

                <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-600" />

              </div>
            </Link>

          </div>

        </div>


        {/* Travel Tips */}
        <section>

          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Travel smarter
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Helpful travel information
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <FaBus className="mb-4 text-2xl text-blue-600" />

              <h3 className="font-bold text-slate-900">
                Check your route
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check your starting point and destination before travelling.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <FaClock className="mb-4 text-2xl text-orange-500" />

              <h3 className="font-bold text-slate-900">
                Plan your time
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check estimated travel times so you can plan your journey.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <FaMoneyBillWave className="mb-4 text-2xl text-green-600" />

              <h3 className="font-bold text-slate-900">
                Know the fare
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View route fares before you start your trip.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
