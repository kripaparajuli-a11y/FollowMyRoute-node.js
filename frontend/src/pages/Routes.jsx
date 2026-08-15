import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBus,
  FaSearch,
  FaArrowRight,
  FaExchangeAlt,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaRoute,
} from "react-icons/fa";

function RoutesPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searched, setSearched] = useState(false);

  // Routes received from the backend
  const [routes, setRoutes] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET ROUTES FROM BACKEND
  // ==========================================

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:5000/api/routes"
        );

        console.log("Routes received:", response.data);

        setRoutes(response.data.data);
      } catch (error) {
        console.error("Error fetching routes:", error);

        setError("Unable to load routes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  // ==========================================
  // SWAP FROM AND TO
  // ==========================================

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  // ==========================================
  // FILTER ROUTES
  // ==========================================

  const filteredRoutes = routes.filter((route) => {
    const fromMatch =
      !from ||
      route.startPoint.toLowerCase().includes(from.toLowerCase());

    const toMatch =
      !to ||
      route.destination.toLowerCase().includes(to.toLowerCase());

    return fromMatch && toMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800">

        {/* Decorative circles */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">

              <FaRoute />

              Smart public transport

            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">

              Find the right route.

              <span className="block text-blue-200">
                Get there with ease.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">

              Search bus routes, compare travel times and check fares
              before you start your journey.

            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          SEARCH CARD
      ========================================== */}

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">

          {/* Search heading */}

          <div className="mb-7 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">

              <FaSearch className="text-xl" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Plan your journey
              </h2>

              <p className="text-sm text-slate-500">
                Enter your starting point and destination
              </p>

            </div>

          </div>


          {/* Search form */}

          <form onSubmit={handleSearch}>

            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:items-end">

              {/* FROM */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  From
                </label>

                <div className="relative">

                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Starting point"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* SWAP */}

              <button
                type="button"
                onClick={handleSwap}
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                title="Swap locations"
              >

                <FaExchangeAlt />

              </button>


              {/* TO */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  To
                </label>

                <div className="relative">

                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />

                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* SEARCH BUTTON */}

              <button
                type="submit"
                className="flex h-13.5 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
              >

                <FaSearch />

                Search

              </button>

            </div>

          </form>

        </div>

      </section>


      {/* ==========================================
          ROUTES SECTION
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
              Available routes
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Explore bus routes
            </h2>

            <p className="mt-2 text-slate-500">
              Choose a route that works best for your journey.
            </p>

          </div>


          {/* Route count */}

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">

            {loading
              ? "Loading..."
              : `${filteredRoutes.length} routes available`}

          </div>

        </div>


        {/* Search information */}

        {searched && (

          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">

            <span className="font-semibold">
              Searching routes
            </span>

            {from && (
              <>
                {" "}from <strong>{from}</strong>
              </>
            )}

            {to && (
              <>
                {" "}to <strong>{to}</strong>
              </>
            )}

            {!from && !to && " — showing available routes"}

          </div>

        )}


        {/* ==========================================
            LOADING SKELETON
        ========================================== */}

        {loading && (

          <div className="grid gap-6 md:grid-cols-2">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6"
              >

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-2xl bg-slate-200" />

                  <div className="flex-1">

                    <div className="h-4 w-24 rounded bg-slate-200" />

                    <div className="mt-3 h-5 w-48 rounded bg-slate-200" />

                  </div>

                </div>

                <div className="mt-7 h-32 rounded-2xl bg-slate-100" />

                <div className="mt-5 h-12 rounded-xl bg-slate-100" />

              </div>

            ))}

          </div>

        )}


        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (

          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">

            <p className="font-semibold text-red-700">
              {error}
            </p>

            <p className="mt-1 text-sm text-red-500">
              Please make sure the backend server is running.
            </p>

          </div>

        )}


        {/* ==========================================
            ROUTE CARDS
        ========================================== */}

        {!loading && !error && (

          <div className="grid gap-6 md:grid-cols-2">

            {filteredRoutes.map((route) => (

              <div
                key={route._id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
              >

                {/* Card top */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">

                      <FaBus className="text-xl" />

                    </div>


                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Bus Route {route.routeNumber}
                      </p>

                      <h3 className="text-lg font-bold text-slate-900">
                        {route.name}
                      </h3>

                    </div>

                  </div>


                  {/* Status */}

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">

                    {route.isActive ? "Available" : "Unavailable"}

                  </span>

                </div>


                {/* ==========================================
                    JOURNEY
                ========================================== */}

                <div className="my-7 rounded-2xl bg-slate-50 p-5">

                  <div className="flex items-center gap-4">

                    <div className="flex flex-col items-center">

                      <div className="h-3 w-3 rounded-full border-2 border-blue-600 bg-white" />

                      <div className="h-10 w-px bg-slate-300" />

                      <div className="h-3 w-3 rounded-full bg-blue-600" />

                    </div>


                    <div className="flex flex-1 flex-col gap-6">

                      {/* Starting point */}

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Starting point
                        </p>

                        <p className="font-semibold text-slate-800">
                          {route.startPoint}
                        </p>

                      </div>


                      {/* Destination */}

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Destination
                        </p>

                        <p className="font-semibold text-slate-800">
                          {route.destination}
                        </p>

                      </div>

                    </div>


                    <FaArrowRight className="hidden text-slate-300 sm:block" />

                  </div>

                </div>


                {/* ==========================================
                    INFORMATION
                ========================================== */}

                <div className="grid grid-cols-3 gap-3 border-b border-slate-100 pb-5">

                  {/* Duration */}

                  <div className="text-center">

                    <FaClock className="mx-auto mb-2 text-blue-500" />

                    <p className="text-xs text-slate-400">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {route.estimatedTime}
                    </p>

                  </div>


                  {/* Fare */}

                  <div className="border-x border-slate-100 text-center">

                    <FaMoneyBillWave className="mx-auto mb-2 text-green-500" />

                    <p className="text-xs text-slate-400">
                      Fare
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      Rs. {route.fare}
                    </p>

                  </div>


                  {/* Stops */}

                  <div className="text-center">

                    <FaRoute className="mx-auto mb-2 text-purple-500" />

                    <p className="text-xs text-slate-400">
                      Stops
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {route.stops.length}
                    </p>

                  </div>

                </div>


                {/* ==========================================
                    OPERATING HOURS
                ========================================== */}

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">

                  <FaClock className="text-blue-500" />

                  Operating:

                  <span className="font-semibold text-slate-700">
                    {route.operatingHours}
                  </span>

                </div>


                {/* ==========================================
                    DESCRIPTION
                ========================================== */}

                <p className="mt-3 text-center text-sm leading-6 text-slate-500">

                  {route.description}

                </p>


                {/* ==========================================
                    STOPS PREVIEW
                ========================================== */}

                <div className="mt-4 flex flex-wrap justify-center gap-2">

                  {route.stops.slice(0, 3).map((stop, index) => (

                    <span
                      key={index}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >

                      {stop}

                    </span>

                  ))}

                  {route.stops.length > 3 && (

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">

                      +{route.stops.length - 3} more

                    </span>

                  )}

                </div>


                {/* ==========================================
                    BUTTON
                ========================================== */}

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >

                  View route details

                  <FaArrowRight className="text-sm transition group-hover:translate-x-1" />

                </button>

              </div>

            ))}

          </div>

        )}


        {/* ==========================================
            NO ROUTES FOUND
        ========================================== */}

        {!loading &&
          !error &&
          searched &&
          filteredRoutes.length === 0 && (

            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

                <FaBus className="text-2xl" />

              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No routes found
              </h3>

              <p className="mt-2 text-slate-500">
                Try a different starting point or destination.
              </p>

            </div>

          )}

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-12 text-center sm:px-12">

          {/* Decorative circles */}

          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/5" />


          <div className="relative z-10">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">

              <FaBus className="text-2xl" />

            </div>

            <h2 className="text-3xl font-extrabold text-white">
              Ready for your next journey?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Find your route, check the fare and travel with confidence.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default RoutesPage;