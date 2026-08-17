import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRoute, FaMapMarkerAlt, FaUsers, FaBus } from "react-icons/fa";
import api from "../../services/api";

function StatCard({ icon: Icon, label, value, to, color }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
        <Icon />
      </div>
      <p className="text-3xl font-extrabold text-slate-900">{value ?? "--"}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </Link>
  );
}

function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all([
      api.get("/routes"),
      api.get("/locations"),
      api.get("/users"),
      api.get("/vehicle-types"),
    ])
      .then(([routes, locations, users, vehicleTypes]) => {
        setCounts({
          routes: routes.data.count,
          locations: locations.data.count,
          users: users.data.count,
          vehicleTypes: vehicleTypes.data.count,
        });
      })
      .catch((err) => console.error("Failed to load admin stats:", err));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
          Admin panel
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
          FollowMyRoute network overview
        </h1>
        <p className="mt-2 text-slate-500">
          Manage the routes, locations and fares that power the trip planner.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FaRoute} label="Active routes" value={counts.routes} to="/admin/routes" color="bg-blue-50 text-blue-600" />
        <StatCard icon={FaMapMarkerAlt} label="Locations" value={counts.locations} to="/admin/locations" color="bg-green-50 text-green-600" />
        <StatCard icon={FaBus} label="Vehicle types" value={counts.vehicleTypes} to="/admin/lookups" color="bg-purple-50 text-purple-600" />
        <StatCard icon={FaUsers} label="Registered users" value={counts.users} to="/admin/users" color="bg-orange-50 text-orange-600" />
      </div>
    </div>
  );
}

export default AdminDashboard;
