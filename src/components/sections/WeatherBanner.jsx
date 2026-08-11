import {
  FaCloudSun,
  FaTemperatureHigh,
  FaWind,
  FaUmbrella,
} from "react-icons/fa"

function WeatherBanner() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-3xl overflow-hidden shadow-lg">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left side */}
            <div className="p-8 sm:p-10 lg:p-12 text-white">

              <div className="flex items-center gap-3 mb-4">
                <FaCloudSun className="text-3xl" />

                <span className="font-semibold text-blue-100">
                  KATHMANDU VALLEY WEATHER
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Plan Your Journey Around the Weather
              </h2>

              <p className="text-blue-100 leading-relaxed">
                Check current weather information before travelling
                so you can choose the best time and route for your journey.
              </p>

              <div className="mt-8 flex items-center gap-3">

                <div className="text-5xl font-bold">
                  24°
                </div>

                <div>
                  <p className="font-semibold">
                    Kathmandu
                  </p>

                  <p className="text-sm text-blue-100">
                    Partly Cloudy
                  </p>
                </div>

              </div>

            </div>

            {/* Right side */}
            <div className="bg-white/10 backdrop-blur-sm p-8 sm:p-10 lg:p-12">

              <div className="grid grid-cols-2 gap-4">

                {/* Temperature */}
                <div className="bg-white/10 rounded-2xl p-5 text-white">
                  <FaTemperatureHigh className="text-2xl mb-3" />

                  <p className="text-sm text-blue-100">
                    Temperature
                  </p>

                  <p className="text-xl font-bold mt-1">
                    24°C
                  </p>
                </div>

                {/* Wind */}
                <div className="bg-white/10 rounded-2xl p-5 text-white">
                  <FaWind className="text-2xl mb-3" />

                  <p className="text-sm text-blue-100">
                    Wind
                  </p>

                  <p className="text-xl font-bold mt-1">
                    12 km/h
                  </p>
                </div>

                {/* Rain */}
                <div className="bg-white/10 rounded-2xl p-5 text-white">
                  <FaUmbrella className="text-2xl mb-3" />

                  <p className="text-sm text-blue-100">
                    Rain Chance
                  </p>

                  <p className="text-xl font-bold mt-1">
                    30%
                  </p>
                </div>

                {/* Travel advice */}
                <div className="bg-white/10 rounded-2xl p-5 text-white">

                  <FaCloudSun className="text-2xl mb-3" />

                  <p className="text-sm text-blue-100">
                    Travel Advice
                  </p>

                  <p className="text-xl font-bold mt-1">
                    Good
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default WeatherBanner