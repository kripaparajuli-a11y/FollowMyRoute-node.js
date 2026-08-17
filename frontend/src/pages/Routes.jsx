import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigationType, useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaRoute,
  FaExclamationCircle,
  FaBus,
} from "react-icons/fa";
import api from "../services/api";
import TripResultCard from "../components/trip/TripResultCard";

function RoutesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigationType = useNavigationType();
  const isPageReload = useRef(
    navigationType !== "PUSH" &&
      window.location.pathname === "/routes" &&
      performance.getEntriesByType("navigation")[0]?.type === "reload"
  );

  const [from, setFrom] = useState(isPageReload.current ? "" : searchParams.get("from") || "");
  const [to, setTo] = useState(isPageReload.current ? "" : searchParams.get("to") || "");
  const [fareType, setFareType] = useState("standard");

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { type, options }

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeLocationField, setActiveLocationField] = useState(null);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [catalogError, setCatalogError] = useState("");

  // A browser refresh starts a new search, while in-app navigation from the
  // dashboard or home page can still pass pre-filled locations in the URL.
  useEffect(() => {
    if (isPageReload.current) {
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams]);

  // ============================
  // AUTOCOMPLETE (best-effort — silently does nothing if it fails)
  // ============================
  const loadLocations = useCallback(() => {
    api
      .get("/locations")
      .then((res) => {
        const names = (res.data.data || [])
          .map((location) => location.name)
          .sort((a, b) => a.localeCompare(b));
        setLocationSuggestions(names);
      })
      .catch(() => setLocationSuggestions([]));
  }, []);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  const matchingLocations = (value) => {
    const query = value.trim().toLowerCase();
    return locationSuggestions.filter((name) => name.toLowerCase().includes(query));
  };

  const selectLocation = (field, name) => {
    if (field === "from") setFrom(name);
    if (field === "to") setTo(name);
    setActiveLocationField(null);
  };

  // This catalogue is intentionally loaded from the API. The server returns
  // only active routes to guests/users, so entries created or activated by an
  // admin appear here automatically and inactive routes never do.
  useEffect(() => {
    api
      .get("/routes")
      .then((res) => setAvailableRoutes(res.data.data || []))
      .catch(() => setCatalogError("Route list is unavailable right now."));
  }, []);

  // ============================
  // SEARCH
  // ============================
  const runSearch = useCallback(async (fromValue, toValue, fareTypeValue) => {
    if (!fromValue.trim() || !toValue.trim()) return;

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const response = await api.get("/trips/search", {
        params: { from: fromValue.trim(), to: toValue.trim(), fareType: fareTypeValue },
      });

      setResult(response.data);
    } catch (err) {
      console.error("Trip search failed:", err);
      setError(
        err.response?.data?.message ||
          "Unable to search right now. Please make sure the backend server is running."
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run a search automatically if the page loaded with ?from=&to= in the URL
  useEffect(() => {
    const f = searchParams.get("from");
    const t = searchParams.get("to");

    if (!isPageReload.current && f && t) {
      runSearch(f, t, fareType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ from, to });
    runSearch(from, to, fareType);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="min-h-screen bg-paper">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-marigold-500/30 bg-marigold-500/15 px-4 py-2 text-sm font-semibold text-marigold-400">
              <FaRoute />
              Smart public transport
            </div>

            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-paper-100 sm:text-5xl lg:text-6xl">
              Where are you,
              <span className="block text-marigold-400">and where to?</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper-200 sm:text-xl">
              Tell us your starting point and destination — we'll tell you
              which vehicle to take, where to board, and where to change if
              you need to.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="ticket-stub rounded-2xl border-ink-100 bg-paper-100 p-6 shadow-card sm:p-8">

          <form onSubmit={handleSearch}>
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:items-end">

              {/* FROM */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">From</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => {
                      loadLocations();
                      setActiveLocationField("from");
                    }}
                    onBlur={() => setActiveLocationField(null)}
                    autoComplete="off"
                    placeholder="Where are you?"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                  {activeLocationField === "from" && matchingLocations(from).length > 0 && (
                    <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-ink-100 bg-paper-100 p-1 shadow-card">
                      {matchingLocations(from).map((name) => (
                        <button
                          key={name}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selectLocation("from", name);
                          }}
                          className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-ink-700 transition hover:bg-micro-50 hover:text-micro-700"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
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
                <label className="mb-2 block text-sm font-semibold text-slate-700">To</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => {
                      loadLocations();
                      setActiveLocationField("to");
                    }}
                    onBlur={() => setActiveLocationField(null)}
                    autoComplete="off"
                    placeholder="Where do you want to go?"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                  {activeLocationField === "to" && matchingLocations(to).length > 0 && (
                    <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-ink-100 bg-paper-100 p-1 shadow-card">
                      {matchingLocations(to).map((name) => (
                        <button
                          key={name}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selectLocation("to", name);
                          }}
                          className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-ink-700 transition hover:bg-micro-50 hover:text-micro-700"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SEARCH */}
              <button
                type="submit"
                className="flex h-13.5 items-center justify-center gap-2 rounded-lg bg-micro-600 px-7 font-semibold text-white transition hover:bg-micro-700"
              >
                <FaSearch />
                Search
              </button>
            </div>

            {/* Fare type toggle */}
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="font-medium text-slate-600">Fare type:</span>
              <button
                type="button"
                onClick={() => {
                  setFareType("standard");
                  if (from.trim() && to.trim()) runSearch(from, to, "standard");
                }}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  fareType === "standard"
                    ? "bg-micro-600 text-white"
                    : "bg-ink-50 text-ink-500 hover:bg-micro-50"
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => {
                  setFareType("student");
                  if (from.trim() && to.trim()) runSearch(from, to, "student");
                }}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  fareType === "student"
                    ? "bg-micro-600 text-white"
                    : "bg-ink-50 text-ink-500 hover:bg-micro-50"
                }`}
              >
                Student
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

        {!searched && !loading && !error && (
          <div className="mb-10">
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-wider text-micro-600">Admin-managed routes</p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-ink-900">Available routes</h2>
              <p className="mt-2 text-ink-500">These routes are published by the administrator. Search above to plan a trip between their stops.</p>
            </div>
            {catalogError ? (
              <p className="rounded-xl border border-brick-600/20 bg-marigold-50 p-4 text-sm text-brick-600">{catalogError}</p>
            ) : availableRoutes.length === 0 ? (
              <div className="ticket-stub bg-paper-100 p-8 text-center"><FaBus className="mx-auto text-3xl text-ink-300" /><p className="mt-3 font-semibold text-ink-900">No published routes yet</p><p className="mt-1 text-sm text-ink-500">An administrator can add and activate routes from the Admin panel.</p></div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {availableRoutes.map((route) => (
                  <article key={route._id} className="ticket-stub bg-paper-100 p-5">
                    <div className="flex items-start justify-between gap-3"><div><span className="inline-flex rounded-md bg-micro-600 px-2.5 py-1 text-xs font-bold text-white">{route.routeNumber}</span><h3 className="mt-3 font-display text-lg font-semibold text-ink-900">{route.name}</h3></div><span className="text-sm font-semibold text-marigold-700">Rs. {route.standardFare}</span></div>
                    <p className="mt-3 text-sm text-ink-500">{route.startPoint} <span className="px-1 text-ink-300">→</span> {route.destination}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink-100 pt-3 text-xs text-ink-500"><span>{route.vehicleType?.name || "Public vehicle"}</span><span>{route.estimatedTime}</span></div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <FaBus className="mx-auto text-4xl text-slate-300" />
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Enter a starting point and destination
            </h3>
            <p className="mt-2 text-slate-500">
              We'll find the best direct route, or the best route with one
              transfer if a direct one isn't available.
            </p>
          </div>
        )}

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="mt-5 font-semibold text-slate-700">Finding your route...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
            <FaExclamationCircle className="mx-auto text-3xl text-red-500" />
            <h3 className="mt-4 text-lg font-bold text-red-900">Something went wrong</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && searched && result?.type === "none" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <FaRoute className="mx-auto text-4xl text-slate-300" />
            <h3 className="mt-5 text-xl font-bold text-slate-900">No route found</h3>
            <p className="mt-2 text-slate-500">
              We couldn't find a direct or one-transfer route between these
              two places yet. Try checking your spelling, or a nearby
              landmark.
            </p>
          </div>
        )}

        {!loading && !error && result && result.options?.length > 0 && (
          <div>
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                {result.type === "direct" ? "Direct routes" : "Best route with a transfer"}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                {from} → {to}
              </h2>
            </div>

            <div className="space-y-5">
              {result.options.map((option, i) => (
                <TripResultCard key={i} option={option} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default RoutesPage;
