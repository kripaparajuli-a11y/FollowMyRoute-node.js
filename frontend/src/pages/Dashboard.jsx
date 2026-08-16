import { Link } from "react-router-dom";
import {
  FaBus,
  FaRoute,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-blue-200">
                Your travel dashboard
              </p>

              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Welcome back, {user?.name || "Traveler"} 👋
              </h1>

              <p className="mt-3 max-w-xl text-blue-100">
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


            {/* Fares */}
            <Link
              to="/fares"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaMoneyBillWave className="text-xl" />
              </div>

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold text-slate-900">
                    Check Fares
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    View estimated bus fares
                  </p>
                </div>

                <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600" />

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


        {/* Journey Planner */}
        <section className="mb-10">

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-8 sm:px-8">

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

                    <span className="text-slate-400">
                      Where are you starting?
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Destination
                  </p>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-red-500" />

                    <span className="text-slate-400">
                      Where are you going?
                    </span>
                  </div>
                </div>

              </div>

              <Link
                to="/routes"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Search Bus Routes
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>


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