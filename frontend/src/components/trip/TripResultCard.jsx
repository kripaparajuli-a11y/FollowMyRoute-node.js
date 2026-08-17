import { useEffect, useState } from "react";
import {
  FaBus,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const vehicleIcon = () => <FaBus />;

function Leg({ leg, isLast }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0">
          {vehicleIcon()}
        </div>
        {!isLast && <div className="mt-1 h-full w-px flex-1 bg-slate-200" />}
      </div>

      <div className={isLast ? "pb-0" : "pb-6"}>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {leg.vehicleType?.name || "Vehicle"} · {leg.routeNumber}
        </p>

        <p className="mt-1 font-bold text-slate-900">{leg.routeName}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <FaMapMarkerAlt className="text-blue-500" />
          Board at <span className="font-semibold">{leg.board}</span>
          <span className="text-slate-300">→</span>
          Get off at <span className="font-semibold">{leg.alight}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FaClock className="text-slate-400" /> ~{leg.minutes} min
          </span>
          <span className="flex items-center gap-1">
            <FaMoneyBillWave className="text-slate-400" /> Rs. {leg.fare}
          </span>
          {leg.operator?.name && <span>Operator: {leg.operator.name}</span>}
        </div>
      </div>
    </div>
  );
}

function TripResultCard({ option }) {
  const { isAuthenticated } = useAuth();
  const [savingId, setSavingId] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setSavedIds([]);
      return;
    }

    api
      .get("/me/favorites")
      .then((res) => {
        setSavedIds(
          (res.data.data || []).map((favorite) =>
            String(favorite.route?._id || favorite.route)
          )
        );
      })
      .catch((err) => console.error("Failed to load favorites:", err));
  }, [isAuthenticated]);

  const isTransfer = option.type === "transfer";
  const totalFare = isTransfer
    ? option.totalFare
    : option.legs[0].fare;
  const totalMinutes = isTransfer
    ? option.totalMinutes
    : option.legs[0].minutes;

  const handleSave = async (routeId) => {
    if (!isAuthenticated || savedIds.includes(routeId)) return;

    try {
      setSavingId(routeId);
      await api.post("/me/favorites", { routeId });
      setSavedIds((prev) => [...prev, String(routeId)]);
    } catch (err) {
      console.error("Failed to save favorite:", err);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            isTransfer
              ? "bg-orange-50 text-orange-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {isTransfer ? (
            <>
              <FaExchangeAlt /> One transfer at {option.transferPoint}
            </>
          ) : (
            "Direct route"
          )}
        </span>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <span className="flex items-center gap-1">
            <FaClock className="text-blue-500" /> ~{totalMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <FaMoneyBillWave className="text-green-600" /> Rs. {totalFare}
          </span>
        </div>
      </div>

      {/* Legs */}
      <div>
        {option.legs.map((leg, i) => (
          <Leg key={leg.routeId} leg={leg} isLast={i === option.legs.length - 1} />
        ))}
      </div>

      {/* Save buttons */}
      {isAuthenticated && (
        <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
          {option.legs.map((leg) => (
            <button
              key={leg.routeId}
              onClick={() => handleSave(leg.routeId)}
              disabled={savingId === leg.routeId || savedIds.includes(leg.routeId)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500 disabled:opacity-60"
            >
              {savedIds.includes(leg.routeId) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
              {savedIds.includes(leg.routeId)
                ? `Saved ${leg.routeNumber}`
                : `Save ${leg.routeNumber}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TripResultCard;
