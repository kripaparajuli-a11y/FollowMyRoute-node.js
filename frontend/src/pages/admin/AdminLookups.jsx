import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import api from "../../services/api";

// A compact inline-add table for a simple lookup resource (vehicle types
// or operators) — these don't need the full modal treatment routes/
// locations get, since they only have 2-3 fields each.
function LookupTable({ title, endpoint, fields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(
    Object.fromEntries(fields.map((f) => [f.key, f.default || ""]))
  );
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(endpoint);
      setItems(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to load ${title}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name?.trim()) return;

    try {
      await api.post(endpoint, form);
      setForm(Object.fromEntries(fields.map((f) => [f.key, f.default || ""])));
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-extrabold text-slate-900">{title}</h2>

      <form onSubmit={handleAdd} className="mb-5 flex flex-wrap gap-2">
        {fields.map((f) =>
          f.type === "select" ? (
            <select
              key={f.key}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="flex-1 min-w-[120px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
            >
              {f.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              key={f.key}
              placeholder={f.label}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="flex-1 min-w-[120px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          )
        )}
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FaPlus className="text-xs" /> Add
        </button>
      </form>

      {error && <p className="mb-3 text-sm font-medium text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li key={item._id} className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                {item.description && <p className="text-xs text-slate-400">{item.description}</p>}
                {item.type && <p className="text-xs text-slate-400">{item.type}</p>}
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-slate-300 hover:text-red-600">
                <FaTrash className="text-sm" />
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="py-6 text-center text-sm text-slate-400">Nothing here yet.</li>
          )}
        </ul>
      )}
    </div>
  );
}

function AdminLookups() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Manage</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Vehicles & Operators</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LookupTable
          title="Vehicle types"
          endpoint="/vehicle-types"
          fields={[
            { key: "name", label: "Name (e.g. Micro Bus)" },
            { key: "description", label: "Description (optional)" },
          ]}
        />
        <LookupTable
          title="Operators"
          endpoint="/operators"
          fields={[
            { key: "name", label: "Operator name" },
            {
              key: "type",
              type: "select",
              default: "Private",
              options: ["Private", "Government", "Cooperative"],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default AdminLookups;
