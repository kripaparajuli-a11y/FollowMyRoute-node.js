import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import RoutesPage from "../pages/Routes"
import Fares from "../pages/Fares"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import NotFound from "../pages/NotFound"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/routes" element={<RoutesPage />} />
      <Route path="/fares" element={<Fares />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes