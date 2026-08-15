import {
  FaBus,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa"

function RouteCard({ route }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Top */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
            <FaBus className="text-blue-600 text-lg" />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {route.vehicle}
            </p>

            <p className="text-sm text-gray-500">
              {route.routeNumber}
            </p>
          </div>

        </div>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          {route.type}
        </span>

      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-6">

        <div className="flex items-center gap-2">

          <FaMapMarkerAlt className="text-blue-600" />

          <span className="font-medium text-gray-800">
            {route.from}
          </span>

        </div>

        <FaArrowRight className="text-gray-400 shrink-0" />

        <div className="flex items-center gap-2">

          <FaMapMarkerAlt className="text-red-500" />

          <span className="font-medium text-gray-800">
            {route.to}
          </span>

        </div>

      </div>

      {/* Information */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">

        <div>

          <p className="text-xs text-gray-500 mb-1">
            Estimated Time
          </p>

          <div className="flex items-center gap-2">

            <FaClock className="text-blue-500" />

            <span className="font-semibold text-gray-900">
              {route.duration}
            </span>

          </div>

        </div>

        <div>

          <p className="text-xs text-gray-500 mb-1">
            Estimated Fare
          </p>

          <p className="font-semibold text-gray-900">
            Rs. {route.fare}
          </p>

        </div>

      </div>

      {/* Button */}
      <button
        className="w-full mt-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        View Route
      </button>

    </div>
  )
}

export default RouteCard