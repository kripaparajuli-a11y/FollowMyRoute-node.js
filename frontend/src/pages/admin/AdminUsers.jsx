import { useEffect, useState } from "react";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRole = async (u) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Make ${u.name} ${newRole === "admin" ? "an admin" : "a regular user"}?`)) return;

    try {
      await api.put(`/users/${u._id}`, { role: newRole });
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user? This can't be undone.")) return;
    try {
      await api.delete(`/users/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Manage</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Users</h1>
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
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {u.name} {u._id === currentUser?.id && <span className="text-xs font-normal text-slate-400">(you)</span>}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{u.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        u.role === "admin" ? "bg-purple-50 text-purple-600" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => toggleRole(u)}
                      disabled={u._id === currentUser?.id}
                      title={u.role === "admin" ? "Revoke admin" : "Make admin"}
                      className="mr-3 text-slate-400 transition hover:text-purple-600 disabled:opacity-30"
                    >
                      {u.role === "admin" ? <FaUser /> : <FaUserShield />}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      disabled={u._id === currentUser?.id}
                      className="text-slate-400 transition hover:text-red-600 disabled:opacity-30"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
