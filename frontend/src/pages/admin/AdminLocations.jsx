import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import api from "../../services/api";

const emptyForm = () => ({
  name: "",
  landmark: "",
  zone: "Kathmandu",
  aliases: "",
});

function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/locations");
      setLocations(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (loc) => {
    setEditingId(loc._id);
    setForm({
      name: loc.name,
      landmark: loc.landmark || "",
      zone: loc.zone || "Kathmandu",
      aliases: (loc.aliases || []).join(", "),
    });
    setFormError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const payload = {
      name: form.name.trim(),
      landmark: form.landmark.trim(),
      zone: form.zone,
      aliases: form.aliases
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    };

    try {
      setSaving(true);
      if (editingId) {
        await api.put(`/locations/${editingId}`, payload);
      } else {
        await api.post("/locations", payload);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save location");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this location?")) return;
    try {
      await api.delete(`/locations/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete location");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Manage</p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Locations</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FaPlus /> New location
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
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Landmark</th>
                <th className="px-5 py-3">Zone</th>
                <th className="px-5 py-3">Aliases</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locations.map((loc) => (
                <tr key={loc._id}>
                  <td className="px-5 py-4 font-semibold text-slate-900">{loc.name}</td>
                  <td className="px-5 py-4 text-slate-600">{loc.landmark || "—"}</td>
                  <td className="px-5 py-4 text-slate-600">{loc.zone}</td>
                  <td className="px-5 py-4 text-slate-500">{(loc.aliases || []).join(", ") || "—"}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => openEdit(loc)} className="mr-3 text-slate-400 hover:text-blue-600">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(loc._id)} className="text-slate-400 hover:text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                    No locations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 py-10">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingId ? "Edit location" : "New location"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Landmark</label>
                <input
                  value={form.landmark}
                  onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                  placeholder="e.g. Near Koteshwor flyover"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Zone</label>
                <select
                  value={form.zone}
                  onChange={(e) => setForm({ ...form, zone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option>Kathmandu</option>
                  <option>Lalitpur</option>
                  <option>Bhaktapur</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Aliases (comma-separated)
                </label>
                <input
                  value={form.aliases}
                  onChange={(e) => setForm({ ...form, aliases: e.target.value })}
                  placeholder="e.g. Kotesor, Koteswor Chowk"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
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
                  {saving ? "Saving..." : editingId ? "Save changes" : "Create location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLocations;
