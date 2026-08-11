import { FaBus, FaClock, FaMapMarkerAlt } from "react-icons/fa"

const popularRoutes = [
  {
    route: "Ring Road",
    from: "Kalanki",
    to: "Koteshwor",
    vehicle: "Bus",
    time: "45 min",
    fare: "Rs. 30",
  },
  {
    route: "Kathmandu → Bhaktapur",
    from: "Ratna Park",
    to: "Bhaktapur",
    vehicle: "Bus",
    time: "50 min",
    fare: "Rs. 35",
  },
  {
    route: "Lalitpur Route",
    from: "Ratna Park",
    to: "Lagankhel",
    vehicle: "Sajha Bus",
    time: "35 min",
    fare: "Rs. 25",
  },
]

function PopularRoutes() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

          <div>
            <p className="text-blue-600 font-semibold mb-2">
              EXPLORE KATHMANDU
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Popular Routes
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl">
              Discover commonly used public transportation routes
              around Kathmandu Valley.
            </p>
          </div>

          <button className="text-blue-600 font-semibold hover:text-blue-800 transition">
            View all routes →
          </button>

        </div>

        {/* Route cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {popularRoutes.map((route) => (
            <div
              key={route.route}
              className="group border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Header */}
              <div className="flex items-center justify-between mb-6">

                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaBus className="text-blue-600 text-xl" />
                </div>

                <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {route.vehicle}
                </span>

              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-5">
                {route.route}
              </h3>

              {/* Journey */}
              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1" />

                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      From
                    </p>

                    <p className="font-medium text-gray-800">
                      {route.from}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-red-500 mt-1" />

                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      To
                    </p>

                    <p className="font-medium text-gray-800">
                      {route.to}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom information */}
              <div className="border-t border-gray-100 mt-6 pt-5 flex items-center justify-between">

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaClock />
                  <span>{route.time}</span>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Estimated fare
                  </p>

                  <p className="font-bold text-gray-900">
                    {route.fare}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default PopularRoutes