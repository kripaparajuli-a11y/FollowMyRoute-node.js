import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import api from "../../services/api";

const emptyStop = () => ({ name: "", fareFromStart: 0, minutesFromStart: 0 });

const emptyForm = () => ({
  routeNumber: "",
  name: "",
  vehicleType: "",
  operator: "",
  standardFare: 0,
  studentFare: 0,
  estimatedTime: "",
  operatingHours: "6:00 AM - 8:00 PM",
  frequencyMinutes: 15,
  isActive: true,
  stops: [emptyStop(), emptyStop()],
});

function AdminRoutes() {
  const [routes, setRoutes] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const loadAll = async () => {
    try {
      setLoading(true);
      const [routesRes, vtRes, opRes] = await Promise.all([
        api.get("/routes"),
        api.get("/vehicle-types"),
        api.get("/operators"),
      ]);
      setRoutes(routesRes.data.data);
      setVehicleTypes(vtRes.data.data);
      setOperators(opRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (route) => {
    setEditingId(route._id);
    setForm({
      routeNumber: route.routeNumber,
      name: route.name,
      vehicleType: route.vehicleType?._id || "",
      operator: route.operator?._id || "",
      standardFare: route.standardFare,
      studentFare: route.studentFare,
      estimatedTime: route.estimatedTime,
      operatingHours: route.operatingHours,
      frequencyMinutes: route.frequencyMinutes || 15,
      isActive: route.isActive,
      stops: route.stops.map((s) => ({
        name: s.name,
        fareFromStart: s.fareFromStart,
        minutesFromStart: s.minutesFromStart,
      })),
    });
    setFormError("");
    setShowForm(true);
  };

  const updateStop = (index, field, value) => {
    setForm((prev) => {
      const stops = [...prev.stops];
      stops[index] = { ...stops[index], [field]: value };
      return { ...prev, stops };
    });
  };

  const addStop = () => {
    setForm((prev) => ({ ...prev, stops: [...prev.stops, emptyStop()] }));
  };

  const removeStop = (index) => {
    setForm((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (form.stops.length < 2 || form.stops.some((s) => !s.name.trim())) {
      setFormError("Add at least 2 stops, each with a name.");
      return;
    }

    const payload = {
      ...form,
      standardFare: Number(form.standardFare),
      studentFare: Number(form.studentFare),
      frequencyMinutes: Number(form.frequencyMinutes),
      stops: form.stops.map((s, i) => ({
        name: s.name.trim(),
        order: i,
        fareFromStart: Number(s.fareFromStart),
        minutesFromStart: Number(s.minutesFromStart),
      })),
    };

    try {
      setSaving(true);
      if (editingId) {
        await api.put(`/routes/${editingId}`, payload);
      } else {
        await api.post("/routes", payload);
      }
      setShowForm(false);
      await loadAll();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save route");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this route? This can't be undone.")) return;

    try {
      await api.delete(`/routes/${id}`);
      await loadAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete route");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Manage</p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Routes</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FaPlus /> New route
        </button>
      </div>

      {error && <p className="mb-4 text-sm font-medium text-red-600">{error}</p>}

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Vehicle</th>
                <th className="px-5 py-3">From → To</th>
                <th className="px-5 py-3">Fare</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {routes.map((route) => (
                <tr key={route._id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{route.routeNumber}</p>
                    <p className="text-xs text-slate-500">{route.name}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{route.vehicleType?.name || "—"}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {route.startPoint} → {route.destination}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    Rs. {route.standardFare} / {route.studentFare}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        route.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {route.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => openEdit(route)}
                      className="mr-3 text-slate-400 transition hover:text-blue-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(route._id)}
                      className="text-slate-400 transition hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {routes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    No routes yet. Create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 py-10">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingId ? "Edit route" : "New route"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Route number</label>
                  <input
                    required
                    value={form.routeNumber}
                    onChange={(e) => setForm({ ...form, routeNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Route name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Vehicle type</label>
                  <select
                    required
                    value={form.vehicleType}
                    onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select...</option>
                    {vehicleTypes.map((v) => (
                      <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Operator</label>
                  <select
                    value={form.operator}
                    onChange={(e) => setForm({ ...form, operator: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">None</option>
                    {operators.map((o) => (
                      <option key={o._id} value={o._id}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Standard fare (Rs.)</label>
                  <input
                    type="number" min="0" required
                    value={form.standardFare}
                    onChange={(e) => setForm({ ...form, standardFare: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Student fare (Rs.)</label>
                  <input
                    type="number" min="0" required
                    value={form.studentFare}
                    onChange={(e) => setForm({ ...form, studentFare: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Estimated time</label>
                  <input
                    required placeholder="e.g. 45 min"
                    value={form.estimatedTime}
                    onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Operating hours</label>
                  <input
                    value={form.operatingHours}
                    onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Route is active
              </label>

              {/* Stops */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Stops (in travel order)
                  </label>
                  <button
                    type="button"
                    onClick={addStop}
                    className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <FaPlus className="text-xs" /> Add stop
                  </button>
                </div>

                <div className="space-y-2">
                  {form.stops.map((stop, i) => (
                    <div key={i} className="grid grid-cols-[1fr_90px_90px_auto] items-center gap-2">
                      <input
                        placeholder={`Stop ${i + 1} name`}
                        value={stop.name}
                        onChange={(e) => updateStop(i, "name", e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                      />
                      <input
                        type="number" min="0" placeholder="Fare"
                        value={stop.fareFromStart}
                        onChange={(e) => updateStop(i, "fareFromStart", e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                      />
                      <input
                        type="number" min="0" placeholder="Min"
                        value={stop.minutesFromStart}
                        onChange={(e) => updateStop(i, "minutesFromStart", e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeStop(i)}
                        disabled={form.stops.length <= 2}
                        className="text-slate-400 hover:text-red-600 disabled:opacity-30"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Fare and minutes should be cumulative from the first stop (e.g. stop 3's
                  fare = full fare from the route's start to stop 3).
                </p>
              </div>

              {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Save changes" : "Create route"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoutes;
