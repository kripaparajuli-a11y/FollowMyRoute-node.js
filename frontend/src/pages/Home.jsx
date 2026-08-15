import { Link } from "react-router-dom";
import {
  FaBus,
  FaMapMarkedAlt,
  FaClock,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Side */}
            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <FaBus />
                <span className="text-sm">
                  Your smart public transport guide
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Find Your Route.
                <span className="block text-blue-200">
                  Reach Your Destination.
                </span>
              </h1>

              <p className="text-blue-100 text-lg mb-8 max-w-xl">
                FollowMyRoute helps you discover bus routes, fares and
                travel information quickly and easily.
              </p>

              <div className="flex flex-wrap gap-4">

                <Link
                  to="/routes"
                  className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                >
                  Find a Route
                  <FaArrowRight />
                </Link>

                <Link
                  to="/fares"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Check Fares
                </Link>

              </div>

            </div>

            {/* Right Side - Search Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">

              <div className="flex items-center gap-3 mb-6">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <FaSearch />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Plan Your Journey
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Find the best route for your trip
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>

                  <input
                    type="text"
                    placeholder="Enter starting point"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>

                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Link
                  to="/routes"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2"
                >
                  <FaSearch />
                  Search Routes
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-gray-900">
            Everything You Need for Your Journey
          </h2>

          <p className="text-gray-500 mt-3">
            Simple tools to make public transport easier.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

            <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5">
              <FaMapMarkedAlt />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Find Routes
            </h3>

            <p className="text-gray-500">
              Quickly find available bus routes and choose the
              most convenient way to reach your destination.
            </p>

          </div>


          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

            <div className="bg-green-100 text-green-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5">
              <FaClock />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Save Time
            </h3>

            <p className="text-gray-500">
              Get useful travel information so you can plan your
              journey before leaving home.
            </p>

          </div>


          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

            <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5">
              <FaBus />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Know Your Fare
            </h3>

            <p className="text-gray-500">
              Check transportation fares and understand your
              expected travel cost before your journey.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="bg-blue-600 rounded-2xl p-10 text-center text-white">

          <h2 className="text-3xl font-bold mb-4">
            Ready to plan your journey?
          </h2>

          <p className="text-blue-100 mb-6">
            Explore routes and find your way around with FollowMyRoute.
          </p>

          <Link
            to="/routes"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Explore Routes
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;