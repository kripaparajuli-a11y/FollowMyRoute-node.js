import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import RoutesPage from "../pages/Routes";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRoutes from "../pages/admin/AdminRoutes";
import AdminLocations from "../pages/admin/AdminLocations";
import AdminLookups from "../pages/admin/AdminLookups";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminMessages from "../pages/admin/AdminMessages";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/routes" element={<RoutesPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Pages */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="routes" element={<AdminRoutes />} />
          <Route path="locations" element={<AdminLocations />} />
          <Route path="lookups" element={<AdminLookups />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
