import { FaSearchLocation, FaMapMarkerAlt } from "react-icons/fa"

function Hero() {
  return (
    <section className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="max-w-3xl">

          <p className="text-blue-200 font-semibold mb-3">
            KATHMANDU VALLEY PUBLIC TRANSPORT
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Find Your Route.
            <br />
            Travel With Confidence.
          </h1>

          <p className="text-lg text-blue-100 mb-10">
            Find the right bus, microbus, Sajha bus or Safa Tempo
            for your journey around Kathmandu Valley.
          </p>

        </div>

        {/* Route Finder */}
        <div className="bg-white rounded-2xl p-5 shadow-xl max-w-5xl">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Starting location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where are you?
              </label>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your current location"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where do you want to go?
              </label>

              <div className="relative">
                <FaSearchLocation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your destination"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

          </div>

          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            Find My Route
          </button>

        </div>

      </div>
    </section>
  )
}

export default Hero