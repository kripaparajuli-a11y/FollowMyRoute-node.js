import { NavLink, Outlet, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaRoute,
  FaMapMarkerAlt,
  FaBus,
  FaUsers,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

const links = [
  { to: "/admin", label: "Overview", icon: FaTachometerAlt, end: true },
  { to: "/admin/routes", label: "Routes", icon: FaRoute },
  { to: "/admin/locations", label: "Locations", icon: FaMapMarkerAlt },
  { to: "/admin/lookups", label: "Vehicles & Operators", icon: FaBus },
  { to: "/admin/users", label: "Users", icon: FaUsers },
  { to: "/admin/messages", label: "Messages", icon: FaEnvelope },
];

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">

        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-4 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Admin panel
            </p>

            <nav className="space-y-1">
              {links.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon />
                  {label}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/dashboard"
              className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
